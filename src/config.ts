import { THEME_VERSION } from "./version"

export enum Keys {
    ROOT = "pastelEveningTheme",
    ITALICS = "italics",
    UNDERLINED = "underlined",
    MARKDOWN_PREVIEW_STYLE = "markdownPreviewStyle",
}

export type Config = {
    italics: boolean
    underlined: boolean
    markdownPreviewStyle: boolean
    themeVersion: string
}

export function defaultConfig(): Config {
    return {
        italics: true,
        underlined: true,
        markdownPreviewStyle: true,
        themeVersion: THEME_VERSION
    }
}

export function eqConfig(a: Config, b: Config): boolean {
    return a.italics === b.italics
        && a.underlined === b.underlined
        && a.markdownPreviewStyle === b.markdownPreviewStyle
        && a.themeVersion === b.themeVersion
}

/** Joins multiple `Keys` components into a complete key.
 * 
 * Usual key is `ROOT.SOME_KEY`.
 */
export function joinKeys(...paths: Keys[]): string {
    return paths.join(".")
}