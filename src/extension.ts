/**
 * VS Code extension entry point.
 */

import * as vscode from 'vscode'
import { DIST_DIR } from './common_defs'
import * as config from './config'
import { buildThemeJson } from './theme_builder/theme'
import { ThemeDef, createDarkTheme } from './theme_builder/theme'
import { buildMdstyleCss } from './theme_builder/mdstyle'

let savedConfigPath: vscode.Uri
let extensionRoot: vscode.Uri

export async function activate(context: vscode.ExtensionContext) {
    extensionRoot = context.extensionUri
    savedConfigPath = vscode.Uri.joinPath(extensionRoot, DIST_DIR, "current_theme_cfg.json")

    vscode.workspace.onDidChangeConfiguration(onCfgChange)

    // Check if we need to update theme:
    // * First install, ok, correct theme is bundled
    // * After plugin update, we should regenerate theme with user set options. 
    //   Theme version is in settings.json, so after the update cfg is changed, 
    //   and below will regenerate the theme.
    // * After manual settings change (eg user changed settings.json not from VSCode),
    //   we should also update theme. Thus we should check if options were changed at the start.
    //
    // To detect change in config, we save the config that was used to generate the theme to `savedConfigPath`.

    // If anything throws here it will fail to activate the extension. That's probably the desired behavior.
    const savedCfgReadResult = await readCfgFromFile(savedConfigPath);
    let savedCfg = savedCfgReadResult.cfg
    const currentCfg = getCurrentCfg();
    if (!savedCfgReadResult.exists || savedCfg.themeVersion != currentCfg.themeVersion) {
        if (currentCfg.showUpdateNotifications) {
            // if the previously saved config does not exist, it either is a first install or a plugin update from before v0.4.0
            // we cannot distinguish between these two cases, but we definitely want to show a notification for an update from pre v0.4.0 version
            // so we'll have to show one for an fresh install too, maybe it's good, maybe not
            const savedCfgThemeVersion = savedCfgReadResult.exists ? savedCfg.themeVersion : "0.0.0"
            void showVersionUpdateNotification(savedCfgThemeVersion, currentCfg.themeVersion)
        }

        // After theme update the bundled theme uses default config
        savedCfg = config.defaultConfig()

        if (!config.eqConfig(currentCfg, savedCfg)) {
            await updateThemeFull(currentCfg)
            void showReloadWarning()
        } else {
            // Need to write it to file because if previous config was the default 
            // one then we don't update the theme version in there and version 
            // updated messages will keep popping up
            await saveCfgToFile(savedCfg, savedConfigPath);
        }
    } else if (!config.eqConfig(currentCfg, savedCfg)) {
        // Config changed manually
        await updateThemeFull(currentCfg)
        void showReloadWarning()
    }
}

async function showVersionUpdateNotification(oldVersionStr: string, newVersionStr: string) {

    type Version = {
        major: number
        minor: number
        patch: number
    }

    function parseVersion(s: string): Version {
        try {
            const parts = s.split('.')
            return {
                major: parseInt(parts[0]),
                minor: parseInt(parts[1]),
                patch: parseInt(parts[2])
            }
        } catch (err) {
            throw Error(`failed to parse version: ${(err as Error).toString()}`)
        }
    }

    let msg = `Pastel Evening Theme version ${newVersionStr} has been installed.`
    try {
        const oldVersion = parseVersion(oldVersionStr)
        //const newVersion = parseVersion(newVersionStr)

        const changelogLabel = "Open changelog"
        const settingsLabel = "Open settings"
        const dontShowAnymore = "Don't show anymore"

        let action: string | undefined
        if (oldVersion.major == 0 && oldVersion.minor < 4) {
            msg += " It includes easy configuration options to customize the theme. Check out the setting in the editor."
            action = await vscode.window.showInformationMessage(msg, settingsLabel, changelogLabel, dontShowAnymore)
        } else {
            action = await vscode.window.showInformationMessage(msg, changelogLabel, dontShowAnymore)
        }

        if (action === changelogLabel) {
            const changelogPath = vscode.Uri.parse('https://github.com/kaiusl/pastel_evening_vscode/blob/main/CHANGELOG.md')
            void vscode.env.openExternal(changelogPath)
        } else if (action === settingsLabel) {
            void vscode.commands.executeCommand('workbench.action.openSettings', `@ext:kaiusl.pastel-evening-theme`)
        } else if (action === dontShowAnymore) {
            const cfg = vscode.workspace.getConfiguration(config.Keys.ROOT)
            await cfg.update(config.Keys.SHOW_UPDATE_NOTIFICATIONS, false, vscode.ConfigurationTarget.Global)
            await saveCfgToFile(getCurrentCfg(), savedConfigPath)
        }
    } catch (err) {
        void vscode.window.showErrorMessage(msg)
    }
}

async function onCfgChange(event: vscode.ConfigurationChangeEvent) {
    if (!event.affectsConfiguration(config.Keys.ROOT)) {
        return;
    }

    try {
        // check what part of config changed and only update what's necessary
        if (event.affectsConfiguration(config.joinKeys(config.Keys.ROOT, config.Keys.SHOW_UPDATE_NOTIFICATIONS))) {
            // don't need to do anything
            return
        } else if (event.affectsConfiguration(config.joinKeys(config.Keys.ROOT, config.Keys.MARKDOWN_PREVIEW_STYLE))) {
            const cfg = getCurrentCfg()
            // Don't need to regenerate theme files
            await updateMdStyle(createDarkTheme(cfg), cfg)
            void showReloadWarning()
        } else {
            const cfg = getCurrentCfg()
            const currentThemeCfg = (await readCfgFromFile(savedConfigPath)).cfg;
            if (!config.eqConfig(cfg, currentThemeCfg)) {
                // only generate theme if cfg actually changed from the saved one
                // 
                // For example in untrusted workspaces user can edit the workspace config but it won't apply as we don't trust it.
                await updateThemeFull(cfg)
                void showReloadWarning()
            }
        }
    } catch (err) {
        void vscode.window.showErrorMessage(`Failed to update theme: ${(err as Error).toString()}`)
    }
}

