/**
 * VS Code extension entry point.
 */

import * as vscode from 'vscode'
import * as path from 'path'
import { DIST_DIR } from './common_defs'
import * as config from './config'
import { buildThemeJson } from './theme_builder/theme'
import { ThemeDef, createDarkTheme } from './theme_builder/theme'

let savedConfigPath: vscode.Uri
let extensionRoot: string

export async function activate(context: vscode.ExtensionContext) {
    extensionRoot = context.extensionUri.fsPath
    savedConfigPath = vscode.Uri.file(path.join(extensionRoot, DIST_DIR, "current_theme_cfg.json"))

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
    const savedCfg = readCfgFromFile(savedConfigPath);
    const currentCfg = getCurrentCfg();
    if (!config.eqConfig(currentCfg, await savedCfg)) {
        console.log("PET: theme config changed between load, regenerate theme")
        await updateThemeFull(currentCfg)
        void showReloadWarning()
    }

    console.log("PET: Finished activation")
}

async function onCfgChange(event: vscode.ConfigurationChangeEvent) {
    if (!event.affectsConfiguration(config.Keys.ROOT)) {
        return;
    }
    console.log("PET: config changed")
    // TODO: check what part of config changed and only update what's necessary
    const cfg = getCurrentCfg()
    await updateThemeFull(cfg)
    void showReloadWarning()
}

async function showReloadWarning() {
    const msg = "Theme updated. Please reload the window for the changes to take effect."
    const reloadLabel = "Reload"
    const action = await vscode.window.showWarningMessage(msg, reloadLabel)
    if (action === reloadLabel) {
        await vscode.commands.executeCommand('workbench.action.reloadWindow')
    }
}

export function getCurrentCfg(): config.Config {
    const cfg = vscode.workspace.getConfiguration(config.Keys.ROOT)

    const resultCfg = config.defaultConfig()
    resultCfg.italics = cfg.get(config.Keys.ITALICS, resultCfg.italics)
    resultCfg.underlined = cfg.get(config.Keys.UNDERLINED, resultCfg.underlined)

    return resultCfg
}

export async function readCfgFromFile(path: vscode.Uri): Promise<config.Config> {
    let cfgStr: string | null = null
    try {
        const contents = await vscode.workspace.fs.readFile(path)
        cfgStr = new TextDecoder().decode(contents)
    } catch (err) {
        if (err instanceof vscode.FileSystemError) {
            console.log(`PET: failed to load saved cfg because ${err.message}`)
            // It's ok, means that the extension is run first time
        } else {
            throw err
        }
    }

    if (cfgStr === null) {
        return config.defaultConfig()
    } else {
        return JSON.parse(cfgStr) as config.Config
    }
}

async function saveCfgToFile(cfg: config.Config, path: vscode.Uri) {
    const contents = new TextEncoder().encode(JSON.stringify(cfg))
    console.log("PET: saved config")
    await vscode.workspace.fs.writeFile(path, contents)
}

async function updateThemeFull(cfg: config.Config) {
    const theme = createDarkTheme(cfg)
    await Promise.all([
        generateThemeJson(theme),
        saveCfgToFile(cfg, savedConfigPath)
    ])
}

async function generateThemeJson(theme: ThemeDef) {
    console.log("PET: updating theme")
    const dst = vscode.Uri.file(path.join(extensionRoot, theme.themeDistPath))
    const json = buildThemeJson(theme)
    const jsonBytes = new TextEncoder().encode(json)
    await vscode.workspace.fs.writeFile(dst, jsonBytes)

    console.log("PET: Finished updating theme")
}