import { THEME_VERSION } from "./version"

const CONFIG_VERSION = 1

export enum Keys {
    ROOT = "pastelEveningTheme",
    ITALICS = "useItalics",
    UNDERLINED = "useUnderlined",
    MARKDOWN_PREVIEW_STYLE = "exportMarkdownPreviewStyle",
    COLOR_OVERRIDES = "colorOverrides",
    COMMON_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.common`,
    UI_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.ui`,
    EDITOR_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.editor`,
    TOKENS_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.tokens`,
}

export type Config = {
    useItalics: boolean
    useUnderlined: boolean
    exportMarkdownPreviewStyle: boolean
    commonColorOverrides: CommonColorOverrides
    uiColorOverrides: UiColorOverrides
    editorColorOverrides: EditorColorOverrides
    tokensColorOverrides: TokenColorOverrides
    themeVersion: string
    configVersion: number
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
    lightOrange?: string
    yellow?: string
    green?: string
    cyan?: string
    blue?: string
    purple?: string
}

/** UI specific color overrides */
export type UiColorOverrides = {
    accentBackground?: string
    accentAltBackground?: string
    accentForeground?: string
}

/** Editor specific color overrides */
export type EditorColorOverrides = {
    selectionBackground?: string
    hoverHighlightBackground?: string
    searchMatchBackground?: string
    searchMatchSelectedBackground?: string
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
    literalsAlt?: string
    strings?: string
    stringEscapes?: string
    numbers?: string
    namespaces?: string
    localVariables?: string
    specialVariables?: string
    enumMembers?: string
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
        commonColorOverrides: {},
        uiColorOverrides: {},
        editorColorOverrides: {},
        tokensColorOverrides: {},
        themeVersion: THEME_VERSION,
        configVersion: CONFIG_VERSION
    }
}

export function eqConfig(a: Config, b: Config): boolean {
    return a.useItalics === b.useItalics
        && a.useUnderlined === b.useUnderlined
        && a.exportMarkdownPreviewStyle === b.exportMarkdownPreviewStyle
        && a.themeVersion === b.themeVersion
        && a.configVersion === b.configVersion
        && JSON.stringify(a.commonColorOverrides) === JSON.stringify(b.commonColorOverrides)
        && JSON.stringify(a.uiColorOverrides) === JSON.stringify(b.uiColorOverrides)
        && JSON.stringify(a.editorColorOverrides) === JSON.stringify(b.editorColorOverrides)
        && JSON.stringify(a.tokensColorOverrides) === JSON.stringify(b.tokensColorOverrides)
}

/** Joins multiple `Keys` components into a complete key.
 * 
 * Usual key is `ROOT.SOME_KEY`.
 */
export function joinKeys(...paths: Keys[]): string {
    return paths.join(".")
}