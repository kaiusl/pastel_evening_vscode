/**
 * Module for generating theme files.
 */

import { Color } from "../color/color";
import path from "path"
import { DIST_THEMES_DIR } from "../common_defs";
import { BaseColor, cloneConfig, ColorOverride, DEF_THEME_CONFIG, DEF_THEME_CONFIG_V2, EditorColor, ExtensionColors, mergeThemeConfig, ThemeConfig, ThemeVariant, TokenColorOverride } from "../config";


export enum ThemeKind {
    DARK = "dark",
    LIGHT = "light"
}
/** Complete theme definition. */
export class ThemeDef {

    constructor(
        fileName: string,
        displayName: string,
        kind: ThemeKind,
        cfg: ThemeConfig
    ) {
        this.fileName = fileName;
        this.displayName = displayName;
        this.kind = kind;
        this.extensionColors = cfg.extensionColors;

        this.italics = cfg.useItalics;
        this.underlined = cfg.useUnderlined;

        this.bgColor0 = cfg.commonColorOverrides.background0;
        this.bgColor1 = cfg.commonColorOverrides.background1;
        this.bgColor2 = cfg.commonColorOverrides.background2;
        this.bgColor3 = cfg.commonColorOverrides.background3;
        this.bgColor4 = cfg.commonColorOverrides.background4;

        this.fgColor0 = cfg.commonColorOverrides.foreground0;
        this.fgColor1 = cfg.commonColorOverrides.foreground1;
        this.fgColor2 = cfg.commonColorOverrides.foreground2;
        this.fgColor3 = cfg.commonColorOverrides.foreground3;
        this.fgColor4 = cfg.commonColorOverrides.foreground4;

        this.red = cfg.commonColorOverrides.red;
        this.blue = cfg.commonColorOverrides.blue;
        this.green = cfg.commonColorOverrides.green;
        this.yellow = cfg.commonColorOverrides.yellow;
        this.lightOrange = cfg.commonColorOverrides["light orange"];
        this.limeGreen = cfg.commonColorOverrides["lime green"];
        this.faintYellow = cfg.commonColorOverrides["faint yellow"];
        this.orange = cfg.commonColorOverrides.orange;
        this.cyan = cfg.commonColorOverrides.cyan;
        this.pink = cfg.commonColorOverrides.pink;
        this.purple = cfg.commonColorOverrides.purple;
        this.brightRed = cfg.commonColorOverrides["bright red"];
        this.brightGreen = cfg.commonColorOverrides["bright green"];
        this.brightBlue = cfg.commonColorOverrides["bright blue"];
        this.brightYellow = cfg.commonColorOverrides["bright yellow"];

        this.accentBgColor = this.resolveColor(cfg.uiColorOverrides["accent background"]);
        this.accentFgColor = this.resolveColor(cfg.uiColorOverrides["accent foreground"]);
        this.accentAltBgColor = this.resolveOptionalColor(cfg.uiColorOverrides["accent alt background"]) ?? this.accentBgColor.darken(0.15).desaturate(0.5);

        this.searchMatchSelectedBgColor = this.resolveOptionalColor(cfg.editorColorOverrides["search match selected background"]) ?? this.bgColor0;
        this.searchMatchBgColor = this.resolveOptionalColor(cfg.editorColorOverrides["search match background"]) ?? this.red.overlayOpacity(0.1, this.bgColor0);
        this.selectionBgColor = this.resolveOptionalColor(cfg.editorColorOverrides["selection background"]) ?? this.blue.setAlpha(0.2);
        this.editorHoverHighlightBgColor = this.resolveOptionalColor(cfg.editorColorOverrides["hover highlight background"]) ?? this.yellow.setAlpha(0.15);

        this.borderColor = this.bgColor0.setAlpha(0.25);
        this.hoverColor = this.fgColor4;
        this.scrollBarOpacity = 0.05;
        this.hoverOpacity = 0.1;
        this.activeOpacity = 0.2;
        this.dropBgColor = this.fgColor4.setAlpha(0.1);
        this.overlayBaseColor = this.bgColor0;
        this.mutedOpacity = 0.625;
        this.diffBgOpacity = 0.05;
        this.diffGutterOpacity = 0.1;
        this.diffMarkerOpacity = 0.25;

        this.codeFgColor0 = this.resolveOptionalColor(cfg.editorColorOverrides.foreground0) ?? this.fgColor0;
        this.codeFgColor2 = this.resolveOptionalColor(cfg.editorColorOverrides.foreground2) ?? this.fgColor2;
        this.codeFgColor4 = this.resolveOptionalColor(cfg.editorColorOverrides.foreground4) ?? this.fgColor4;

        this.commentsColor = this.resolveOptionalTokenColor(cfg.tokensColorOverrides.comments) ?? this.codeFgColor0;
        this.keywordsColor = this.resolveTokenColor(cfg.tokensColorOverrides.keywords);
        this.literalsColor = this.resolveTokenColor(cfg.tokensColorOverrides.literals);
        this.literalsColor2 = this.resolveTokenColor(cfg.tokensColorOverrides["literals alt"]);
        this.stringsColor = this.resolveOptionalTokenColor(cfg.tokensColorOverrides.strings) ?? this.literalsColor;
        this.stringEscapesColor = this.resolveOptionalTokenColor(cfg.tokensColorOverrides["string escapes"]) ?? this.literalsColor2;
        this.numbersColor = this.resolveOptionalTokenColor(cfg.tokensColorOverrides.numbers) ?? this.literalsColor;
        this.namespacesColor = this.resolveTokenColor(cfg.tokensColorOverrides.namespaces);
        this.localVariablesColor = this.resolveTokenColor(cfg.tokensColorOverrides["local variables"]);
        this.specialVariablesColor = this.resolveTokenColor(cfg.tokensColorOverrides["special variables"]);
        this.enumMembersColor = this.resolveTokenColor(cfg.tokensColorOverrides["enum members"]);
        this.operatorsColor = this.resolveOptionalTokenColor(cfg.tokensColorOverrides.operators) ?? this.codeFgColor2;
        this.punctuationsColor = this.resolveOptionalTokenColor(cfg.tokensColorOverrides.punctuations) ?? this.codeFgColor2;
        this.interfacesColor = this.resolveTokenColor(cfg.tokensColorOverrides.interfaces);
        this.attributesColor = this.resolveTokenColor(cfg.tokensColorOverrides.attributes);
        this.labelsColor = this.resolveOptionalTokenColor(cfg.tokensColorOverrides.labels) ?? this.orange;
        this.typesColor = this.resolveTokenColor(cfg.tokensColorOverrides.types);
        this.functionsColor = this.resolveTokenColor(cfg.tokensColorOverrides.functions);

        this.themeDistPath = path.join(DIST_THEMES_DIR, this.fileName + ".json")
    }

    fileName: string;
    displayName: string;
    kind: ThemeKind;

    extensionColors: ExtensionColors;

    italics: boolean;
    underlined: boolean;

    bgColor0: Color;
    bgColor1: Color;
    bgColor2: Color;
    bgColor3: Color;
    bgColor4: Color;

    fgColor0: Color;
    fgColor1: Color;
    fgColor2: Color;
    fgColor3: Color;
    fgColor4: Color;

    accentAltBgColor: Color;
    accentBgColor: Color;
    accentFgColor: Color;
    searchMatchSelectedBgColor: Color;
    searchMatchBgColor: Color;
    selectionBgColor: Color;
    editorHoverHighlightBgColor: Color;
    borderColor: Color;
    hoverColor: Color;
    scrollBarOpacity: number;
    hoverOpacity: number;
    activeOpacity: number;
    dropBgColor: Color;
    overlayBaseColor: Color;
    mutedOpacity: number;
    diffBgOpacity: number;
    diffGutterOpacity: number;
    diffMarkerOpacity: number;

    red: Color;
    blue: Color;
    green: Color;
    yellow: Color;
    faintYellow: Color;
    lightOrange: Color;
    limeGreen: Color;
    orange: Color;
    cyan: Color;
    pink: Color;
    purple: Color;

    codeFgColor0: Color;
    codeFgColor2: Color;
    codeFgColor4: Color;

    commentsColor: Color;
    keywordsColor: Color;
    literalsColor: Color;
    literalsColor2: Color;
    stringsColor: Color;
    stringEscapesColor: Color;
    numbersColor: Color;
    namespacesColor: Color;
    localVariablesColor: Color;
    specialVariablesColor: Color;
    enumMembersColor: Color;
    operatorsColor: Color;
    punctuationsColor: Color;
    interfacesColor: Color;
    attributesColor: Color;
    labelsColor: Color;
    typesColor: Color;
    functionsColor: Color;
    brightRed: Color;
    brightGreen: Color;
    brightBlue: Color;
    brightYellow: Color;

    themeDistPath: string;


    resolveColor(c: ColorOverride): Color {
        switch (c.type) {
            case "Color":
                return c.value
            case "BaseColor":
                return this.resolveBaseColor(c.value)
        }
    }

    resolveOptionalColor(c?: ColorOverride): Color | null {
        if (c === null || c === undefined) {
            return null
        }

        return this.resolveColor(c)
    }

    resolveBaseColor(c: BaseColor): Color {
        switch (c) {
            case "red":
                return this.red
            case "blue":
                return this.blue
            case "green":
                return this.green
            case "yellow":
                return this.yellow
            case "faint yellow":
                return this.faintYellow
            case "light orange":
                return this.lightOrange
            case "lime green":
                return this.limeGreen
            case "orange":
                return this.orange
            case "cyan":
                return this.cyan
            case "pink":
                return this.pink
            case "purple":
                return this.purple

            case "bright red":
                return this.brightRed
            case "bright green":
                return this.brightGreen
            case "bright blue":
                return this.brightBlue
            case "bright yellow":
                return this.brightYellow

            case "background0":
                return this.bgColor0
            case "background1":
                return this.bgColor1
            case "background2":
                return this.bgColor2
            case "background3":
                return this.bgColor3
            case "background4":
                return this.bgColor4

            case "foreground0":
                return this.fgColor0
            case "foreground1":
                return this.fgColor1
            case "foreground2":
                return this.fgColor2
            case "foreground3":
                return this.fgColor3
            case "foreground4":
                return this.fgColor4
        }
    }

    resolveTokenColor(c: TokenColorOverride): Color {
        switch (c.type) {
            case "Color":
                return c.value;
            case "EditorColor":
                return this.resolveEditorColor(c.value);
            case "BaseColor":
                return this.resolveBaseColor(c.value);
        }
    }

    resolveOptionalTokenColor(c?: TokenColorOverride): Color | null {
        if (c === null || c === undefined) {
            return null
        }

        return this.resolveTokenColor(c)
    }

    resolveEditorColor(c: EditorColor): Color {
        switch (c) {
            case "editor.foreground0":
                return this.codeFgColor0
            case "editor.foreground2":
                return this.codeFgColor2
            case "editor.foreground4":
                return this.codeFgColor4
        }
    }
}

export function createDarkThemeV2(): ThemeDef {
    return new ThemeDef(
        "pastel_evening_dark_2",
        "Pastel Evening Dark 2",
        ThemeKind.DARK,
        DEF_THEME_CONFIG_V2
    )
}

export function createDarkTheme(user_cfg: ThemeConfig): ThemeDef {
    let cfg: ThemeConfig
    if (user_cfg.colorOverridesBaseScheme === ThemeVariant.V2) {
        cfg = cloneConfig(DEF_THEME_CONFIG_V2)
    } else {
        cfg = cloneConfig(DEF_THEME_CONFIG)
    }

    mergeThemeConfig(cfg, user_cfg);

    return new ThemeDef(
        "pastel_evening_dark",
        "Pastel Evening Dark",
        ThemeKind.DARK,
        cfg
    )
}

export function createAllConstThemes(): ThemeDef[] {
    return [createDarkThemeV2()]
}

export function buildThemeJson(themeDef: ThemeDef): string {
    const theme = {
        "$schema": "vscode://schemas/color-theme",
        "type": themeDef.kind,
        "colors": editorColors(themeDef),
        "tokenColors": tokenColors(themeDef),
        "semanticHighlighting": true,
        "semanticTokenColors": semanticTokenColors(themeDef)
    };

    return JSON.stringify(theme, null, 4);
}

