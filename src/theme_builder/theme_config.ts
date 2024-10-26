import { Color } from "../color/color"

export type ThemeConfig = {
    useItalics: boolean
    useUnderlined: boolean
    extensionColors: ExtensionColors
    colorOverridesBaseScheme: ThemeVariant
    commonColorOverrides: CommonColorOverrides
    uiColorOverrides: UiColorOverrides
    editorColorOverrides: EditorColorOverrides
    tokensColorOverrides: TokenColorOverrides
}

/** Merges `other` into `base`. */
export function mergeThemeConfig(base: ThemeConfig, other: Partial<ThemeConfig>) {
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
export type CommonColorOverrides = { [Property in BaseColor]: Color }
export type RawCommonColorOverrides = { [Property in keyof CommonColorOverrides]?: string }

/** UI specific color overrides */
export type UiColorOverrides = {
    "accent background": ColorOverride
    "accent alt background"?: ColorOverride
    "accent foreground": ColorOverride
}
export type RawUiColorOverrides = { [Property in keyof UiColorOverrides]?: string }

/** Editor specific color overrides */
export type EditorColorOverrides = {
    "selection background"?: ColorOverride
    "hover highlight background"?: ColorOverride
    "search match background"?: ColorOverride
    "search match selected background"?: ColorOverride
    foreground0?: ColorOverride
    foreground2?: ColorOverride
    foreground4?: ColorOverride
}
export type RawEditorColorOverrides = { [Property in keyof EditorColorOverrides]?: string }

/** Code token specific color overrides */
export type TokenColorOverrides = {
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
export type RawTokenColorOverrides = { [Property in keyof TokenColorOverrides]?: string }

export function mergeCommonColorOverrides(base: CommonColorOverrides, raw: RawCommonColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        try {
            base[k] = Color.from_hex(v)
        } catch (e) {
            console.warn(`Failed to parse '${v}' as color because '${e}'.`)
        }
    }
}

export function mergeUiColorOverrides(base: UiColorOverrides, raw: RawUiColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        const colorOverride = tryParseColorOverride(v)
        if (colorOverride != null) {
            base[k] = colorOverride
        }
    }
}

export function mergeEditorColorOverrides(base: EditorColorOverrides, raw: RawEditorColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        const colorOverride = tryParseColorOverride(v)
        if (colorOverride != null) {
            base[k] = colorOverride
        }
    }
}

export function mergeTokenColorOverrides(base: TokenColorOverrides, raw: RawTokenColorOverrides) {
    const entries = Object.entries(raw) as [keyof typeof raw, string][]
    for (const [k, v] of entries) {
        const colorOverride = tryParseTokenColorOverride(v)
        if (colorOverride != null) {
            base[k] = colorOverride
        }
    }
}

// Tagged union of color overrides
export type ColorOverrideKind = "Color" | "BaseColor" | "EditorColor";
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

export const DEF_THEME_CONFIG: ThemeConfig = {
    useItalics: true,
    useUnderlined: true,
    extensionColors: {
        "GitLens": true,
        "GitHub Pull Requests and Issues": true,
        "Error Lens": true
    },
    colorOverridesBaseScheme: ThemeVariant.Original,
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

export const DEF_THEME_CONFIG_V2: ThemeConfig = cloneThemeConfig(DEF_THEME_CONFIG)
DEF_THEME_CONFIG_V2.tokensColorOverrides.keywords = { type: "BaseColor", value: "orange" }
DEF_THEME_CONFIG_V2.tokensColorOverrides.types = { type: "BaseColor", value: "yellow" }
DEF_THEME_CONFIG_V2.tokensColorOverrides.attributes = { type: "BaseColor", value: "faint yellow" }
DEF_THEME_CONFIG_V2.tokensColorOverrides.interfaces = { type: "BaseColor", value: "faint yellow" }

export function cloneThemeConfig(cfg: ThemeConfig): ThemeConfig {
    return {
        useItalics: cfg.useItalics,
        useUnderlined: cfg.useUnderlined,
        extensionColors: { ...cfg.extensionColors },
        colorOverridesBaseScheme: cfg.colorOverridesBaseScheme,
        commonColorOverrides: { ...cfg.commonColorOverrides },
        uiColorOverrides: { ...cfg.uiColorOverrides },
        editorColorOverrides: { ...cfg.editorColorOverrides },
        tokensColorOverrides: { ...cfg.tokensColorOverrides }
    }
}