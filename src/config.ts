import { THEME_VERSION } from "./version"

export enum Keys {
    ROOT = "pastelEveningTheme",
    ITALICS = "italics",
    UNDERLINED = "underlined",
}

export type Config = {
    italics: boolean
    underlined: boolean
    themeVersion: string
}

export function defaultConfig(): Config {
    return {
        italics: true,
        underlined: true,
        themeVersion: THEME_VERSION
    }
}

export function eqConfig(a: Config, b: Config): boolean {
    return a.italics === b.italics
        && a.underlined === b.underlined
        && a.themeVersion === b.themeVersion
}

/** Joins multiple `Keys` components into a complete key.
 * 
 * Usual key is `ROOT.SOME_KEY`.
 */
export function joinKeys(...paths: Keys[]): string {
    return paths.join(".")
}