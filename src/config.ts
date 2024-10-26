import { cloneThemeConfig, DEF_THEME_CONFIG, DEF_THEME_CONFIG_V2, mergeThemeConfig, ThemeConfig } from "./theme_builder/theme_config"
import { THEME_VERSION } from "./version"

const CONFIG_VERSION = 2

export enum Keys {
    ROOT = "pastelEveningTheme",
    ITALICS = "useItalics",
    UNDERLINED = "useUnderlined",
    MARKDOWN_PREVIEW_STYLE = "exportMarkdownPreviewStyle",
    COLOR_OVERRIDES = "colorOverrides",
    SHOW_UPDATE_NOTIFICATIONS = "showUpdateNotifications",
    EXTENSION_COLORS = "extensionColors",
    COLOR_OVERRIDES_BASE_SCHEME = `${Keys.COLOR_OVERRIDES}.baseScheme`,
    COMMON_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.common`,
    UI_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.ui`,
    EDITOR_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.editor`,
    TOKENS_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.tokens`,
}

export type Config = {
    exportMarkdownPreviewStyle: boolean
    showUpdateNotifications: boolean
    themeVersion: string
    configVersion: number
    themeConfig: ThemeConfig
}


export function eqConfig(a: Config, b: Config): boolean {
    return a.exportMarkdownPreviewStyle === b.exportMarkdownPreviewStyle
        && a.themeVersion === b.themeVersion
        && a.configVersion === b.configVersion
        && a.showUpdateNotifications === b.showUpdateNotifications
        && JSON.stringify(a.themeConfig) === JSON.stringify(b.themeConfig)
}

export function mergeConfig(base: Config, other: Partial<Config>) {
    base.exportMarkdownPreviewStyle = other.exportMarkdownPreviewStyle ?? base.exportMarkdownPreviewStyle
    base.themeVersion = other.themeVersion ?? base.themeVersion
    base.configVersion = other.configVersion ?? base.configVersion
    base.showUpdateNotifications = other.showUpdateNotifications ?? base.showUpdateNotifications
    if (other.themeConfig !== undefined) {
        mergeThemeConfig(base.themeConfig, other.themeConfig)
    }
}

/** Joins multiple `Keys` components into a complete key.
 * 
 * Usual key is `ROOT.SOME_KEY`.
 */
export function joinKeys(...paths: Keys[]): string {
    return paths.join(".")
}

const DEF_CONFIG_PARTIAL: Config = {
    exportMarkdownPreviewStyle: true,
    themeVersion: THEME_VERSION,
    configVersion: CONFIG_VERSION,
    showUpdateNotifications: true,
    themeConfig: Object.create(null) // this is never actually used
}

export function defaultConfig(): Config {
    return {
        ...DEF_CONFIG_PARTIAL,
        themeConfig: cloneThemeConfig(DEF_THEME_CONFIG)
    }
}

export function defaultConfigV2(): Config {
    return {
        ...DEF_CONFIG_PARTIAL,
        themeConfig: cloneThemeConfig(DEF_THEME_CONFIG_V2)
    }
}