
import { THEME_VERSION } from "./version"
import { Color } from "./color/color"

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
    useItalics: boolean
    useUnderlined: boolean
    extensionColors: ExtensionColors
    colorOverridesBaseScheme: ThemeVariant
    commonColorOverrides: CommonColorOverrides
    uiColorOverrides: UiColorOverrides
    editorColorOverrides: EditorColorOverrides
    tokensColorOverrides: TokenColorOverrides
}

export type RawConfig = {
    exportMarkdownPreviewStyle: boolean
    showUpdateNotifications: boolean
    themeVersion: string
    configVersion: number
    useItalics: boolean
    useUnderlined: boolean
    extensionColors: ExtensionColors
    colorOverridesBaseScheme: ThemeVariant
    commonColorOverrides: RawCommonColorOverrides
    uiColorOverrides: RawUiColorOverrides
    editorColorOverrides: RawEditorColorOverrides
    tokensColorOverrides: RawTokenColorOverrides
}

export type ThemeConfig = Omit<Config, "exportMarkdownPreviewStyle" | "showUpdateNotifications" | "themeVersion" | "configVersion">
export type RawThemeConfig = Omit<RawConfig, "exportMarkdownPreviewStyle" | "showUpdateNotifications" | "themeVersion" | "configVersion">


export function eqConfig<T extends Config | RawConfig>(a: T, b: T): boolean {
    return JSON.stringify(a) === JSON.stringify(b)
}

export function mergeThemeConfig<T extends ThemeConfig | RawThemeConfig>(base: T, other: Partial<T>) {
    if (other.useItalics != null) {
        base.useItalics = other.useItalics
    }

    if (other.useUnderlined != null) {
        base.useUnderlined = other.useUnderlined
    }

    if (other.colorOverridesBaseScheme != null) {
        base.colorOverridesBaseScheme = other.colorOverridesBaseScheme
    }

    if (other.extensionColors != null) {
        Object.assign(base.extensionColors, other.extensionColors)
    }

    if (other.commonColorOverrides != null) {
        Object.assign(base.commonColorOverrides, other.commonColorOverrides)
    }

    if (other.uiColorOverrides != null) {
        Object.assign(base.uiColorOverrides, other.uiColorOverrides)
    }

    if (other.editorColorOverrides != null) {
        Object.assign(base.editorColorOverrides, other.editorColorOverrides)
    }

    if (other.tokensColorOverrides != null) {
        Object.assign(base.tokensColorOverrides, other.tokensColorOverrides)
    }
}

export function mergeConfig<T extends Config | RawConfig>(base: T, other: Partial<T>) {
    if (other.exportMarkdownPreviewStyle != null) {
        base.exportMarkdownPreviewStyle = other.exportMarkdownPreviewStyle
    }

    if (other.showUpdateNotifications != null) {
        base.showUpdateNotifications = other.showUpdateNotifications
    }

    if (other.themeVersion != null) {
        base.themeVersion = other.themeVersion
    }

    if (other.configVersion != null) {
        base.configVersion = other.configVersion
    }

    mergeThemeConfig(base, other)
}

/** Joins multiple `Keys` components into a complete key.
 * 
 * Usual key is `ROOT.SOME_KEY`.
 */
export function joinKeys(...paths: Keys[]): string {
    return paths.join(".")
}

export function configFromRaw(raw: RawConfig): Config {
    let result: Config;

    if (raw.colorOverridesBaseScheme === ThemeVariant.V2) {
        result = cloneConfig(DEF_CONFIG_V2)
    } else {
        result = cloneConfig(DEF_CONFIG)
    }

    result.exportMarkdownPreviewStyle = raw.exportMarkdownPreviewStyle
    result.showUpdateNotifications = raw.showUpdateNotifications
    result.themeVersion = raw.themeVersion
    result.configVersion = raw.configVersion
    result.useItalics = raw.useItalics
    result.useUnderlined = raw.useUnderlined
    result.colorOverridesBaseScheme = raw.colorOverridesBaseScheme
    result.extensionColors = raw.extensionColors
    mergeCommonColorOverrides(result.commonColorOverrides, raw.commonColorOverrides)
    mergeUiColorOverrides(result.uiColorOverrides, raw.uiColorOverrides)
    mergeEditorColorOverrides(result.editorColorOverrides, raw.editorColorOverrides)
    mergeTokenColorOverrides(result.tokensColorOverrides, raw.tokensColorOverrides)

    return result
}

export enum ThemeVariant {
    Original = "Pastel Evening Dark",
    V2 = "Pastel Evening Dark #2",
}

export type ExtensionColors = {
    "GitLens": boolean
    "GitHub Pull Requests and Issues": boolean
    "Error Lens": boolean
}