function editorColors(theme: ThemeDef): { [k: string]: string | Color } {
    const muted = function (c: Color): Color {
        return c.overlayOpacity(theme.mutedOpacity, theme.overlayBaseColor)
    }

    type EditorColors = { [k: string]: string | Color }

    const colors: EditorColors = {
        // common
        "foreground": theme.fgColor2,
        "selection.background": theme.selectionBgColor,
        "descriptionForeground": theme.fgColor2,
        "icon.foreground": theme.fgColor2,
        "disabledForeground": theme.fgColor0,
        "contrastActiveBorder": "#00000000",
        "contrastBorder": "#00000000",
        "focusBorder": "#00000000",
        "widget.shadow": theme.borderColor,
        // window
        // "window.activeBorder": "#f0f", // "#f0f"
        // "window.inactiveBorder": "#f0f",
        // welcome page
        // "walkthrough.stepTitle.foreground": "#f0f", // color.bright_fg
        "welcomePage.progress.background": theme.bgColor0,
        "welcomePage.progress.foreground": theme.accentBgColor,
        "welcomePage.tileBackground": theme.bgColor1,
        // "welcomePage.tileBorder": "#f0f", // "#d1d5eb1a"
        "welcomePage.tileHoverBackground": theme.bgColor3,
        "welcomePage.background": theme.bgColor2, // "#f0f"
        // side by side editor
        //"sideBySideEditor.horizontalBorder": "#f0f", // "#444444"
        //"sideBySideEditor.verticalBorder": "#f0f", // "#444444"
        // scrollbar
        "scrollbarSlider.background": theme.hoverColor.setAlpha(theme.scrollBarOpacity),
        "scrollbarSlider.hoverBackground": theme.hoverColor.setAlpha(theme.hoverOpacity),
        "scrollbarSlider.activeBackground": theme.hoverColor.setAlpha(theme.activeOpacity),
        "scrollbar.shadow": theme.borderColor,
        // search editor
        // uses "editor.findMatch.." by default
        //"searchEditor.findMatchBackground": "#f2858540",
        //"searchEditor.findMatchBorder": "#3d6b99",
        //"searchEditor.textInputBorder": "#f0f",
        // banner
        // "banner.background": "#f0f", // "#04395e"
        // "banner.foreground": "#f0f", // color.bright_fg
        // "banner.iconForeground": "#f0f", // color.light_highlight
        // button
        "button.background": theme.accentBgColor,
        "button.hoverBackground": theme.accentBgColor.lighten(0.05),
        "button.foreground": theme.accentFgColor,
        "button.secondaryBackground": theme.accentAltBgColor,
        "button.secondaryForeground": theme.accentFgColor,
        "button.secondaryHoverBackground": theme.accentAltBgColor.lighten(0.05),
        "button.separator": theme.accentFgColor.setAlpha(0.25),
        //"button.border": "#f0f",
        // text code block
        "textCodeBlock.background": theme.borderColor,
        "textBlockQuote.background": theme.borderColor,
        "textBlockQuote.border": theme.accentBgColor,
        "textLink.activeForeground": theme.blue.lighten(0.1),
        "textLink.foreground": theme.blue,
        "textPreformat.foreground": theme.lightOrange,
        // "textSeparator.foreground": "#d1d5eb20",
        // toolbars
        "toolbar.hoverBackground": theme.hoverColor.setAlpha(theme.hoverOpacity),
        "toolbar.hoverOutline": "#00000000",
        "toolbar.activeBackground": theme.hoverColor.setAlpha(theme.activeOpacity),
        // dropdown
        "dropdown.background": theme.bgColor1,
        "dropdown.border": theme.borderColor,
        "dropdown.listBackground": theme.bgColor1,
        "dropdown.foreground": theme.fgColor2,
        // checkbox
        "checkbox.background": theme.bgColor1,
        "checkbox.border": theme.borderColor,
        // "checkbox.foreground": "#f0f", // "#f0f0f0"
        // "checkbox.selectBackground": "#f0f", // color.bg
        // "checkbox.selectBorder": "#f0f", // color.bg
        // input
        "input.background": theme.bgColor0,
        "input.border": theme.borderColor,
        "input.placeholderForeground": theme.fgColor0,
        "inputOption.activeBackground": theme.accentBgColor,
        "inputOption.activeForeground": theme.fgColor4,
        //"input.foreground": color.fg,
        //"inputOption.activeBorder": color.highlight_bg,
        "inputOption.hoverBackground": theme.hoverColor.setAlpha(theme.hoverOpacity),
        //"inputValidation.errorBackground": "#5c1c1c",
        //"inputValidation.errorBorder": color.bright_red,
        "inputValidation.errorForeground": theme.fgColor3,
        // "inputValidation.infoBackground": "#063b49",
        // "inputValidation.infoBorder": "#007acc",
        "inputValidation.infoForeground": theme.fgColor3,
        // "inputValidation.warningBackground": "#352a05",
        // "inputValidation.warningBorder": "#b89500",
        "inputValidation.warningForeground": theme.fgColor3,
        // title bar
        "titleBar.activeBackground": theme.bgColor0,
        "titleBar.activeForeground": theme.fgColor2,
        "titleBar.inactiveBackground": theme.bgColor0,
        "titleBar.inactiveForeground": theme.fgColor1,
        "titleBar.border": theme.borderColor,
        // menu bar
        "menubar.selectionBackground": theme.bgColor2,
        "menubar.selectionForeground": theme.fgColor4,
        "menubar.selectionBorder": "#00000000",
        // menu
        "menu.background": theme.bgColor0,
        "menu.border": theme.borderColor,
        "menu.foreground": theme.fgColor2,
        "menu.selectionBackground": theme.bgColor2,
        "menu.selectionForeground": theme.fgColor4,
        "menu.selectionBorder": "#00000000",
        "menu.separatorBackground": theme.bgColor3,
        // activity bar
        "activityBar.background": theme.bgColor1,
        "activityBar.border": theme.borderColor,
        "activityBar.activeBorder": theme.accentBgColor,
        "activityBar.activeBackground": theme.bgColor3,
        "activityBar.dropBorder": theme.dropBgColor,
        "activityBar.foreground": theme.fgColor4,
        "activityBar.activeFocusBorder": theme.accentBgColor,
        "activityBar.inactiveForeground": theme.fgColor4.setAlpha(0.5),
        //"activityBarItem.profilesBackground": "#4d4d4d",
        //"activityBarItem.profilesForeground": "#d1d5eb66",
        "activityBarItem.profilesHoverForeground": theme.fgColor4,
        // badge
        "activityBarBadge.background": theme.accentBgColor,
        "activityBarBadge.foreground": theme.accentFgColor,
        "badge.background": theme.accentBgColor,
        "badge.foreground": theme.accentFgColor,
        // side bar
        "sideBar.background": theme.bgColor1,
        //"sideBar.foreground": color.fg,
        "sideBarSectionHeader.background": theme.bgColor0,
        //"sideBarSectionHeader.foreground": color.fg,
        "sideBarSectionHeader.border": theme.borderColor,
        "sideBarTitle.foreground": theme.fgColor3,
        "sideBar.border": theme.borderColor,
        "sideBar.dropBackground": theme.dropBgColor,
        // tabs
        "tab.border": theme.borderColor,
        //
        "tab.activeBackground": theme.bgColor3,
        "tab.activeForeground": theme.fgColor4,
        "tab.activeBorder": theme.accentBgColor,
        // "tab.activeBorderTop": "#00000000",
        // "tab.activeModifiedBorder": color.highlight_bg,
        //
        "tab.hoverBackground": theme.bgColor2,
        "tab.hoverForeground": theme.fgColor3,
        "tab.hoverBorder": muted(theme.accentBgColor),
        //
        "tab.inactiveBackground": theme.bgColor1,
        //"tab.inactiveForeground": color.fg,
        // "tab.inactiveModifiedBorder": "#0d70b980",
        //
        // "tab.unfocusedActiveBackground": color.bg,
        //"tab.unfocusedActiveForeground": "#d1d5eb80",
        // "tab.unfocusedActiveBorder": "#0d70b980",
        // "tab.unfocusedActiveBorderTop": "#00000000",
        // "tab.unfocusedActiveModifiedBorder": "#0d70b980",
        //
        // "tab.unfocusedHoverBackground": color.bg,
        // "tab.unfocusedHoverBorder": "#0d70b980",
        // "tab.unfocusedHoverForeground": color.fg,
        //
        // "tab.unfocusedInactiveBackground": color.dark_bg,
        // "tab.unfocusedInactiveForeground": "#acafbf80",
        // "tab.unfocusedInactiveModifiedBorder": "#0d70b940",
        // list
        "list.activeSelectionBackground": theme.bgColor3,
        "list.activeSelectionForeground": theme.fgColor4,
        "list.hoverBackground": theme.bgColor2,
        "list.hoverForeground": theme.fgColor3,
        "list.inactiveSelectionBackground": theme.bgColor3,
        "list.inactiveSelectionForeground": theme.fgColor4,
        //"list.deemphasizedForeground": "#8c8c8c",
        "list.errorForeground": theme.red,
        // "list.filterMatchBackground": "#ea5c0055",
        // "list.focusHighlightForeground": "#2aaaff",
        // "list.focusOutline": "#00000000",
        // "list.highlightForeground": "#2aaaff",
        // "list.invalidItemForeground": "#b89500",
        "list.warningForeground": theme.lightOrange,
        // "listFilterWidget.background": color.bg,
        // "listFilterWidget.noMatchesOutline": "#be1100",
        // "listFilterWidget.outline": "#1d1f2400",
        // "listFilterWidget.shadow": color.border,
        // "list.filterMatchBorder": "#f0f",
        // "list.focusAndSelectionOutline": "#f0f",
        // "list.focusBackground": "#f0f",
        // "list.focusForeground": "#f0f",
        // "list.inactiveFocusBackground": "#f0f",
        // "list.inactiveFocusOutline": "#6dbaf280",
        // "list.inactiveSelectionIconForeground": "#f0f",
        // tree
        "tree.indentGuidesStroke": theme.bgColor4,
        // "tree.tableColumnsBorder":  "#cccccc20",
        // "tree.tableOddRowsBackground": "#cccccc0a",
        // progress bar
        "progressBar.background": theme.accentBgColor,
        // editor general
        "editor.background": theme.bgColor2,
        "editor.foreground": theme.fgColor2,
        "editorIndentGuide.activeBackground": theme.bgColor4.lighten(0.1), // deprecated but keep for backwards compatibility for now
        "editorIndentGuide.background": theme.bgColor4, // deprecated but keep for backwards compatibility for now
        "editorIndentGuide.activeBackground1": theme.bgColor4.lighten(0.1),
        "editorIndentGuide.background1": theme.bgColor4,
        "editor.foldBackground": theme.bgColor4,
        "editorCursor.foreground": theme.fgColor2,
        // "editorCursor.background": color.bright_bg,
        "editorPane.background": theme.bgColor1,
        // misc
        // "editorUnicodeHighlight.background": "#bd9b0326",
        // "editorUnicodeHighlight.border": "#bd9b03",
        // "editor.inlineValuesBackground": "#ffc80033",
        // "editor.inlineValuesForeground": "#d1d5eb80",
        // "editor.linkedEditingBackground": "#ff00004d",
        // "editorLink.activeForeground": "#4e94ce",
        // inlay hints
        "editorInlayHint.background": theme.bgColor4,
        "editorInlayHint.foreground": theme.fgColor1,
        "editorInlayHint.parameterBackground": theme.bgColor4,
        "editorInlayHint.parameterForeground": theme.fgColor1,
        "editorInlayHint.typeBackground": theme.bgColor4,
        "editorInlayHint.typeForeground": theme.fgColor1,
        "editorRuler.foreground": theme.bgColor4,
        // brackets
        "editorBracketHighlight.foreground1": theme.fgColor2,
        "editorBracketHighlight.foreground2": theme.blue,
        "editorBracketHighlight.foreground3": theme.lightOrange,
        "editorBracketHighlight.foreground4": theme.red,
        "editorBracketHighlight.foreground5": theme.green,
        "editorBracketMatch.background": theme.bgColor4,
        "editorBracketMatch.border": theme.fgColor0,
        // "editorBracketHighlight.unexpectedBracket.foreground": color.bright_red,
        // "editorBracketPairGuide.activeBackground1": "#1d1f2400",
        // "editorBracketPairGuide.activeBackground2": "#1d1f2400",
        // "editorBracketPairGuide.activeBackground3": "#1d1f2400",
        // "editorBracketPairGuide.activeBackground4": "#1d1f2400",
        // "editorBracketPairGuide.activeBackground5": "#1d1f2400",
        // "editorBracketPairGuide.activeBackground6": "#1d1f2400",
        // "editorBracketPairGuide.background1": "#1d1f2400",
        // "editorBracketPairGuide.background2": "#1d1f2400",
        // "editorBracketPairGuide.background3": "#1d1f2400",
        // "editorBracketPairGuide.background4": "#1d1f2400",
        // "editorBracketPairGuide.background5": "#1d1f2400",
        // "editorBracketPairGuide.background6": "#1d1f2400",
        // editor selections
        "editor.selectionBackground": theme.selectionBgColor,
        "editor.inactiveSelectionBackground": theme.selectionBgColor.multiplyAlpha(0.7),
        // "editor.selectionForeground": "#f0f",
        // "editor.selectionHighlightBorder": "#f0f",
        // editor highlights
        "editor.lineHighlightBackground": theme.bgColor2,
        "editor.wordHighlightStrongBackground": theme.editorHoverHighlightBgColor,
        "editor.wordHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.hoverHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.symbolHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.selectionHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.rangeHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.findRangeHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.focusedStackFrameHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.snippetTabstopHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.stackFrameHighlightBackground": theme.editorHoverHighlightBgColor,
        "editor.snippetFinalTabstopHighlightBackground": theme.editorHoverHighlightBgColor,
        // "editor.snippetFinalTabstopHighlightBorder": "#0000",
        // "editor.lineHighlightBorder": "#0000",
        // "editor.snippetTabstopHighlightBorder": "#0000",
        // "editor.symbolHighlightBorder": "#0000",
        // "editor.wordHighlightBorder": "#0000",
        // "editor.wordHighlightStrongBorder": "#0000",
        // "editor.rangeHighlightBorder": "#0000",
        // editor search
        "editor.findMatchBackground": theme.searchMatchSelectedBgColor,
        //"editor.findMatchBorder": "#0000",
        "editor.findMatchHighlightBackground": theme.searchMatchBgColor,
        //"editor.findMatchHighlightBorder": "#0000",
        //"editor.findRangeHighlightBorder": "#0000",
        // sticky scroll
        "editorStickyScroll.background": theme.bgColor1,
        "editorStickyScrollHover.background": theme.bgColor2,
        // editor gutter
        "editorGutter.background": theme.bgColor1,
        "editorGutter.addedBackground": theme.green,
        //"editorGutter.commentRangeForeground": "#f0f", // "#37373d"
        "editorGutter.deletedBackground": theme.brightRed,
        "editorGutter.foldingControlForeground": theme.fgColor0,
        "editorGutter.modifiedBackground": theme.blue,
        // editor code lens
        "editorCodeLens.foreground": theme.fgColor0,
        // command center
        "commandCenter.background": theme.bgColor1,
        "commandCenter.activeBackground": theme.bgColor3,
        "commandCenter.activeBorder": theme.borderColor,
        "commandCenter.activeForeground": theme.fgColor4,
        "commandCenter.border": theme.borderColor,
        "commandCenter.foreground": theme.fgColor2,
        "commandCenter.inactiveBorder": theme.borderColor,
        "commandCenter.inactiveForeground": theme.fgColor2,
        // editor hover widget
        "editorHoverWidget.background": theme.bgColor1,
        "editorHoverWidget.border": theme.borderColor,
        "editorHoverWidget.foreground": theme.fgColor2,
        //"editorHoverWidget.highlightForeground": "#f0f", // "#2aaaff"
        //"editorHoverWidget.statusBarBackground": "#f0f", // "#2c2c2d"
        // quick input (command palette for example)
        "quickInput.background": theme.bgColor1,
        "quickInput.foreground": theme.fgColor2,
        "quickInputList.focusBackground": theme.bgColor3,
        "quickInputList.focusForeground": theme.blue,
        "quickInputList.focusIconForeground": theme.blue,
        "quickInputTitle.background": theme.bgColor1,
        // editor group
        "editorGroup.border": theme.borderColor,
        "editorGroup.dropBackground": theme.dropBgColor,
        "editorGroup.dropIntoPromptBackground": theme.bgColor2,
        "editorGroup.dropIntoPromptForeground": theme.fgColor2,
        "editorGroupHeader.border": theme.bgColor0,
        "editorGroupHeader.tabsBorder": theme.bgColor0,
        "editorGroupHeader.tabsBackground": theme.bgColor1,
        "editorGroupHeader.noTabsBackground": theme.bgColor1,
        "editorGroup.dropIntoPromptBorder": theme.borderColor,
        // "editorGroup.emptyBackground": color.dark_bg,
        // "editorGroup.focusedEmptyBorder": "#f0f",
        // editor widget
        "editorWidget.background": theme.bgColor1,
        "editorWidget.resizeBorder": theme.accentAltBgColor,
        "editorWidget.border": theme.borderColor,
        //"editorWidget.foreground": color.fg,
        // editor suggest widget
        "editorSuggestWidget.background": theme.bgColor1,
        //"editorSuggestWidget.foreground": color.fg,
        "editorSuggestWidget.selectedForeground": theme.fgColor4,
        "editorSuggestWidget.focusHighlightForeground": theme.blue,
        "editorSuggestWidget.highlightForeground": theme.blue,
        "editorSuggestWidget.selectedBackground": theme.bgColor3,
        "editorSuggestWidget.selectedIconForeground": theme.blue,
        "editorSuggestWidget.border": theme.borderColor,
        //"editorSuggestWidgetStatus.foreground": "#f0f", // "#acafbf80"
        // editor comments widget
        // "editorCommentsWidget.rangeActiveBackground": "#f0f", // "#0a77c51a"
        // "editorCommentsWidget.rangeActiveBorder": "#f0f", // "#0a77c566"
        // "editorCommentsWidget.rangeBackground": "#f0f", // "#0a77c51a"
        // "editorCommentsWidget.rangeBorder": "#f0f", // "#0a77c566"
        // "editorCommentsWidget.resolvedBorder": "#f0f", // "#cccccc80"
        // "editorCommentsWidget.unresolvedBorder": "#f0f", // color.light_highlight
        // editor line numbers
        "editorLineNumber.foreground": theme.fgColor0,
        "editorLineNumber.activeForeground": theme.fgColor2,
        // editor breadcrumb
        "breadcrumb.activeSelectionForeground": theme.fgColor4,
        "breadcrumb.background": theme.bgColor0,
        "breadcrumb.focusForeground": theme.fgColor3,
        //"breadcrumb.foreground": color.fg,
        "breadcrumbPicker.background": theme.bgColor0,
        // editor ghost text (code completion text)
        // "editorGhostText.background": "#f0f",
        // "editorGhostText.border": "#f0f",
        "editorGhostText.foreground": "#d1d5eb56",
        // editor marker navigation (press F8 in file with error to see) 
        // "editorMarkerNavigation.background": color.bg, // "#1e1e1e"
        // "editorMarkerNavigationError.background": "#f0f", // color.bright_red
        // "editorMarkerNavigationError.headerBackground": "#f0f", // "#f14c4c1a"
        // "editorMarkerNavigationInfo.background": "#f0f", // color.light_highlight
        // "editorMarkerNavigationInfo.headerBackground": "#f0f", // "#0a77c51a"
        // "editorMarkerNavigationWarning.background": "#f0f", // "#cca700"
        // "editorMarkerNavigationWarning.headerBackground": "#f0f", // "#cca7001a"
        // editor overview ruler
        "editorOverviewRuler.addedForeground": theme.green.setAlpha(0.5),
        "editorOverviewRuler.border": theme.borderColor,
        // "editorOverviewRuler.bracketMatchForeground": "#f0f", // "#a0a0a0"
        // "editorOverviewRuler.commonContentForeground": "#f0f", // "#60606066"
        // "editorOverviewRuler.currentContentForeground": "#f0f", // "#40c8ae80"
        "editorOverviewRuler.deletedForeground": theme.brightRed.setAlpha(0.5),//"#f14c4c80",
        "editorOverviewRuler.errorForeground": theme.brightRed,
        "editorOverviewRuler.findMatchForeground": muted(theme.red),
        // "editorOverviewRuler.incomingContentForeground": "#f0f", // "#40a6ff80"
        "editorOverviewRuler.infoForeground": theme.blue,
        "editorOverviewRuler.modifiedForeground": theme.blue.setAlpha(0.5),
        // "editorOverviewRuler.rangeHighlightForeground": "#f0f", // "#007acc99"
        // "editorOverviewRuler.selectionHighlightForeground": "#f0f", // "#a0a0a0cc"
        "editorOverviewRuler.warningForeground": theme.lightOrange,
        // "editorOverviewRuler.wordHighlightForeground": "#f0f", // "#a0a0a0cc"
        // "editorOverviewRuler.wordHighlightStrongForeground": "#f0f", // "#c0a0c0cc"
        "editorOverviewRuler.background": theme.bgColor1,
        // warning "lens"
        // "editorUnnecessaryCode.opacity": "#f0f", // "#1d1f24aa"
        // "editorUnnecessaryCode.border": "#f0f",
        // "editorWarning.foreground": "#f0f", // "#cca700"
        // "editorWarning.background": "#f0f",
        // "editorWarning.border": "#f0f",
        // "editorHint.border": "#f0f",
        // "editorHint.foreground": "#f0f", // "#eeeeeeb3"
        // "editorInfo.background": "#f0f",
        // "editorInfo.border": "#f0f",
        "editorInfo.foreground": theme.blue,
        // "editorWhitespace.foreground": "#f0f", // "#e3e4e229"
        // "problemsErrorIcon.foreground": "#f0f", // color.bright_red
        "problemsInfoIcon.foreground": theme.blue,
        // "problemsWarningIcon.foreground": "#f0f", // "#cca700"
        // "editorLightBulb.foreground": "#f0f", // "#ffcc00"
        // "editorLightBulbAutoFix.foreground": "#f0f", // "#75beff"
        // minimap
        "minimap.background": theme.bgColor1,
        "minimap.selectionHighlight": theme.selectionBgColor.multiplyAlpha(0.7),
        "minimap.errorHighlight": muted(theme.red),
        "minimap.findMatchHighlight": theme.searchMatchBgColor,
        "minimap.selectionOccurrenceHighlight": theme.editorHoverHighlightBgColor,
        "minimap.warningHighlight": muted(theme.lightOrange),
        // "minimap.foregroundOpacity": "#f0f", // color.very_dark_bg
        // "minimapGutter.addedBackground": "#f0f", // "#487e02"
        // "minimapGutter.deletedBackground": "#f0f", // color.bright_red
        // "minimapGutter.modifiedBackground": "#f0f", // "#1b81a8"
        "minimapSlider.activeBackground": theme.hoverColor.setAlpha(theme.activeOpacity),//"#d1d5eb20",
        // "minimapSlider.background": "#f0f", // "#79797933"
        "minimapSlider.hoverBackground": theme.hoverColor.setAlpha(theme.hoverOpacity), // "#64646459"
        // peek view
        "peekView.border": theme.accentBgColor.setAlpha(0.5),//"#0d70b980",
        "peekViewEditor.background": theme.bgColor2.addBlue(0.03),
        "peekViewEditorGutter.background": theme.bgColor1.addBlue(0.03),
        "peekViewEditor.matchHighlightBackground": theme.searchMatchBgColor,
        // "peekViewEditor.matchHighlightBorder": "#3d6b99",
        "peekViewResult.background": theme.bgColor1.addBlue(0.03),
        "peekViewResult.matchHighlightBackground": theme.searchMatchBgColor,
        "peekViewResult.fileForeground": theme.fgColor4,
        "peekViewResult.lineForeground": theme.fgColor2,
        // "peekViewResult.selectionBackground": "#f0f", // "#3399ff33"
        // "peekViewResult.selectionForeground": "#f0f", // color.bright_fg
        "peekViewTitle.background": theme.bgColor2.addBlue(0.1),
        "peekViewTitleDescription.foreground": theme.fgColor2,
        "peekViewTitleLabel.foreground": theme.fgColor4,
        // panel
        "panel.background": theme.bgColor1,
        "panel.border": theme.borderColor,
        "panel.dropBorder": theme.accentBgColor,
        "panelSection.border": theme.borderColor,
        "panelSection.dropBackground": theme.dropBgColor,
        "panelSectionHeader.background": theme.bgColor0,
        "panelTitle.activeBorder": theme.accentBgColor,
        "panelTitle.activeForeground": theme.fgColor4,
        "panelTitle.inactiveForeground": theme.fgColor2,
        "panelInput.border": theme.borderColor,
        "panelSectionHeader.border": theme.borderColor,
        "panelSectionHeader.foreground": theme.fgColor3,
        // notifications
        "notifications.background": theme.bgColor2,
        "notificationCenterHeader.background": theme.bgColor1,
        "notificationCenter.border": theme.borderColor,
        "notificationCenterHeader.foreground": theme.fgColor3,
        "notifications.border": theme.borderColor,
        "notificationToast.border": theme.borderColor,
        // "notifications.foreground": color.fg,
        // "notificationLink.foreground": "#f0f", // color.light_highlight
        // "notificationsErrorIcon.foreground": "#f0f", // color.bright_red
        "notificationsInfoIcon.foreground": theme.blue, // color.light_highlight
        // "notificationsWarningIcon.foreground": "#f0f", // "#cca700"
        // status bar
        "statusBar.background": theme.bgColor1,
        "statusBar.border": theme.borderColor,
        "statusBarItem.warningBackground": "#ce8e1f",
        "statusBarItem.warningForeground": theme.fgColor4,
        "statusBar.debuggingBackground": theme.accentBgColor,
        "statusBar.debuggingForeground": theme.accentFgColor,
        // "statusBar.focusBorder": "#f0f", // color.bright_fg
        "statusBar.foreground": theme.fgColor3,
        "statusBar.noFolderBackground": theme.bgColor1, // "#68217a"
        //"statusBar.noFolderForeground": color.highlight_fg,
        "statusBarItem.activeBackground": theme.hoverColor.setAlpha(theme.activeOpacity),
        "statusBarItem.compactHoverBackground": theme.hoverColor.setAlpha(theme.hoverOpacity),
        "statusBarItem.errorBackground": "#d82828",
        "statusBarItem.errorForeground": theme.fgColor4,
        // "statusBarItem.focusBorder": "#f0f", // color.bright_fg
        "statusBarItem.hoverBackground": theme.hoverColor.setAlpha(theme.hoverOpacity),
        // "statusBarItem.prominentBackground": "#f0f", // "#1d1f2480"
        "statusBarItem.prominentForeground": theme.fgColor4,
        // "statusBarItem.prominentHoverBackground": "#f0f", // "#1d1f244d"
        // "statusBar.debuggingBorder": "#f0f",
        // "statusBar.noFolderBorder": "#f0f",
        // picker group
        "pickerGroup.border": theme.bgColor4,
        //"pickerGroup.foreground": "#f0f", // color.light_highlight
        // outline symbols
        "symbolIcon.arrayForeground": theme.codeFgColor2,
        "symbolIcon.booleanForeground": theme.keywordsColor,
        "symbolIcon.classForeground": theme.typesColor,
        "symbolIcon.colorForeground": theme.codeFgColor2,
        "symbolIcon.constantForeground": theme.specialVariablesColor,
        "symbolIcon.constructorForeground": theme.typesColor,
        "symbolIcon.enumeratorForeground": theme.typesColor,
        "symbolIcon.enumeratorMemberForeground": theme.specialVariablesColor,
        "symbolIcon.eventForeground": theme.typesColor,
        "symbolIcon.fieldForeground": theme.specialVariablesColor,
        "symbolIcon.fileForeground": theme.codeFgColor2,
        "symbolIcon.folderForeground": theme.codeFgColor2,
        "symbolIcon.functionForeground": theme.functionsColor,
        "symbolIcon.interfaceForeground": theme.interfacesColor,
        "symbolIcon.keyForeground": theme.codeFgColor2,
        "symbolIcon.keywordForeground": theme.keywordsColor,
        "symbolIcon.methodForeground": theme.functionsColor,
        "symbolIcon.moduleForeground": theme.namespacesColor,
        "symbolIcon.namespaceForeground": theme.namespacesColor,
        "symbolIcon.nullForeground": theme.keywordsColor,
        "symbolIcon.numberForeground": theme.numbersColor,
        "symbolIcon.objectForeground": theme.typesColor,
        "symbolIcon.operatorForeground": theme.operatorsColor,
        "symbolIcon.packageForeground": theme.namespacesColor,
        "symbolIcon.propertyForeground": theme.specialVariablesColor,
        "symbolIcon.referenceForeground": theme.codeFgColor2,
        "symbolIcon.snippetForeground": theme.codeFgColor2,
        "symbolIcon.stringForeground": theme.stringsColor,
        "symbolIcon.structForeground": theme.typesColor,
        "symbolIcon.textForeground": theme.codeFgColor2,
        "symbolIcon.typeParameterForeground": theme.typesColor,
        "symbolIcon.unitForeground": theme.codeFgColor2,
        "symbolIcon.variableForeground": theme.localVariablesColor,
        // extensions
        // "extensionBadge.remoteBackground": "#f0f", // "#007acc"
        // "extensionBadge.remoteForeground": "#f0f", // color.bright_fg
        // "extensionButton.background": "#f0f", // "#0e639c"
        // "extensionButton.foreground": color.bright_fg, // color.bright_fg
        // "extensionButton.hoverBackground": "#f0f", // "#1177bb"
        // "extensionButton.prominentBackground": color.highlight_bg, // "#0e639c"
        // "extensionButton.prominentForeground": color.bright_fg, // color.bright_fg
        // "extensionButton.prominentHoverBackground": "#f0f", // "#1177bb"
        // "extensionButton.separator": "#ffffff80", // "#d1d5eb66"
        "extensionIcon.preReleaseForeground": theme.green.overlayOpacity(0.25, theme.overlayBaseColor),
        //"extensionIcon.sponsorForeground": "#d758b3",
        "extensionIcon.starForeground": theme.orange,
        "extensionIcon.verifiedForeground": theme.accentBgColor,
        // terminal
        "terminal.background": theme.bgColor0,
        "terminal.foreground": theme.fgColor2,
        "terminal.ansiGreen": muted(theme.green),
        "terminal.ansiBrightGreen": theme.green,
        "terminal.ansiBrightRed": theme.red,
        "terminal.ansiRed": muted(theme.red),
        "terminal.ansiBlue": muted(theme.blue),
        "terminal.ansiBrightBlue": theme.blue,
        "terminal.ansiCyan": muted(theme.cyan),
        "terminal.ansiBrightCyan": theme.cyan,
        "terminal.ansiBrightYellow": theme.yellow,
        "terminal.ansiYellow": muted(theme.yellow),
        "terminal.ansiBrightMagenta": theme.pink,
        "terminal.ansiMagenta": muted(theme.pink),
        "terminal.ansiBrightWhite": theme.fgColor4,
        "terminal.ansiWhite": theme.fgColor2,
        "terminal.ansiBrightBlack": theme.fgColor0,
        "terminal.ansiBlack": theme.bgColor2,
        "terminal.border": theme.borderColor,
        "terminal.dropBackground": theme.dropBgColor,
        // "terminal.findMatchBackground": "#f0f", // "#515c6a"
        // "terminal.findMatchHighlightBackground": "#ff848440", // "#ea5c0055"
        // "terminal.selectionBackground": color.dark_highlight, // "#264f78"
        // "terminalCommandDecoration.defaultBackground": "#f0f", // "#d1d5eb40"
        // "terminalCommandDecoration.errorBackground": "#f0f", // color.bright_red
        // "terminalCommandDecoration.successBackground": "#f0f", // "#1b81a8"
        // "terminalOverviewRuler.cursorForeground": "#f0f", // "#a0a0a0cc"
        // "terminalOverviewRuler.findMatchForeground": "#f0f", // 
        // "terminal.findMatchBorder": "#f0f", // "#f0f"
        // "terminal.findMatchHighlightBorder": "#f0f", // "#f0f"
        // "terminal.selectionForeground": "#f0f", // "#f0f"
        // "terminal.tab.activeBorder": "#f0f", // "#f0f"
        "terminalCursor.background": theme.bgColor2, // "#f0f"
        "terminalCursor.foreground": theme.fgColor2, // "#f0f"
        // charts
        "charts.blue": theme.blue,
        "charts.foreground": theme.fgColor2,
        "charts.green": theme.green,
        "charts.lines": theme.fgColor2.setAlpha(0.5),
        "charts.orange": theme.orange,
        "charts.purple": theme.pink,
        "charts.red": theme.red,
        "charts.yellow": theme.yellow,
        // settings
        "settings.checkboxBackground": theme.bgColor1,
        // "settings.checkboxBorder": "#f0f", // "#3c3c3c"
        // "settings.checkboxForeground": "#f0f", // "#f0f0f0"
        "settings.dropdownBackground": theme.bgColor1,
        // "settings.dropdownBorder": "#f0f", // "#3c3c3c"
        // "settings.dropdownForeground": color.fg, // "#f0f0f0"
        // "settings.dropdownListBorder": "#f0f", // color.very_dark_bg
        "settings.focusedRowBackground": theme.bgColor3,
        // "settings.focusedRowBorder": color.border, // "#007fd4"
        "settings.headerBorder": theme.borderColor,
        "settings.headerForeground": theme.fgColor4,
        "settings.modifiedItemIndicator": theme.accentBgColor,
        "settings.numberInputBackground": theme.bgColor1,
        //"settings.numberInputForeground": color.fg, // "#cccccc"
        "settings.rowHoverBackground": theme.hoverColor.setAlpha(theme.hoverOpacity),
        // "settings.sashBorder": "#f0f", // "#80808059"
        "settings.textInputBackground": theme.bgColor1,
        // "settings.textInputForeground": color.fg, // "#cccccc"
        // "settings.numberInputBorder": "#f0f",
        // "settings.textInputBorder": "#f0f",
        // git
        "gitDecoration.addedResourceForeground": theme.green, // "#81b88b"
        "gitDecoration.conflictingResourceForeground": theme.brightRed, // "#e4676b"
        "gitDecoration.deletedResourceForeground": theme.red, // "#c74e39"
        "gitDecoration.ignoredResourceForeground": theme.fgColor0, // "#8c8c8c"
        "gitDecoration.modifiedResourceForeground": theme.yellow, // "#e2c08d"
        "gitDecoration.renamedResourceForeground": theme.green, // "#73c991"
        "gitDecoration.stageDeletedResourceForeground": theme.red, // "#c74e39"
        "gitDecoration.stageModifiedResourceForeground": theme.yellow, // "#e2c08d"
        "gitDecoration.submoduleResourceForeground": theme.blue, // "#8db9e2"
        "gitDecoration.untrackedResourceForeground": theme.purple, // "#73c991"
        // diff
        "diffEditor.insertedLineBackground": theme.green.overlayOpacity(theme.diffBgOpacity, theme.overlayBaseColor),//"#254236",
        "diffEditor.insertedTextBackground": theme.green.overlayOpacity(theme.diffGutterOpacity, theme.overlayBaseColor),//"#2f5f48",
        "diffEditorGutter.insertedLineBackground": theme.green.overlayOpacity(theme.diffGutterOpacity, theme.overlayBaseColor),//"#2f5f48",
        "diffEditorOverview.insertedForeground": theme.green.overlayOpacity(theme.diffMarkerOpacity, theme.overlayBaseColor),//"#3b805e",
        "diffEditor.removedLineBackground": theme.red.overlayOpacity(theme.diffBgOpacity, theme.overlayBaseColor),//"#422c2f",
        "diffEditor.removedTextBackground": theme.red.overlayOpacity(theme.diffGutterOpacity, theme.overlayBaseColor),//color.match_highlight,
        "diffEditorGutter.removedLineBackground": theme.red.overlayOpacity(theme.diffGutterOpacity, theme.overlayBaseColor),//color.match_highlight,
        "diffEditorOverview.removedForeground": theme.red.overlayOpacity(theme.diffMarkerOpacity, theme.overlayBaseColor),//"#824a4c",
        "diffEditor.diagonalFill": theme.bgColor4, // 
        // "diffEditor.border": color.very_dark_bg,
        // "diffEditor.insertedTextBorder": "#f0f",
        // "diffEditor.removedTextBorder": "#f0f",
        // merge
        // "merge.border": "#f0f",
        // "merge.commonContentBackground": "#f0f", // "#60606029"
        // "merge.commonHeaderBackground": "#f0f", // "#60606066"
        // "merge.currentContentBackground": "#f0f", // "#40c8ae33"
        // "merge.currentHeaderBackground": "#f0f", // "#40c8ae80"
        // "merge.incomingContentBackground": "#f0f", // "#40a6ff33"
        // "merge.incomingHeaderBackground": "#f0f", // "#40a6ff80"
        // merge editor
        // "mergeEditor.change.background": "#f0f", // "#9bb95533"
        // "mergeEditor.change.word.background": "#f0f", // "#9ccc2c33"
        // "mergeEditor.changeBase.background": "#f0f", // "#4b1818"
        // "mergeEditor.changeBase.word.background": "#f0f", // "#6f1313"
        // "mergeEditor.conflict.handled.minimapOverViewRuler": "#f0f", // "#adaca8ee"
        // "mergeEditor.conflict.handledFocused.border": "#f0f", // "#c1c1c1cc"
        // "mergeEditor.conflict.handledUnfocused.border": "#f0f", // "#86868649"
        // "mergeEditor.conflict.input1.background": "#f0f", // "#40c8ae33"
        // "mergeEditor.conflict.input2.background": "#f0f", // "#40a6ff33"
        // "mergeEditor.conflict.unhandled.minimapOverViewRuler": "#f0f", // "#fcba03"
        // "mergeEditor.conflict.unhandledFocused.border": "#f0f", // "#ffa600"
        // "mergeEditor.conflict.unhandledUnfocused.border": "#f0f", // "#ffa6007a"
        // "mergeEditor.conflictingLines.background": "#f0f", // "#ffea0047"
        // testing
        // "testExplorer.errorDecorationBackground": "#f0f", // "#5a1d1d"
        "testing.iconErrored": theme.brightRed,
        "testing.iconFailed": theme.brightRed,
        "testing.iconPassed": theme.green,
        // "testing.iconQueued": "#f0f", // "#cca700"
        // "testing.iconSkipped": "#f0f", // "#848484"
        // "testing.iconUnset": "#f0f", // "#848484"
        // "testing.message.error.decorationForeground": "#f0f", // color.bright_red
        // "testing.message.error.lineBackground": "#f0f", // "#ff000033"
        // "testing.message.info.decorationForeground": "#f0f", // "#acafbf80"
        // "testing.peekBorder": "#f0f", // color.bright_red
        // "testing.peekHeaderBackground": "#f0f", // "#f14c4c1a"
        "testing.runAction": theme.green,
        // "testing.message.info.lineBackground": "#f0f", // "#f0f"
        // notebook
        "notebook.cellBorderColor": theme.borderColor,
        "notebook.cellEditorBackground": theme.bgColor2,
        "notebook.cellInsertionIndicator": theme.accentAltBgColor,
        "notebook.cellStatusBarItemHoverBackground": "#acafbf20",
        "notebook.cellToolbarSeparator": theme.borderColor,
        "notebook.editorBackground": theme.bgColor1,
        "notebook.focusedCellBorder": theme.accentAltBgColor,
        "notebook.focusedEditorBorder": theme.accentAltBgColor,
        "notebook.inactiveFocusedCellBorder": theme.accentAltBgColor,
        //"notebook.selectedCellBackground": "#f0f", // "#37373d"
        //"notebook.selectedCellBorder": "#f0f", // "#37373d"
        //"notebook.symbolHighlightBackground": "#f0f", // "#d1d5eb0b"
        // "notebookScrollbarSlider.activeBackground": "#f0f", // "#bfbfbf66"
        // "notebookScrollbarSlider.background": "#f0f", // "#79797966"
        // "notebookScrollbarSlider.hoverBackground": "#f0f", // "#646464b3"
        "notebookStatusErrorIcon.foreground": theme.brightRed, // "#f48771"
        "notebookStatusRunningIcon.foreground": theme.blue, // "#cccccc"
        "notebookStatusSuccessIcon.foreground": theme.green, // "#89d185"
        // "notebook.cellHoverBackground": "#f0f",
        // "notebook.focusedCellBackground": "#f0f",
        // "notebook.inactiveSelectedCellBorder": "#f0f",
        "notebook.outputContainerBackgroundColor": theme.bgColor0,
        "notebook.outputContainerBorderColor": theme.borderColor,
        // debug view
        //"debugToolBar.border": color.border,
        //"debugConsole.errorForeground": "#f0f", // "#f48771"
        //"debugConsole.infoForeground": color.code_blue, // color.light_highlight
        //"debugConsole.sourceForeground": "#f0f", // "#cccccc"
        //"debugConsole.warningForeground": "#f0f", // "#cca700"
        //"debugConsoleInputIcon.foreground": "#f0f", // "#cccccc"
        //"debugExceptionWidget.background": "#f0f", // "#420b0d"
        //"debugExceptionWidget.border": "#f0f", // "#a31515"
        "debugIcon.breakpointCurrentStackframeForeground": theme.brightRed,
        "debugIcon.breakpointDisabledForeground": theme.fgColor0,
        "debugIcon.breakpointForeground": theme.brightRed,
        //"debugIcon.breakpointStackframeForeground": "#f0f",
        //"debugIcon.breakpointUnverifiedForeground": "#f0f",
        "debugIcon.continueForeground": theme.green,
        "debugIcon.disconnectForeground": theme.red,
        "debugIcon.pauseForeground": theme.orange,
        "debugIcon.restartForeground": theme.lightOrange,
        "debugIcon.startForeground": theme.green,
        "debugIcon.stepBackForeground": theme.blue,
        "debugIcon.stepIntoForeground": theme.blue,
        "debugIcon.stepOutForeground": theme.blue,
        "debugIcon.stepOverForeground": theme.blue,
        "debugIcon.stopForeground": theme.brightRed,
        "debugTokenExpression.boolean": theme.lightOrange,
        "debugTokenExpression.error": theme.red,
        "debugTokenExpression.name": theme.blue,
        "debugTokenExpression.number": theme.lightOrange,
        "debugTokenExpression.string": theme.lightOrange,
        "debugTokenExpression.value": theme.lightOrange,
        "debugToolBar.background": theme.bgColor3,
        "debugView.exceptionLabelBackground": theme.red.overlayOpacity(0.125, theme.overlayBaseColor),
        //"debugView.exceptionLabelForeground": color.fg,
        "debugView.stateLabelBackground": theme.bgColor2,
        //"debugView.stateLabelForeground": color.fg,
        "debugView.valueChangedHighlight": muted(theme.green),
        // keybindings
        "keybindingLabel.background": theme.bgColor3,
        "keybindingLabel.border": theme.borderColor,
        "keybindingLabel.bottomBorder": theme.fgColor4.setAlpha(0.1),
        "keybindingLabel.foreground": theme.fgColor2,
        // "keybindingTable.headerBackground": "#f0f", // "#cccccc0a"
        // "keybindingTable.rowsBackground": "#f0f", // "#cccccc0a"
        // Markdown
        "markdown.extension.editor.codeSpan.background": "#0000",
        "markdown.extension.editor.codeSpan.border": "#0000",
        //"markdown.extension.editor.formattingMark.foreground": "#f0f", // "#e3e4e229"
        //"markdown.extension.editor.trailingSpace.background": "#f0f", // "#cccccc33"
        // Unset
        // "interactive.activeCodeBorder": "#f0f", // color.light_highlight
        // "interactive.inactiveCodeBorder": "#f0f", // "#37373d"
        // "rust_analyzer.syntaxTreeBorder": "#f0f", // color.bright_fg
        // "sash.hoverBorder": "#f0f", // "#007fd4"
        // "scm.providerBorder": "#f0f", // color.very_dark_bg
        // "walkThrough.embeddedEditorBackground": "#f0f", // "#f0f"
    };

    if (theme.extensionColors["GitLens"] === true) {
        const GitLensColors: EditorColors = {
            // GitLens (v14.7)
            "gitlens.closedAutolinkedIssueIconColor": theme.purple, //"#a371f7",
            "gitlens.closedPullRequestIconColor": theme.fgColor0, // "#f85149",
            //"gitlens.decorations.addedForegroundColor": "gitDecoration.addedResourceForeground",

            "gitlens.decorations.branchAheadForegroundColor": theme.green,//"#35b15e",
            "gitlens.decorations.branchBehindForegroundColor": theme.red,
            "gitlens.decorations.branchDivergedForegroundColor": theme.yellow, // "#D8AF1B",
            "gitlens.decorations.branchMissingUpstreamForegroundColor": theme.brightRed, // "#c74e39",
            "gitlens.decorations.branchUnpublishedForegroundColor": theme.purple,//"#35b15e",
            // "gitlens.decorations.branchUpToDateForegroundColor": "sideBar.foreground",

            // "gitlens.decorations.copiedForegroundColor": "gitDecoration.renamedResourceForeground",
            // "gitlens.decorations.deletedForegroundColor": "gitDecoration.deletedResourceForeground",
            // "gitlens.decorations.ignoredForegroundColor": "gitDecoration.ignoredResourceForeground",
            // "gitlens.decorations.modifiedForegroundColor": "gitDecoration.modifiedResourceForeground",
            // "gitlens.decorations.renamedForegroundColor": "gitDecoration.renamedResourceForeground",

            "gitlens.decorations.statusMergingOrRebasingConflictForegroundColor": theme.brightRed, // "#c74e39",
            "gitlens.decorations.statusMergingOrRebasingForegroundColor": theme.brightYellow, // "#D8AF1B",
            //"gitlens.decorations.untrackedForegroundColor": "gitDecoration.untrackedResourceForeground",
            "gitlens.decorations.workspaceCurrentForegroundColor": theme.green, //"#35b15e",
            "gitlens.decorations.workspaceRepoMissingForegroundColor": theme.fgColor0, //"#909090",
            "gitlens.decorations.workspaceRepoOpenForegroundColor": theme.green, // "#35b15e",
            "gitlens.decorations.worktreeHasUncommittedChangesForegroundColor": theme.yellow, // "#E2C08D",
            "gitlens.decorations.worktreeMissingForegroundColor": theme.brightRed, // "#c74e39",

            "gitlens.graphChangesColumnAddedColor": theme.green,
            "gitlens.graphChangesColumnDeletedColor": theme.red,

            "gitlens.graphLane1Color": theme.green,
            "gitlens.graphLane2Color": theme.cyan,
            "gitlens.graphLane3Color": theme.blue,
            "gitlens.graphLane4Color": theme.purple,
            "gitlens.graphLane5Color": theme.pink,
            "gitlens.graphLane6Color": "#f285c7",
            "gitlens.graphLane7Color": theme.red,
            "gitlens.graphLane8Color": theme.orange,
            "gitlens.graphLane9Color": theme.lightOrange,
            "gitlens.graphLane10Color": theme.yellow,

            "gitlens.graphMinimapMarkerHeadColor": theme.fgColor4,
            "gitlens.graphMinimapMarkerHighlightsColor": theme.brightYellow,
            "gitlens.graphMinimapMarkerLocalBranchesColor": theme.blue,
            "gitlens.graphMinimapMarkerRemoteBranchesColor": theme.brightBlue,
            "gitlens.graphMinimapMarkerStashesColor": theme.purple.darken(0.2).desaturate(0.4),
            "gitlens.graphMinimapMarkerTagsColor": theme.orange.darken(0.2).desaturate(0.5),
            "gitlens.graphMinimapMarkerUpstreamColor": theme.green,

            "gitlens.graphScrollMarkerHeadColor": theme.fgColor4,
            "gitlens.graphScrollMarkerHighlightsColor": theme.brightYellow,
            "gitlens.graphScrollMarkerLocalBranchesColor": theme.blue,
            "gitlens.graphScrollMarkerRemoteBranchesColor": theme.brightBlue,
            "gitlens.graphScrollMarkerStashesColor": theme.purple.darken(0.2).desaturate(0.4),
            "gitlens.graphScrollMarkerTagsColor": theme.orange.darken(0.2).desaturate(0.5),
            "gitlens.graphScrollMarkerUpstreamColor": theme.green,

            "gitlens.gutterBackgroundColor": theme.bgColor0.setAlpha(0.3),//"#FFFFFF13",
            "gitlens.gutterForegroundColor": theme.fgColor1, //"#BEBEBE",
            "gitlens.gutterUncommittedForegroundColor": theme.yellow,//"#00BCF299",
            "gitlens.lineHighlightBackgroundColor": theme.selectionBgColor.multiplyAlpha(0.75),//"#00BCF233",
            "gitlens.lineHighlightOverviewRulerColor": theme.selectionBgColor.setAlpha(0.75), //"#00BCF299",

            "gitlens.mergedPullRequestIconColor": theme.purple,//"#a371f7",
            "gitlens.openAutolinkedIssueIconColor": theme.green,//"#3fb950",
            "gitlens.openPullRequestIconColor": theme.green,//"#3fb950",
            "gitlens.trailingLineBackgroundColor": Color.TRANSPARENT,//"#00000000",
            "gitlens.trailingLineForegroundColor": theme.fgColor0.darken(0.16),//"#99999959",
            "gitlens.unpublishedChangesIconColor": theme.green.darken(0.25).desaturate(0.25),//"#35b15e",
            "gitlens.unpublishedCommitIconColor": theme.green.darken(0.25).desaturate(0.25),//"#35b15e",
            "gitlens.unpulledChangesIconColor": theme.orange,//"#b15e35"
        }
        Object.assign(colors, GitLensColors)
    }

    if (theme.extensionColors["Error Lens"]) {
        const ErrorLensColors: EditorColors = {
            // Error Lens (v3.16.0)
            "errorLens.errorBackground": theme.brightRed.setAlpha(0.05), // "#e454541b"
            "errorLens.errorMessageBackground": theme.brightRed.setAlpha(0.05), // "#e4545419"
            "errorLens.errorRangeBackground": theme.brightRed.setAlpha(0.05), // "#e4545419"
            "errorLens.errorForeground": muted(theme.red), // "#ff6464"
            // "errorLens.errorBackgroundLight": "#f0f", // "#e4545420"
            // "errorLens.errorForegroundLight": "#f0f", // "#e45454"

            "errorLens.warningBackground": theme.orange.setAlpha(0.05), // "#ff942f1b"
            "errorLens.warningMessageBackground": theme.orange.setAlpha(0.05), // "#ff942f19"
            "errorLens.warningRangeBackground": theme.orange.setAlpha(0.05), // "#ff942f19"
            "errorLens.warningForeground": muted(theme.lightOrange), // "#fa973a"
            // "errorLens.warningBackgroundLight": "#f0f", // "#ff942f20"
            // "errorLens.warningForegroundLight": "#f0f", // "#ff942f"

            "errorLens.hintBackground": theme.brightGreen.setAlpha(0.05), // "#17a2a220"
            "errorLens.hintMessageBackground": theme.brightGreen.setAlpha(0.05), // "#17a2a219"
            "errorLens.hintRangeBackground": theme.brightGreen.setAlpha(0.05), // "#17a2a219"
            "errorLens.hintForeground": muted(theme.green), // "#2faf64"
            // "errorLens.hintBackgroundLight": "#f0f", // "#17a2a220"
            // "errorLens.hintForegroundLight": "#f0f", // "#2faf64"


            "errorLens.infoBackground": theme.blue.setAlpha(0.05), // "#00b7e420"
            "errorLens.infoMessageBackground": theme.blue.setAlpha(0.05), // "#00b7e419"
            "errorLens.infoRangeBackground": theme.blue.setAlpha(0.05), // "#00b7e419"
            "errorLens.infoForeground": muted(theme.blue), // "#00b7e4"
            // "errorLens.infoForegroundLight": "#f0f", // "#00b7e4"
            // "errorLens.infoBackgroundLight": "#f0f", // "#00b7e420"

            "errorLens.statusBarErrorForeground": theme.red, // "#ff6464"
            "errorLens.statusBarInfoForeground": theme.blue, // "#00b7e4"
            "errorLens.statusBarWarningForeground": theme.lightOrange, // "#fa973a"
            "errorLens.statusBarHintForeground": theme.green, // "#2faf64"

            "errorLens.statusBarIconErrorForeground": theme.red, // "#ff6464"
            "errorLens.statusBarIconWarningForeground": theme.lightOrange, // "#fa973a"
        }
        Object.assign(colors, ErrorLensColors)
    }

    if (theme.extensionColors["GitHub Pull Requests and Issues"]) {
        const GitHubPullRequestsAndIssuesColors: EditorColors = {
            // GitHub Pull Requests and Issues (v0.80.0)
            "issues.open": theme.green, // "#3fb950",
            "issues.closed": theme.purple, // "#cb2431",
            "issues.newIssueDecoration": theme.fgColor4.setAlpha(0.5), // "#ffffff48",
            //"pullRequests.open": theme.green, // "issues.open",
            "pullRequests.draft": theme.fgColor0, // "#6e7681",
            "pullRequests.merged": theme.purple, // "#8957e5",
            "pullRequests.closed": theme.red, // "issues.closed",
            //"pullRequests.notification": "#f0f", // "notificationsInfoIcon.foreground",
        }
        Object.assign(colors, GitHubPullRequestsAndIssuesColors)
    }

    // Convert colors to HEX
    for (const [k, v] of Object.entries(colors)) {
        if (v instanceof Color) {
            colors[k] = v.toHex('rgba')
        }
    }

    return colors
}


