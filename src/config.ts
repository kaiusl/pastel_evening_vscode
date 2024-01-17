import { THEME_VERSION } from "./version"

export enum Keys {
    ROOT = "pastelEveningTheme",
    ITALICS = "italics",
    UNDERLINED = "underlined",
    MARKDOWN_PREVIEW_STYLE = "markdownPreviewStyle",
    COLOR_OVERRIDES = "colorOverrides",
    COMMON_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.common`,
    UI_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.ui`,
    EDITOR_COLOR_OVERRIDES = `${Keys.COLOR_OVERRIDES}.editor`,
}

export type Config = {
    italics: boolean
    underlined: boolean
    markdownPreviewStyle: boolean
    commonColorOverrides: CommonColorOverrides
    uiColorOverrides: UiColorOverrides
    editorColorOverrides: EditorColorOverrides
    themeVersion: string
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
}


export function defaultConfig(): Config {
    return {
        italics: true,
        underlined: true,
        markdownPreviewStyle: true,
        commonColorOverrides: {},
        uiColorOverrides: {},
        editorColorOverrides: {},
        themeVersion: THEME_VERSION
    }
}

export function eqConfig(a: Config, b: Config): boolean {
    return a.italics === b.italics
        && a.underlined === b.underlined
        && a.markdownPreviewStyle === b.markdownPreviewStyle
        && a.themeVersion === b.themeVersion
        && JSON.stringify(a.commonColorOverrides) === JSON.stringify(b.commonColorOverrides)
        && JSON.stringify(a.uiColorOverrides) === JSON.stringify(b.uiColorOverrides)
        && JSON.stringify(a.editorColorOverrides) === JSON.stringify(b.editorColorOverrides)
}

/** Joins multiple `Keys` components into a complete key.
 * 
 * Usual key is `ROOT.SOME_KEY`.
 */
export function joinKeys(...paths: Keys[]): string {
    return paths.join(".")
}