const baseColorsAsStrings = [
    "background0",
    "background1",
    "background2",
    "background3",
    "background4",

    "foreground0",
    "foreground1",
    "foreground2",
    "foreground3",
    "foreground4",

    "red",
    "orange",
    "light orange",
    "yellow",
    "faint yellow",
    "lime green",
    "green",
    "cyan",
    "blue",
    "purple",
    "pink",

    "bright red",
    "bright yellow",
    "bright green",
    "bright blue",
] as const;
export type BaseColor = (typeof baseColorsAsStrings)[number];

function isBaseColor(value: string): value is BaseColor {
    return baseColorsAsStrings.includes(value as BaseColor)
}

const editorColorsAsStrings = [
    "editor.foreground0",
    "editor.foreground2",
    "editor.foreground4",
] as const;
export type EditorColor = (typeof editorColorsAsStrings)[number];

function isEditorColor(value: string): value is EditorColor {
    return editorColorsAsStrings.includes(value as EditorColor)
}

/** Common color overrides */
type CommonColorOverrides = { [Property in BaseColor]: Color }
type RawCommonColorOverrides = { [Property in keyof CommonColorOverrides]?: string }

/** UI specific color overrides */
type UiColorOverrides = {
    "accent background": ColorOverride
    "accent alt background"?: ColorOverride
    "accent foreground": ColorOverride
}
type RawUiColorOverrides = { [Property in keyof UiColorOverrides]?: string }

/** Editor specific color overrides */
type EditorColorOverrides = {
    "selection background"?: ColorOverride
    "hover highlight background"?: ColorOverride
    "search match background"?: ColorOverride
    "search match selected background"?: ColorOverride
    foreground0?: ColorOverride
    foreground2?: ColorOverride
    foreground4?: ColorOverride
}
type RawEditorColorOverrides = { [Property in keyof EditorColorOverrides]?: string }

/** Code token specific color overrides */
type TokenColorOverrides = {
    keywords: TokenColorOverride
    functions: TokenColorOverride
    comments?: TokenColorOverride
    literals: TokenColorOverride
    "literals alt": TokenColorOverride
    strings?: TokenColorOverride
    "string escapes"?: TokenColorOverride
    numbers?: TokenColorOverride
    namespaces: TokenColorOverride
    "local variables": TokenColorOverride
    "special variables": TokenColorOverride
    "enum members": TokenColorOverride
    operators?: TokenColorOverride
    punctuations?: TokenColorOverride
    interfaces: TokenColorOverride
    attributes: TokenColorOverride
    labels?: TokenColorOverride
    types: TokenColorOverride
}
type RawTokenColorOverrides = { [Property in keyof TokenColorOverrides]?: string }

function mergeCommonColorOverrides(base: CommonColorOverrides, raw: RawCommonColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        try {
            base[k] = Color.from_hex(v)
        } catch (e) {
            console.warn(`Failed to parse '${v}' as color because '${e}'.`)
        }
    }
}

function mergeUiColorOverrides(base: UiColorOverrides, raw: RawUiColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        const colorOverride = tryParseColorOverride(v)
        if (colorOverride != null) {
            base[k] = colorOverride
        }
    }
}

function mergeEditorColorOverrides(base: EditorColorOverrides, raw: RawEditorColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        const colorOverride = tryParseColorOverride(v)
        if (colorOverride != null) {
            base[k] = colorOverride
        }
    }
}

function mergeTokenColorOverrides(base: TokenColorOverrides, raw: RawTokenColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        const colorOverride = tryParseTokenColorOverride(v)
        if (colorOverride != null) {
            base[k] = colorOverride
        }
    }
}

// Tagged union of color overrides
type ColorOverrideKind = "Color" | "BaseColor" | "EditorColor";
interface IColorBase {
    readonly type: ColorOverrideKind,
}

interface IColor extends IColorBase {
    readonly type: "Color",
    readonly value: Color,
}

interface IBaseColor extends IColorBase {
    readonly type: "BaseColor",
    readonly value: BaseColor
}

interface IEditorColor extends IColorBase {
    readonly type: "EditorColor",
    readonly value: EditorColor
}

export type ColorOverride = IColor | IBaseColor
export type TokenColorOverride = ColorOverride | IEditorColor

function tryParseColorOverride(value: string): ColorOverride | null {
    if (value.startsWith("#")) {
        try {
            return { type: "Color", value: Color.from_hex(value) }
        } catch (e) {
            console.warn(`Failed to parse '${value}' as color because '${e}'.`)
        }
    } else if (isBaseColor(value)) {
        return { type: "BaseColor", value: value }
    } else {
        console.warn(`Failed to parse '${value}' as color override.`)
    }

    return null
}

function tryParseTokenColorOverride(value: string): TokenColorOverride | null {
    let step1 = tryParseColorOverride(value)
    if (step1 != null) {
        return step1
    } else if (isEditorColor(value)) {
        return { type: "EditorColor", value: value }
    } else {
        console.warn(`Failed to parse '${value}' as token color override.`)
    }

    return null
}