type TokenSettings = {
    foreground?: string | Color,
    fontStyle: string
}

type TokenSettingsItem = {
    name?: string,
    scope: string[] | string,
    settings: TokenSettings
}


export function tokenColors(theme: ThemeDef): TokenSettingsItem[] {
    const muted = function (c: Color): Color {
        return c.overlayOpacity(theme.mutedOpacity, theme.overlayBaseColor)
    }

    const useItalics = theme.italics ? "italic" : ""

    const out: TokenSettingsItem[] = [
        {
            "name": "DEV: highlight missing colors",
            "scope": [
                //"",
            ],
            "settings": {
                "foreground": "#f0f",
                "fontStyle": ""
            }
        },
        {
            "scope": "token.info-token",
            "settings": {
                "foreground": theme.blue,
                "fontStyle": ""
            }
        },
        {
            "scope": "token.warn-token",
            "settings": {
                "foreground": theme.orange,
                "fontStyle": ""
            }
        },
        {
            "scope": "token.error-token",
            "settings": {
                "foreground": theme.brightRed,
                "fontStyle": ""
            }
        },
        {
            "scope": "token.debug-token",
            "settings": {
                "foreground": theme.pink,
                "fontStyle": ""
            }
        },
        // New
        {
            "scope": [
                "comment",
                // lang specific
                "string.quoted.docstring", // Python: docstring
                "string.quoted.docstring storage.type.string.python", // Python: docstring prefixes like r f
                "string.quoted.docstring punctuation.definition.string", // Python: docstring quotes
                "punctuation.definition.comment", // comment start // # etc
                "markup.underline.link", // Markdown: actual link, it's not that important, make it dark
                "markup.link", // AsciiDoc: actual link, it's not that important, make it dark
                "source.ini comment punctuation", // INI: comment specified ;
            ],
            "settings": {
                "foreground": theme.commentsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "modules, namespaces",
            "scope": [
                "entity.name.namespace",
                "entity.name.module",
                "entity.name.package", // Kotlin: package name
                // lang specific
                "storage.modifier.package", // Java: package name
                "storage.modifier.import", // Java: imports
                "entity.name.type.namespace", // C#: namespace names
                "entity.name.section.fsharp", // F#: module 
                // "entity.name.type.module", // Ruby: module, this only changes the color on declaration, disable it for consistency with other location where a module name could be used
                "string.quoted.double.include.cpp", // C++: includes
                "source.cpp string.quoted.other.lt-gt.include", // C++: includes
                "source.cpp string.quoted.other.lt-gt.include punctuation.definition.string", // C++: includes punctuation <>
                "source.cpp meta.preprocessor.include punctuation.definition.string", // C++: includes punctuation ""
                "entity.name.tag.namespace", // XML: namespace
                "punctuation.separator.namespace", // XML: namespace separator :

                // Go's imports are strings, they are detected by semantic highlighting as 
                // namespace, which colors them gray, but the quotes are not captured
                // and they are yellow as strings.
                // I think it looks better if there are gray quotes around strings
                // than yellow quotes around imports. With semantic highlighting 
                // the quotes around string are captured and colored yellow,
                // without it they remain gray.
                "source.go punctuation.definition.string",
                "source.go entity.name.import"
            ],
            "settings": {
                "foreground": theme.namespacesColor,
                "fontStyle": "",
            }
        },
        {
            "name": "regular variable",
            "scope": [
                "variable",
                "support.variable",
                // lang specific
                "meta.interpolation.rust", // Rust: interpolation inside the {}
                "meta.preprocessor.cs", // C# preprocessor text
                "string.unquoted.preprocessor.message.cs", // C# preprocessor text
                "text.html.php", // PHP: base text color
                "text.html.markdown", // Markdown: base text color
                "text.html source", // HTML: CSS, JS base color in HTMLs
            ],
            "settings": {
                "foreground": theme.localVariablesColor,
                "fontStyle": "",
            }
        },
        {
            "name": "constants, statics",
            "scope": [
                "variable.other.constant",
                "support.constant",
                "constant.other",
                // lang specific
                "variable.other.readwrite.class.ruby", // Ruby: static class variables
                "source.ruby variable.other.readwrite.global", // Ruby: global variables
            ],
            "settings": {
                "foreground": theme.specialVariablesColor,
                "fontStyle": ""
            }
        },
        // {
        // 	"name": "function parameters",
        // 	"scope": [
        // 		"variable.parameter",
        // 		"entity.name.variable.parameter", // C# parameters, they are only detected in function decl, don't highlight then
        // 		// lang specific
        // 		 "meta.parameter-clause.swift", // Swift parameters
        // 	],
        // 	"settings": {
        // 		"foreground": color.code_bright_white,
        // 		"fontStyle": ""
        // 	}
        // },
        {
            "name": "globals",
            "scope": [
                "variable.other.global",
                "entity.name.variable.global",
            ],
            "settings": {
                "foreground": theme.specialVariablesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "fields, properties, members",
            "scope": [
                "variable.other.property",
                "variable.other.field",
                "variable.other.object.property",
                "variable.other.object.field",
                "variable.object.property",
                "variable.object.field",
                "entity.name.variable.property",
                "entity.name.variable.field",
                // lang specific
                "entity.name.variable.event", // C#: event name
                "variable.other.event", // C#: event name
                "meta.objectliteral meta.object.member meta.object-literal.key", // JS, TS, JSX; TSX: properties in definitions
                "entity.name.record.field.elm", // Elm: field
                "variable.other.readwrite.instance.ruby", // Ruby: instance variables (properties)
                "meta.var.expr meta.tag meta.tag.attributes entity.other.attribute-name", //JSX, TSX: tag attribute name
                "text.xml entity.other.attribute-name", // XML: attribute names
                "text.html entity.other.attribute-name", // HTML: attribute names
                "source.css support.type.property-name", // CSS: property names
                "entity.other.attribute-name.css", // CSS: attribute name in selectors
            ],
            "settings": {
                "foreground": theme.specialVariablesColor,
                "fontStyle": ""
            }
        },
        {
            // slightly darker in docs
            "name": "fields, properties, members in docs",
            "scope": [
                "comment variable.parameter", // Java: parameter in docs
                "comment variable.other.jsdoc", // JS, TS, JSX; TSX: parameter in docs
                "entity.other.attribute-name.localname.cs", // C# doc comment tag attribute name
                "comment.documentation.attribute.name.cs", // C#: doc comment tags with semantic highlighting
            ],
            "settings": {
                "foreground": muted(theme.specialVariablesColor),
                "fontStyle": ""
            }
        },
        {
            "name": "misc special variable",
            "scope": [
                "variable.other.metavariable.name.rust", // Rust: macro metavariable name
                "keyword.operator.macro.dollar.rust", // Rust: macro metavariable $
            ],
            "settings": {
                "foreground": theme.specialVariablesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "config file keys/variables",
            "scope": [
                "keyword.other.definition.ini", // INI: keys
                "support.type.property-name.json", // JSON: keys
                "support.type.property-name.toml", // TOML: keys
                "entity.name.tag.yaml", // YAML: keys
                "entity.name.tag.ron", // RON: key
                "punctuation.support.type.property-name.json", // JSON: " in property names
                "variable.other.makefile", // Makefile: variable
                "source.hcl variable", // HCL: 
                "keyword.other.cabal", // Cabal: keys
                "variable.name.pestfile", // Pest: variables
            ],
            "settings": {
                "foreground": theme.specialVariablesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "keywords",
            "scope": [
                "keyword",
                "keyword.other",
                "storage.modifier", // pub, mut, static etc
                "storage.type", // class, struct, enum etc
                "variable.language", // self, this, cls etc
                "constant.language", // true, false, null, nil etc
                // lang specific
                "entity.name.function.macro.rules.rust", // Rust: macro_rules!
                // C++: type keywords in templates
                "storage.type.template.argument.class.cpp",
                "storage.type.template.argument.unsigned.cpp",
                "storage.type.template.argument.signed.cpp",
                "storage.type.template.argument.typename.cpp",
                "storage.type.template.argument.struct.cpp",
                "storage.type.template.argument.enum.cpp",
                "storage.type.template.argument.union.cpp",
                //"punctuation.section.attribute",
                "variable.parameter.function.language.special.self.python", // Python: self function parameter
                "variable.parameter.function.language.special.cls.python", // Python: cls function parameter
                "keyword.type.go", // Go: type keyword
                "entity.name.function.asciidoc", // AsciiDoc: keywords like link, image, etc
                "entity.name.section.cabal", // Cabal: section headers, like keyword
            ],
            "settings": {
                "foreground": theme.keywordsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "keywords in comments",
            "scope": [
                "keyword.other.documentation", // Java: doc keywords/tags
                "source.cs comment entity.name.tag", // C#: doc comment tags
                "comment.documentation.name.cs", // C#: doc comment tags with semantic highlighting
                "storage.type.class.doxygen", // Doxygen: doc tags
                "comment storage.type.class.jsdoc", // JS, TS: doc keywords/tags
                "punctuation.definition.block.tag.jsdoc", // JSDoc @ tags
                "keyword.other.phpdoc", // PHP: doc kws
            ],
            "settings": {
                "foreground": muted(theme.keywordsColor),
                "fontStyle": ""
            }
        },
        {
            "name": "operators",
            "scope": [
                "keyword.operator",
                // lang specific
                "source.cpp storage.modifier.reference", // C++: &
                "source.cpp storage.modifier.pointer", // C++: *
                "entity.name.function.operator", // C++ overloaded operators
                "source.cpp punctuation.separator.scope-resolution", // C++ :: in scope resolution, eg std::vector
                "source.cpp punctuation.separator.pointer-access", // C++ -> accessor
                "source.cpp punctuation.separator.dot-access", // C++ . accessor
                "entity.name.function.member.overload.cs", // C#: overloaded operators
                "source.fsharp keyword.symbol", // F#: operators and punctuation
                "keyword.symbol.fsharp", // F#: operators and punctuation with semantic highlighting
                "keyword.control.ternary.java", // Java: ternary
                "keyword.control.ternary.kotlin", // Kotlin: ternary
                "variable.language.wildcard.java", // Java: * in import
                "variable.language.wildcard.kotlin", // Kotlin: * in imports
                "meta.import constant.language.import-export-all", // JS, TS, JSX, TSX: wildcard in imports
                "punctuation.accessor", // JS, TS, JSX, TSX: accessor operators ., ?. etc
                "entity.name.tag.wildcard", // CSS: *
                "entity.other.document.begin.yaml", // YAML: --- doc end/begin
                "meta.separator.markdown", // Markdown: separator line --- or ***
                "source.yaml keyword.control", // YAML: | >
                "source.python punctuation.separator.period", // Python: . accessor
                "source.ruby punctuation.separator.method", // Ruby: ::, . accessor
                "source.java punctuation.separator.period", // Java: . accessor
                "text.html punctuation.separator.key-value", // HTML: = in attributes
            ],
            "settings": {
                "foreground": theme.operatorsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "punctuation",
            "scope": [
                "punctuation",
                "source.rust meta.use punctuation", // Rust: punctuation in use statements, 'meta.use' is used to overload function names blue 
                "meta.attribute.rust punctuation", // Rust: punctuation in attributes
                "punctuation.definition.decorator", // Python: @ in attributes
                "punctuation.separator.inheritance.ruby", // Ruby: < separator
                "storage.type.function.arrow.java", // Java: -> in lambdas
                "punctuation.definition.directive.cpp", // C++: # in preprocessor directives
                "source.cpp support.other.attribute punctuation", // C++: [[]] in attributes
                "source.fsharp support.function.attribute", // F#: attributes
                "meta.var.expr meta.arrow storage.type.function.arrow", // JS, TS, JSX, TSX: fat arrow
                "source meta.arrow storage.type.function.arrow", // JS, TS, JSX, TSX: => in lambdas
                "source meta.brace", // TS: brackets

                "meta.selector.css punctuation", // CSS: punctuation in selectors
                "meta.property-value.css punctuation", // CSS: function call brackets
                "source.css keyword punctuation", // CSS: @ in keywords
                "keyword.other.elm", // Elm: operators =
                "keyword.other.colon.elm", // Elm: colon
                "keyword.other.period.elm", // Elm: dot
                "text.html meta.tag", // HTML: punctuation
                "text.xml meta.tag", // XML: punctuation
                "source.yaml punctuation", // YAML: punctuation
                "text.asciidoc punctuation", // AsciiDoc: punctuation
                "text.asciidoc markup.heading.block-attribute", // AsciiDoc: attribute block brackets
                "text.asciidoc markup.code markup.heading", // AsciiDoc: code block attributes brackets
                "source.ini punctuation", // INI: punctuation
            ],
            "settings": {
                "foreground": theme.punctuationsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "word like operators, should be colored as keywords",
            "scope": [
                "keyword.operator.new",
                "keyword.operator.expression",
                "keyword.operator.instanceof",
                "keyword.operator.logical.python",
                "keyword.operator.wordlike",
                "keyword.operator.noexcept",
            ],
            "settings": {
                "foreground": theme.keywordsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "traits/interfaces",
            "scope": [
                "entity.name.type.trait",
                "entity.name.type.interface",
            ],
            "settings": {
                "foreground": theme.interfacesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "attributes/annotations",
            "scope": [
                "entity.other.attribute-name",
                "entity.name.type.annotation",
                // lang specific
                "meta.attribute.rust", // Rust: attributes
                "entity.name.function.decorator.python", // Python: decorators that are functions without semantic highlighting
                "source.python meta.function.decorator support.type", // Python: decorators that are classes without semantic highlighting
                "storage.type.annotation.java", // Java: annotations
                "storage.type.annotation.kotlin", // Kotlin: annotations
                "source.cs keyword.preprocessor", // C#: preprocessor kws without semantic highlighting
                "keyword.preprocessor.cs", // C#: preprocessor kws with semantic highlighting
                "source.cpp keyword.control.directive", // C++ preprocessor
                "keyword.other.attribute-specifier.cs", // C#: attribute specific keywords like method:
                "source.cpp keyword.operator.alignas", // C++: alignas
                "source.cpp support.other.attribute", // C++: alignas
                "text.asciidoc support.constant.attribute-name", // AsciiDoc: attributes
                "text.asciidoc markup.meta.attribute-list", // AsciiDoc: attribute list
                "text.asciidoc markup.meta.attribute-list entity.name.function.asciidoc", // AsciiDoc: attribute list
            ],
            "settings": {
                "foreground": theme.attributesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "strings",
            "scope": [
                "string",
                // lang specific
                "constant.other.rune.go", // Go: rune
                "storage.type.string.python", // Python: string prefixes like r 
                "keyword.interpolation.scala", // Scala: string s prefix
                "meta.jsx.children", // JSX, TSX: element input
                "punctuation.definition.string", // JS, TS, C#: string start and end quotes
                "punctuation.definition.char", // JS, TS, C#: char start and end quotes
                "text.html", // HTML: text
                "text.xml", // XML: text
                "source.cabal", // Cabal: text
                "keyword.operator.cabal", // Cabal: operators in text
                "source.ini", // INI: text
                "source.ini punctuation.definition.string", // INI: string quotes
                "source.yaml punctuation.definition.string", // YAML: string quotes
                "meta.property-value.css support.constant", // CSS: property values
                "source.css string punctuation", // CSS: string quotes
                "source.cpp entity.name.operator.custom-literal"
            ],
            "settings": {
                "foreground": theme.stringsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "string escapes",
            "scope": [
                "constant.character.escape",
                "constant.character.string.escape", // F#: escape chars
                // lang specific
                "keyword.format.specifier.fsharp", // F#: format specifiers
                "constant.character.format.placeholder.other.python", // Python: f-string input braces
                "storage.type.format.python", // Python: f-string input formats :.2f
                "punctuation.definition.interpolation", // Rust: braces around interpolation are like escapes
                "meta.var.expr string.template meta.template.expression punctuation.definition.template-expression", // JS, TS: string template ${}
                "meta.var.expr meta.tag meta.jsx.children punctuation.section.embedded", // JSX, TSX: element embedded input brackets
                "source.kotlin variable.string-escape", // Kotlin: template string single input like $a
                "source.kotlin meta.template.expression", // Kotlin: template string block input text
                "source.kotlin entity.string.template", // Kotlin: template string block (Kotlin Language extension)
                "source.scala punctuation.definition.template-expression", // Scala: templars $
                "text.xml constant.character.entity", // XML: escapes like &lt;
                "text.html constant.character.entity", // HTML: escapes like &lt;
                "source.ruby punctuation.section.embedded", // Ruby: template input
                "source.hcl keyword.other.interpolation", // HCL: string interpolation ${}
            ],
            "settings": {
                "foreground": theme.stringEscapesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "strings in comments",
            "scope": [
                "comment string",
            ],
            "settings": {
                "foreground": muted(theme.stringsColor),
                "fontStyle": ""
            }
        },
        {
            "name": "string escapes in comments",
            "scope": [
                "comment constant.character.escape",
            ],
            "settings": {
                "foreground": muted(theme.stringEscapesColor),
                "fontStyle": ""
            }
        },
        {
            "name": "numeric literals",
            "scope": [
                "constant.numeric",
                "storage.type.number.python", // Python: number prefix like 0x or 0b
                "source.rust constant.numeric entity.name.type", // Rust: number type suffix
                "source.cpp keyword.other.unit", // C++: number suffixes
                "keyword.other.unit", // CSS: units, like px in 3px, color like the number
                "meta.var.expr constant.numeric storage.type.numeric", // JS, TS, JSX, TSX: number suffix
            ],
            "settings": {
                "foreground": theme.numbersColor,
                "fontStyle": ""
            }
        },
        {
            "name": "other literals",
            "scope": [
                "meta.property-value.css", // CSS property value
                "constant.other.time.datetime.offset.toml", // time in toml
                "constant.other.time.datetime.local.toml", // time in toml
                "constant.other.time.date.toml", // time in toml
                "constant.other.time.time.toml", // time in toml
                "constant.other.timestamp.yaml", // time in yaml
            ],
            "settings": {
                "foreground": theme.literalsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "labels",
            "scope": [
                "entity.name.label",
                // lang specific
                "entity.name.type.lifetime.rust", // Rust: lifetime name without semantic highlighting
                "punctuation.definition.lifetime.rust", // Rust: lifetime ' without semantic highlighting
                "storage.modifier.lifetime.rust", // Rust: lifetime 'name with semantic highlighting
                "variable.parameter.definition.label.latex", // TeX: labels
                "entity.other.attribute-name.id.css", // CSS: ids
                "source.ruby constant.language.symbol", // Ruby: symbols
            ],
            "settings": {
                "foreground": theme.labelsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "types (including primitives)",
            "scope": [
                "entity.name.type",
                "entity.name.class",
                "entity.name.struct",
                "entity.name.enum",
                "entity.name.tag",
                "support.type", // std lib types
                "support.class",
                "support.struct",
                "support.enum",
                "entity.other.inherited-class",
                // lang specific rules
                "variable.other.metavariable.specifier.rust", // Rust: macro type specifier :ty or :literal
                "source.java storage.type", // Java: types
                "source.haskell storage.type", // Haskell: types
                "source.haskell constant.other", // Haskell: types in uses, unfortunately this also colors True/False and similar but I think this looks better overall
                "source.go storage.type", // Go: builtin types
                "source.cpp storage.type.integral", // C++: builtin types
                "source.cpp storage.type.built-in", // C++: builtin types
                "source.cpp meta.template storage.type.template.argument", // C++: template type parameters
                "source.elm storage.type", // Elm: types
                "keyword.type", // C# builtin types like double, 
                "entity.other.attribute-name.class.css", // CSS: class
                "entity.other.attribute-name.pseudo-class.css", // CSS: pseudo-class
                "entity.other.attribute-name.pseudo-element.css", // CSS: pseudo-element
                "meta.selector.css", // CSS: custom selectors
                "meta.var.expr new.expr meta.function-call entity.name.function", // JS, TS, JSX, TSX: function calls with new
            ],
            "settings": {
                "foreground": theme.typesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "types (including primitives) in docs",
            "scope": [
                "comment.block entity.name.type", // Java: types in doc comments
                "comment keyword.other.type.php", // PHP: built-in types in doc comments
                "comment support.class.php", // PHP: other types in doc comments
                "comment support.class.builtin.php", // PHP: builtin-types in doc comments
            ],
            "settings": {
                "foreground": muted(theme.typesColor),
                "fontStyle": ""
            }
        },
        {
            "name": "Enum members",
            "scope": [
                "variable.other.enummember", // Rust: enum members from semantic highlighting
                // lang specific
                "entity.name.variable.enum-member.cs", // C# enum members
                "constant.type-constructor.elm", // Elm: record fields
                "constant.other.enum.java", // Java: enum member
            ],
            "settings": {
                "foreground": theme.enumMembersColor,
                "fontStyle": ""
            }
        },
        {
            "name": "function like",
            "scope": [
                "entity.name.function",
                "support.function", // std lib functions
                // lang specific
                "meta.function-call.generic.python", // Python: function calls
                // C++: function like operators
                "keyword.operator.cast",
                "keyword.operator.sizeof",
                "keyword.operator.alignof",
                "keyword.operator.typeid",
                "entity.name.function.operator.member.cpp", // C++: operator overload definition function
            ],
            "settings": {
                "foreground": theme.functionsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "tables, groups, tags, headings",
            "scope": [
                "support.type.property-name.table.toml", // TOML: table names
                "support.type.property-name.array.toml", // TOML: array names
                "entity.name.section.group-title.ini", // INI: group title
            ],
            "settings": {
                "foreground": theme.typesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "links",
            "scope": [
                "text.html.markdown string.other.link", // Markdown: link
                "text.html.markdown meta.link.reference.def constant.other", // Markdown: link definition
                "text.asciidoc markup.reference string", // AsciiDoc: reference <<...>>
                "text.asciidoc markup.other.url string", // AsciiDoc: link
                "meta.link.email.lt-gt.markdown markup.underline.link", // Markup: email
                "markup.link.email", // AsciiDoc: email link
            ],
            "settings": {
                "foreground": theme.functionsColor,
                "fontStyle": ""
            }
        },
        //
        // YAML specific
        //
        {
            "name": "anchor",
            "scope": [
                "entity.name.type.anchor.yaml", // YAML: anchor name
                "variable.other.alias.yaml", // YAML: use of anchor
            ],
            "settings": {
                "foreground": theme.functionsColor,
                "fontStyle": ""
            }
        },
        //
        // Markup specific
        //
        {
            "name": "headings",
            "scope": [
                "markup.heading", // Markdown, AsciiDoc: headings
                "text.tex meta.function.section.part entity.name", // TeX: part name
                "text.tex meta.function.section.chapter entity.name", // TeX: chapter name
                "text.tex meta.function.section.section entity.name", // TeX: section name
            ],
            "settings": {
                "foreground": theme.typesColor,
                "fontStyle": ""
            }
        },
        {
            "name": "headings 2",
            "scope": [
                "markup heading.2", // Markdown: lvl 2 headings
                "markup.heading.heading-1", // AsciiDoc: lvl 2 heading text
                "markup.heading.heading-1 markup.heading", // AsciiDoc: lvl 2 heading #=
                "text.tex meta.function.section.subsection entity.name", // TeX: subsection name
            ],
            "settings": {
                "foreground": theme.typesColor.overlayOpacity(0.875, theme.overlayBaseColor),
                "fontStyle": ""
            }
        },
        {
            "name": "headings 3",
            "scope": [
                "markup heading.3", // Markdown: lvl 3 headings
                "markup.heading.heading-2", // AsciiDoc: lvl 3 heading text
                "markup.heading.heading-2 markup.heading", // AsciiDoc: lvl 3 heading #=
                "text.tex meta.function.section.subsubsection entity.name", // TeX: subsubsection name
            ],
            "settings": {
                "foreground": theme.typesColor.overlayOpacity(0.75, theme.overlayBaseColor),
                "fontStyle": ""
            }
        },
        {
            "name": "headings 4",
            "scope": [
                "markup heading.4", // Markdown: lvl 4 headings
                "markup.heading.heading-3", // AsciiDoc: lvl 4 heading text
                "markup.heading.heading-3 markup.heading", // AsciiDoc: lvl 4 heading #=
                "text.tex meta.function.section.paragraph entity.name", // TeX: paragraph name
                "source.rust heading.4.markdown entity.name.section.markdown"
            ],
            "settings": {
                "foreground": theme.typesColor.overlayOpacity(0.625, theme.overlayBaseColor),
                "fontStyle": ""
            }
        },
        {
            "name": "headings 5",
            "scope": [
                "markup heading.5", // Markdown: lvl 5 headings
                "markup.heading.heading-4", // AsciiDoc: lvl 5 heading text
                "markup.heading.heading-4 markup.heading", // AsciiDoc: lvl 5 heading #=
                "text.tex meta.function.section.subparagraph entity.name", // TeX: subparagraph name
            ],
            "settings": {
                "foreground": theme.typesColor.overlayOpacity(0.5, theme.overlayBaseColor),
                "fontStyle": ""
            }
        },
        {
            "name": "headings 6",
            "scope": [
                "markup heading.6", // Markdown: lvl 6 headings
                "markup.heading.heading-5", // AsciiDoc: lvl 6 heading text
                "markup.heading.heading-5 markup.heading" // AsciiDoc: lvl 6 heading #=
            ],
            "settings": {
                "foreground": theme.typesColor.overlayOpacity(0.375, theme.overlayBaseColor),
                "fontStyle": ""
            }
        },
        // {
        // 	"name": "heading link",
        // 	"scope": [
        // 		"text.html.markdown markup.heading string.other.link", // Markdown, AsciiDoc: headings
        // 	],
        // 	"settings": {
        // 		"foreground": color.code_green,
        // 		"fontStyle": "underline"
        // 	}
        // },
        {
            "name": "inline code",
            "scope": [
                "markup.inline.raw.string", // Markdown: inline raw string
                "text.asciidoc markup.raw", // AsciiDoc: raw string
            ],
            "settings": {
                "foreground": theme.literalsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "inline code in comments",
            "scope": [
                "comment markup.inline.raw.string",
            ],
            "settings": {
                "foreground": muted(theme.literalsColor),
                "fontStyle": ""
            }
        },
        {
            "name": "text",
            "scope": [
                "text.asciidoc markup.macro string", // AsciiDoc: text in macros
            ],
            "settings": {
                "foreground": theme.codeFgColor2,
                "fontStyle": ""
            }
        },
        {
            "name": "block quotes",
            "scope": [
                "markup.quote", // Markdown:
                "markup.italic.quotes" // AsciiDoc:
            ],
            "settings": {
                "foreground": theme.codeFgColor2,
                "fontStyle": useItalics
            }
        },
        {
            "name": "bold",
            "scope": [
                "markup.bold"
            ],
            "settings": {
                "foreground": theme.codeFgColor4,
                "fontStyle": "bold"
            }
        },
        {
            "name": "italic",
            "scope": [
                "markup.italic"
            ],
            "settings": {
                "foreground": theme.codeFgColor4,
                "fontStyle": useItalics
            }
        },
        {
            "scope": [
                "markup.list punctuation",
                "markup.quote punctuation",
                "markup.fenced_code.block punctuation.definition.markdown",
                "markup.fenced_code.block fenced_code.block.language",
                "meta.separator.markdown",
                "markup.list.bullet",
            ],
            "settings": {
                "foreground": theme.codeFgColor4,
                "fontStyle": ""
            }
        },
        {
            "name": "callout",
            "scope": [
                "callout.source.code.asciidoc", // AsciiDoc: callouts like # <1>
                "callout.source.code.asciidoc constant.other",
                "callout.source.code.asciidoc constant.numeric",
            ],
            "settings": {
                "foreground": theme.codeFgColor0,
                "fontStyle": ""
            }
        },
        //
        // TeX specific
        //
        {
            "name": "function like",
            "scope": [
                "text.tex support.function",
                "text.tex storage.type.function",
                "text.tex constant.other", // commands in math blocks like \frac
                "text.tex constant",
            ],
            "settings": {
                "foreground": theme.keywordsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "function like",
            "scope": [
                "text.tex support.function.be",
                "text.tex support.function.section",
            ],
            "settings": {
                "foreground": theme.functionsColor,
                "fontStyle": ""
            }
        },
        {
            "name": "regular text inside math blocks",
            "scope": [
                "text.tex support.class.math",
            ],
            "settings": {
                "foreground": theme.literalsColor,
                "fontStyle": "",
            }
        },
        {
            "scope": [
                "text.tex meta.function variable.parameter", // TeX: environment names
            ],
            "settings": {
                "foreground": theme.codeFgColor4,
                "fontStyle": ""
            }
        },
        {
            "scope": [
                "text.tex meta.preamble support.class", // TeX: environment names
            ],
            "settings": {
                "foreground": theme.codeFgColor2,
                "fontStyle": ""
            }
        }
    ]

    // Convert colors to HEX
    for (const obj of out) {
        if (obj.settings.foreground instanceof Color) {
            obj.settings.foreground = obj.settings.foreground.toHex("rgba");
        }
    }

    return out
}

type SemanticHiglightItem = {
    italic?: boolean,
    bold?: boolean,
    underline?: boolean,
    foreground?: Color | string
}


export function semanticTokenColors(theme: ThemeDef): { [k: string]: SemanticHiglightItem | string | Color } {
    const muted = function (c: Color): Color {
        return c.overlayOpacity(theme.mutedOpacity, theme.overlayBaseColor)
    }

    const colors: { [k: string]: SemanticHiglightItem | string | Color } = {
        //"generic": color.code_base,
        "parameter": theme.specialVariablesColor, // Parameters inside the functions are only detected by semantic highlighting, color them here
        "selfParameter:python": theme.keywordsColor, // Python: above override self parameter too, need to override it again
        "clsParameter:python": theme.keywordsColor, // Python: same as with self
        "builtinConstant:python": { // Python: True/False/None 
            "italic": false,
        },
        "*.static": {
            "italic": theme.italics
        },
        "*.static.constant": {
            "italic": false
        },
        "*.static.readonly": {
            "italic": false
        },
        "*.mutable": {
            "underline": theme.underlined
        },
        "member:fsharp": theme.specialVariablesColor, // F#: members which are otherwise mapped to entity.name.function
        // Kotlin: variables/parameters are either mutable or readonly, 
        // latter is specified by modifier
        // also definitions are as: 
        //     Property -> definition, a in val a
        //     Variable -> variable use, a in a.member
        //     Parameter -> parameter in function signature/head
        // so effectively there is no consistency between variable and it's color, so color them all gray
        "property:kotlin": {
            "underline": theme.underlined,
            "foreground": theme.localVariablesColor
        },
        "property.readonly:kotlin": {
            "underline": false,
            "foreground": theme.localVariablesColor
        },
        "parameter:kotlin": {
            "underline": theme.underlined,
            "foreground": theme.localVariablesColor
        },
        "parameter.readonly:kotlin": {
            "underline": false,
            "foreground": theme.localVariablesColor
        },
        "variable:kotlin": {
            "underline": theme.underlined,
            "foreground": theme.localVariablesColor
        },
        "variable.readonly:kotlin": {
            "underline": false,
            "foreground": theme.localVariablesColor
        },
        "variable.static:rust": { // Rust: non-member (global, local) statics, 
            "foreground": theme.specialVariablesColor
        },
        // interfaces
        // to override:
        // * typescripts weird mapping of interface to class,
        // * rust mapping of "interface.defaultLibrary" traits to 'support.class'
        "interface": theme.interfacesColor,
        // annotations
        "*.annotation:dart": theme.attributesColor, // Dart: annotations, they delegate to class, property, thus need to override here
        "annotation:dart": theme.attributesColor, // Dart: annotations @
        "keyword.void:dart": theme.typesColor, // Dart: void type
        "source.interpolation:dart": theme.stringEscapesColor, // Dart: interpolation input
        "type:kotlin": theme.attributesColor, // Kotlin: annotations
        //
        "decorator": theme.attributesColor, // Rust: builtin attributes like feature = "..."
        "class.decorator": theme.attributesColor, // Python: decorators that are classes
        "function.decorator": theme.attributesColor, // Python: decorators that are functions
        "attributeBracket:rust": theme.punctuationsColor, //  [ in #[...]
        // toml
        "tomlTableKey": theme.codeFgColor4, // toml inline table key 
        "tomlArrayKey": theme.codeFgColor4, // toml inline array key
        // other
        "class.constructor:java": theme.typesColor, // Java: constructor
        "class": {
            "italic": false
        }, // Java: 'final' classes are detected as readonly, don't make them italic
        "enum": {
            "italic": false,
        }, // Java: same as with classes above
        "enumMember": {
            "italic": false
        }, // Java: same as with classes above
        "formatSpecifier": theme.stringEscapesColor,
        "escapeSequence": theme.stringEscapesColor,
        // // Rust documentation, dim all the colors slightly
        "*.injected": muted(theme.codeFgColor2),
        "generic.injected:rust": muted(theme.codeFgColor2),
        "namespace.injected:rust": muted(theme.namespacesColor),
        // types
        "struct.injected:rust": muted(theme.typesColor),
        "enum.injected:rust": muted(theme.typesColor),
        "enumMember.injected:rust": muted(theme.enumMembersColor),
        "builtinType.injected:rust": muted(theme.typesColor),
        "typeAlias.injected:rust": muted(theme.typesColor),
        "union.injected:rust": muted(theme.typesColor),
        "typeParameter.injected:rust": muted(theme.typesColor),
        // traits
        "trait.injected:rust": muted(theme.interfacesColor),
        "interface.injected:rust": muted(theme.interfacesColor),
        // keywords
        "keyword.injected:rust": muted(theme.keywordsColor),
        "selfKeyword.injected:rust": muted(theme.keywordsColor),
        "selfTypeKeyword.injected:rust": muted(theme.keywordsColor),
        // function like
        "function.injected:rust": muted(theme.functionsColor),
        "macro.injected:rust": muted(theme.functionsColor),
        "method.injected:rust": muted(theme.functionsColor),
        // operators
        "operator.injected:rust": muted(theme.operatorsColor),
        "arithmetic.injected:rust": muted(theme.operatorsColor),
        "bitwise.injected:rust": muted(theme.operatorsColor),
        "comparison.injected:rust": muted(theme.operatorsColor),
        "logical.injected:rust": muted(theme.operatorsColor),
        // punctuation
        "punctuation.injected:rust": muted(theme.punctuationsColor),
        "attributeBracket.injected:rust": muted(theme.punctuationsColor),
        "angle.injected:rust": muted(theme.punctuationsColor),
        "brace.injected:rust": muted(theme.punctuationsColor),
        "bracket.injected:rust": muted(theme.punctuationsColor),
        "parenthesis.injected:rust": muted(theme.punctuationsColor),
        "colon.injected:rust": muted(theme.punctuationsColor),
        "comma.injected:rust": muted(theme.punctuationsColor),
        "dot.injected:rust": muted(theme.punctuationsColor),
        "semi.injected:rust": muted(theme.punctuationsColor),
        "macroBang.injected:rust": muted(theme.punctuationsColor),
        // variables
        "variable.injected:rust": muted(theme.localVariablesColor),
        "property.injected:rust": muted(theme.specialVariablesColor),
        "parameter.injected:rust": muted(theme.specialVariablesColor),
        "variable.constant.injected:rust": muted(theme.specialVariablesColor),
        "variable.static.injected:rust": muted(theme.specialVariablesColor),
        "constParameter.injected:rust": muted(theme.specialVariablesColor),
        // literals
        "string.injected:rust": muted(theme.stringsColor),
        "character.injected:rust": muted(theme.stringsColor),
        "escapeSequence.injected:rust": muted(theme.stringEscapesColor),
        "formatSpecifier.injected:rust": muted(theme.stringEscapesColor),
        "number.injected:rust": muted(theme.numbersColor),
        "boolean.injected:rust": muted(theme.keywordsColor),
        // attributes
        "builtinAttribute.injected:rust": muted(theme.attributesColor),
        "attribute.injected:rust": muted(theme.attributesColor),
        "decorator.injected:rust": muted(theme.attributesColor),
        "derive.injected:rust": muted(theme.attributesColor),
        "deriveHelper.injected:rust": muted(theme.attributesColor),
        "generic.attribute.injected:rust": muted(theme.attributesColor),
        "namespace.attribute.injected:rust": muted(theme.attributesColor), // derive in doc code blocks
        // labels
        "label.injected:rust": muted(theme.labelsColor),
        "lifetime.injected:rust": muted(theme.labelsColor),
        // comment
        "comment.injected:rust": muted(theme.commentsColor),
        // Other documentation
        "parameter.documentation": muted(theme.specialVariablesColor),
        "variable.documentation": muted(theme.localVariablesColor),
        "class.documentation": muted(theme.typesColor),
        "struct.documentation": muted(theme.typesColor),
        "enum.documentation": muted(theme.typesColor),
        "enumMember.documentation": muted(theme.enumMembersColor),
        "interface.documentation": muted(theme.interfacesColor),
        "namespace.documentation": muted(theme.namespacesColor),
        "keyword.documentation": muted(theme.keywordsColor),
        "function.documentation": muted(theme.functionsColor),
        "method.documentation": muted(theme.functionsColor)
    };

    // Convert colors to HEX
    for (const [k, obj] of Object.entries(colors)) {
        if (obj instanceof Color) {
            colors[k] = obj.toHex("rgba");
        } else if (typeof obj === 'object' && "foreground" in obj) {
            if (obj.foreground instanceof Color) {
                obj.foreground = obj.foreground.toHex("rgba")
            }
        }
    }

    return colors;
}