async function showReloadWarning() {
    const msg = "Pastel Evening Theme configuration has changed. \n\nPlease reload the window for the changes to take effect."
    const reloadLabel = "Reload"
    const action = await vscode.window.showWarningMessage(msg, reloadLabel)
    if (action === reloadLabel) {
        await vscode.commands.executeCommand('workbench.action.reloadWindow')
    }
}

export function getCurrentCfg(): config.Config {
    try {
        const cfg = vscode.workspace.getConfiguration(config.Keys.ROOT)

        const resultCfg = config.defaultConfig()
        resultCfg.useItalics = cfg.get(config.Keys.ITALICS, resultCfg.useItalics)
        resultCfg.useUnderlined = cfg.get(config.Keys.UNDERLINED, resultCfg.useUnderlined)
        resultCfg.exportMarkdownPreviewStyle = cfg.get(config.Keys.MARKDOWN_PREVIEW_STYLE, resultCfg.exportMarkdownPreviewStyle)
        resultCfg.commonColorOverrides = cfg.get(config.Keys.COMMON_COLOR_OVERRIDES, resultCfg.commonColorOverrides)
        resultCfg.editorColorOverrides = cfg.get(config.Keys.EDITOR_COLOR_OVERRIDES, resultCfg.editorColorOverrides)
        resultCfg.extensionColors = cfg.get(config.Keys.EXTENSION_COLORS, resultCfg.extensionColors)
        resultCfg.uiColorOverrides = cfg.get(config.Keys.UI_COLOR_OVERRIDES, resultCfg.uiColorOverrides)
        resultCfg.tokensColorOverrides = cfg.get(config.Keys.TOKENS_COLOR_OVERRIDES, resultCfg.tokensColorOverrides)
        resultCfg.showUpdateNotifications = cfg.get(config.Keys.SHOW_UPDATE_NOTIFICATIONS, resultCfg.showUpdateNotifications)
        return resultCfg
    } catch (err) {
        throw Error(`failed to read current theme config: ${(err as Error).toString()}`)
    }
}

type CfgReadResult = {
    exists: boolean,
    cfg: config.Config
}

export async function readCfgFromFile(path: vscode.Uri): Promise<CfgReadResult> {
    let cfg = config.defaultConfig()
    let exists = true
    try {
        const contents = await vscode.workspace.fs.readFile(path)
        const cfgStr = new TextDecoder().decode(contents)
        const readCfg = JSON.parse(cfgStr) as Partial<config.Config>
        cfg = config.mergeConfig(cfg, readCfg)
    } catch (err) {
        if (err instanceof vscode.FileSystemError && err.code == "FileNotFound") {
            // It's ok, means that the extension is run first time
            exists = false
        } else {
            throw Error(`failed to read saved theme config: ${(err as Error).toString()}`)
        }
    }

    return { exists, cfg }
}

async function saveCfgToFile(cfg: config.Config, path: vscode.Uri) {
    try {
        const contents = new TextEncoder().encode(JSON.stringify(cfg))
        await vscode.workspace.fs.writeFile(path, contents)
    } catch (err) {
        throw Error(`failed to save theme config: ${(err as Error).toString()}`)
    }
}

async function updateThemeFull(cfg: config.Config) {
    let theme: ThemeDef
    try {
        theme = createDarkTheme(cfg)
    } catch (err) {
        throw Error(`failed to create theme: ${(err as Error).toString()}`)
    }
    await Promise.all([
        generateThemeJson(theme),
        generateAndUpdateMdStyle(theme, cfg),
        saveCfgToFile(cfg, savedConfigPath)
    ])
}

async function generateThemeJson(theme: ThemeDef) {
    try {
        const dst = vscode.Uri.joinPath(extensionRoot, theme.themeDistPath)
        const json = buildThemeJson(theme)
        const jsonBytes = new TextEncoder().encode(json)
        await vscode.workspace.fs.writeFile(dst, jsonBytes)
    } catch (err) {
        throw Error(`failed to generate theme json: ${(err as Error).toString()}`)
    }
}

async function generateAndUpdateMdStyle(theme: ThemeDef, cfg: config.Config) {
    await generateMdStyleCss(theme)
    // generation needs to finish before updating the contributed file
    await updateMdStyle(theme, cfg)
}

async function updateMdStyle(theme: ThemeDef, cfg: config.Config) {
    try {
        const dst = vscode.Uri.joinPath(extensionRoot, theme.mdstyleContribPath)
        if (cfg.exportMarkdownPreviewStyle) {
            const src = vscode.Uri.joinPath(extensionRoot, theme.mdstyleDistPath)
            await vscode.workspace.fs.copy(src, dst, { overwrite: true })
        } else {
            await vscode.workspace.fs.writeFile(dst, new TextEncoder().encode(""))
        }
    } catch (err) {
        throw Error(`failed to update mdstyle: ${(err as Error).toString()}`)
    }
}

async function generateMdStyleCss(theme: ThemeDef) {
    try {
        const dst = vscode.Uri.joinPath(extensionRoot, theme.mdstyleDistPath)
        const css = buildMdstyleCss(theme)
        await vscode.workspace.fs.writeFile(dst, new TextEncoder().encode(css))
    } catch (err) {
        throw Error(`failed to generate mdstyle css: ${(err as Error).toString()}`)
    }
}