export const DEF_RAW_THEME_CONFIG: Readonly<RawThemeConfig> = {
    useItalics: true,
    useUnderlined: true,
    extensionColors: {
        "GitLens": true,
        "GitHub Pull Requests and Issues": true,
        "Error Lens": true
    },
    colorOverridesBaseScheme: ThemeVariant.Original,
    commonColorOverrides: {},
    uiColorOverrides: {},
    editorColorOverrides: {},
    tokensColorOverrides: {}
}

export const DEF_RAW_CONFIG: Readonly<RawConfig> = {
    exportMarkdownPreviewStyle: true,
    themeVersion: THEME_VERSION,
    configVersion: CONFIG_VERSION,
    showUpdateNotifications: true,
    ...DEF_RAW_THEME_CONFIG
}

export const DEF_THEME_CONFIG: Readonly<ThemeConfig> = {
    ...DEF_RAW_THEME_CONFIG,
    commonColorOverrides: {
        background0: Color.from_hex("#1d1f27"),
        background1: Color.from_hex("#24262e"),
        background2: Color.from_hex("#2b2d36"),
        background3: Color.from_hex("#33353d"),
        background4: Color.from_hex("#3b3d45"),
        foreground0: Color.from_hex("#7c8393"),
        foreground1: Color.from_hex("#9198a8"),
        foreground2: Color.from_hex("#a6aebe"),
        foreground3: Color.from_hex("#bcc4d5"),
        foreground4: Color.from_hex("#d3dbec"),
        red: Color.from_hex("#faa2a0"),
        pink: Color.from_hex("#f9b0e1"),
        orange: Color.from_hex("#f9a988"),
        "light orange": Color.from_hex("#e0b490"),
        "lime green": Color.from_hex("#c4d083"),
        yellow: Color.from_hex("#efc785"),
        "faint yellow": Color.from_hex("#d2c6b2"),
        green: Color.from_hex("#8edca9"),
        cyan: Color.from_hex("#6bd8dc"),
        blue: Color.from_hex("#83cafb"),
        purple: Color.from_hex("#c6b4fb"),
        "bright red": Color.from_hex("#fe7577"),
        "bright green": Color.from_hex("#1ceb96"),
        "bright blue": Color.from_hex("#49b8fe"),
        "bright yellow": Color.from_hex("#fec257"),
    },
    uiColorOverrides: {
        "accent background": { type: "BaseColor", value: "blue" },
        "accent foreground": { type: "BaseColor", value: "background0" },
    },
    editorColorOverrides: {},
    tokensColorOverrides: {
        keywords: { type: "BaseColor", value: "red" },
        functions: { type: "BaseColor", value: "blue" },
        comments: { type: "EditorColor", value: "editor.foreground0" },
        literals: { type: "BaseColor", value: "light orange" },
        "literals alt": { type: "BaseColor", value: "orange" },
        namespaces: { type: "EditorColor", value: "editor.foreground2" },
        "local variables": { type: "EditorColor", value: "editor.foreground2" },
        "special variables": { type: "EditorColor", value: "editor.foreground4" },
        "enum members": { type: "EditorColor", value: "editor.foreground4" },
        interfaces: { type: "BaseColor", value: "yellow" },
        attributes: { type: "BaseColor", value: "faint yellow" },
        types: { type: "BaseColor", value: "green" }
    }
}

export const DEF_THEME_CONFIG_V2: Readonly<ThemeConfig> = {
    ...DEF_THEME_CONFIG,
    tokensColorOverrides: {
        ...DEF_THEME_CONFIG.tokensColorOverrides,
        keywords: { type: "BaseColor", value: "orange" },
        types: { type: "BaseColor", value: "yellow" },
        attributes: { type: "BaseColor", value: "faint yellow" },
        interfaces: { type: "BaseColor", value: "faint yellow" },
    }
}

export const DEF_CONFIG: Readonly<Config> = {
    ...DEF_RAW_CONFIG,
    ...DEF_THEME_CONFIG
}

export const DEF_CONFIG_V2: Readonly<Config> = {
    ...DEF_RAW_CONFIG,
    ...DEF_THEME_CONFIG_V2
}

export function cloneConfig<T extends Config | ThemeConfig | RawConfig | RawThemeConfig>(cfg: T): T {
    return {
        ...cfg,
        extensionColors: { ...cfg.extensionColors },
        commonColorOverrides: { ...cfg.commonColorOverrides },
        uiColorOverrides: { ...cfg.uiColorOverrides },
        editorColorOverrides: { ...cfg.editorColorOverrides },
        tokensColorOverrides: { ...cfg.tokensColorOverrides }
    }
}