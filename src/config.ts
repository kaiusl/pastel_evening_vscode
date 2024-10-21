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

export enum ThemeVariant {
    Original = "Pastel Evening Dark",
    V2 = "Pastel Evening Dark #2",
}

export type Config = {
    useItalics: boolean
    useUnderlined: boolean
    exportMarkdownPreviewStyle: boolean
    showUpdateNotifications: boolean
    extensionColors: ExtensionColors
    colorOverridesBaseScheme: ThemeVariant
    commonColorOverrides: CommonColorOverrides
    uiColorOverrides: UiColorOverrides
    editorColorOverrides: EditorColorOverrides
    tokensColorOverrides: TokenColorOverrides
    themeVersion: string
    configVersion: number
}

export type ExtensionColors = {
    "GitLens": boolean
    "GitHub Pull Requests and Issues": boolean
    "Error Lens": boolean
}

/** Common color overrides */
export type CommonColorOverrides = {
    background0?: string
    background1?: string
    background2?: string
    background3?: string
    background4?: string
    foreground0?: string
    foreground1?: string
    foreground2?: string
    foreground3?: string
    foreground4?: string
    red?: string
    pink?: string
    orange?: string
    "light orange"?: string
    "lime green"?: string
    yellow?: string
    "faint yellow"?: string
    green?: string
    cyan?: string
    blue?: string
    purple?: string
}

/** UI specific color overrides */
export type UiColorOverrides = {
    "accent background"?: string
    "accent alt background"?: string
    "accent foreground"?: string
}

/** Editor specific color overrides */
export type EditorColorOverrides = {
    "selection background"?: string
    "hover highlight background"?: string
    "search match background"?: string
    "search match selected background"?: string
    foreground0?: string
    foreground2?: string
    foreground4?: string
}


/** Code token specific color overrides */
export type TokenColorOverrides = {
    keywords?: string
    functions?: string
    comments?: string
    literals?: string
    "literals alt"?: string
    strings?: string
    "string escapes"?: string
    numbers?: string
    namespaces?: string
    "local variables"?: string
    "special variables"?: string
    "enum members"?: string
    operators?: string
    punctuations?: string
    interfaces?: string
    attributes?: string
    labels?: string
    types?: string
}

export function defaultConfig(): Config {
    return {
        useItalics: true,
        useUnderlined: true,
        exportMarkdownPreviewStyle: true,
        showUpdateNotifications: true,
        extensionColors: {
            "GitLens": true,
            "GitHub Pull Requests and Issues": true,
            "Error Lens": true
        },
        colorOverridesBaseScheme: ThemeVariant.Original,
        commonColorOverrides: {},
        uiColorOverrides: {},
        editorColorOverrides: {},
        tokensColorOverrides: {},
        themeVersion: THEME_VERSION,
        configVersion: CONFIG_VERSION
    }
}

export function defaultConfigV2(): Config {
    const cfg = defaultConfig();

    cfg.tokensColorOverrides = {
        keywords: "orange",
        types: "yellow",
        attributes: "faint yellow",
        interfaces: "faint yellow"
    }

    return cfg
}

export function eqConfig(a: Config, b: Config): boolean {
    return a.useItalics === b.useItalics
        && a.useUnderlined === b.useUnderlined
        && a.exportMarkdownPreviewStyle === b.exportMarkdownPreviewStyle
        && a.themeVersion === b.themeVersion
        && a.configVersion === b.configVersion
        && a.showUpdateNotifications === b.showUpdateNotifications
        && a.colorOverridesBaseScheme === b.colorOverridesBaseScheme
        && JSON.stringify(a.extensionColors) === JSON.stringify(b.extensionColors)
        && JSON.stringify(a.commonColorOverrides) === JSON.stringify(b.commonColorOverrides)
        && JSON.stringify(a.uiColorOverrides) === JSON.stringify(b.uiColorOverrides)
        && JSON.stringify(a.editorColorOverrides) === JSON.stringify(b.editorColorOverrides)
        && JSON.stringify(a.tokensColorOverrides) === JSON.stringify(b.tokensColorOverrides)
}

export function mergeConfig(base: Config, other: Partial<Config>): Config {
    base.useItalics = other.useItalics ?? base.useItalics
    base.useUnderlined = other.useUnderlined ?? base.useUnderlined
    base.exportMarkdownPreviewStyle = other.exportMarkdownPreviewStyle ?? base.exportMarkdownPreviewStyle
    base.themeVersion = other.themeVersion ?? base.themeVersion
    base.configVersion = other.configVersion ?? base.configVersion
    base.colorOverridesBaseScheme = other.colorOverridesBaseScheme ?? base.colorOverridesBaseScheme
    base.extensionColors = { ...base.extensionColors, ...other.extensionColors }
    base.commonColorOverrides = { ...base.commonColorOverrides, ...other.commonColorOverrides }
    base.uiColorOverrides = { ...base.uiColorOverrides, ...other.uiColorOverrides }
    base.editorColorOverrides = { ...base.editorColorOverrides, ...other.editorColorOverrides }
    base.tokensColorOverrides = { ...base.tokensColorOverrides, ...other.tokensColorOverrides }
    base.showUpdateNotifications = other.showUpdateNotifications ?? base.showUpdateNotifications

    return base
}

/** Joins multiple `Keys` components into a complete key.
 * 
 * Usual key is `ROOT.SOME_KEY`.
 */
export function joinKeys(...paths: Keys[]): string {
    return paths.join(".")
}