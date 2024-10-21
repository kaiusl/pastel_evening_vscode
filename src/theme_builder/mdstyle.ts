/**
 * Module for generating markdown preview style .css files.
 */

import { Color } from "../color/color"
import { ThemeDef } from "./theme"

type Style = {
    color?: Color
    backgroundColor?: Color
}

export function buildMdstyleCss(themes: ThemeDef[]): string {
    let css = ""
    for (const theme of themes) {
        css += buildMdstyleCssSingle(theme) + "\n"
    }
    return css
}

export function buildMdstyleCssSingle(theme: ThemeDef): string {
    const style: { [k: string]: Style } = {
        pre: {
            backgroundColor: theme.bgColor1
        },

        [`.hljs-keyword,
          .hljs-literal,
          .hljs-variable.language_`]: {
            color: theme.keywordsColor
        },
        '.hljs-built_in': {
            color: theme.typesColor
        },

        [`.hljs-type,
          .hljs-class,
          .hljs-title.class_,
          .hljs-title.class_.inherited__,
          .hljs-class .hljs-title,
          .hljs-type .hljs-title`]: {
            color: theme.typesColor
        },

        [`.hljs-function,
          .hljs-title.function_,
          .hljs-title.function_.invoke__,
          .hljs-function .hljs-title`]: {
            color: theme.functionsColor
        },

        '.hljs-number': {
            color: theme.numbersColor
        },

        [`.hljs-regexp,
                .hljs-string`]: {
            color: theme.stringsColor
        },

        '.hljs-char.escape_': {
            color: theme.stringEscapesColor
        },

        'hljs-subst': {
            color: theme.codeFgColor2
        },

        '.hljs-symbol': {
            color: theme.literalsColor
        },

        '.hljs-operator .hljs-punctuation': {
            color: theme.codeFgColor2
        },

        '.hljs-variable': {
            color: theme.localVariablesColor
        },

        [`.hljs-property,
          .hljs-variable.constant_,
          .hljs-params`]: {
            color: theme.specialVariablesColor
        },

        [`.hljs-comment,
          .hljs-doctag`]: {
            color: theme.commentsColor
        },

        [`.hljs-meta,
          .hljs-meta .hljs-keyword`]: {
            color: theme.attributesColor
        },

        [`.hljs-section,
          .hljs-name`]: {
            color: theme.typesColor
        },

        '.hljs-tag': {
            color: theme.codeFgColor2
        },

        [`.hljs-attr,
          .hljs-attribute`]: {
            color: theme.codeFgColor4
        },

        [`.hljs-selector-tag,
          .hljs-selector-class,
          .hljs-selector-pseudo`]: {
            color: theme.typesColor
        },

        '.hljs-selector-id': {
            color: theme.labelsColor
        },

        '.hljs-selector-attr': {
            color: theme.codeFgColor4
        },

        '.hljs-addition': {
            color: theme.green
        },

        '.hljs-deletion': {
            color: theme.red
        }
    }

    return styleMapToCSS(theme, style)
}

function styleMapToCSS(theme: ThemeDef, style: { [k: string]: Style }): string {
    let out = ""
    for (const [selectors, properties] of Object.entries(style)) {
        let i = 0;
        for (const selector of selectors.split(",")) {
            if (i > 0) {
                out += ",\n"
            }
            out += `[data-vscode-theme-name='${theme.displayName}'] .markdown-body ` + selector.trim()
            i++
        }

        out += " {\n"

        if (properties.color) {
            out += `    color: ${properties.color.toHex()};\n`
        }
        if (properties.backgroundColor) {
            out += `    background-color: ${properties.backgroundColor.toHex()};\n`
        }

        out += "}\n"
    }

    return out
}