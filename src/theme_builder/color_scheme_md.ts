/**
 * Module for creating ColorScheme.md with specified colors.
 */

import { Color } from "../color/color";
import { ThemeDef } from "./theme"

function pad(s: string, pad = " ", len = 7): string {
    while (s.length < len) {
        s += pad
    }
    return s
}

/**
 * Creates a table of colors by overlaying the main color over the base with different opacities.
 */
function buildColorsTable(colors: { [k: string]: Color }, overlay_base: Color, opacities: number[]): string {
    const firstColLen = Math.max(...Object.keys(colors).map((a) => a.length));
    let out = ""
    const header = `| ${pad("name", " ", firstColLen)} | ${pad("100%")} | ` + opacities.map((a) => pad(`${a * 100}%`)).join(" | ") + " |"
    const colSpec = `| ${pad("", "-", firstColLen)} | ` + Array(1 + opacities.length).fill("").map((a: string) => pad(a, "-")).join(" | ") + " |";

    out += header + "\n" + colSpec + "\n";

    for (const [k, v] of Object.entries(colors)) {
        const str = `| ${pad(k, " ", firstColLen)} | ${pad(v.toHex())} | ` + opacities.map((a) => pad(v.overlayOpacity(a, overlay_base).toHex())).join(" | ") + " |";
        out += str + "\n";
    }
    return out;
}

/**
 * Creates the text inside ColorScheme.md.
 */
export function buildColorSchemeMd(themeDef: ThemeDef): string {
    const codeColors = {
        "red": themeDef.red,
        "purple": themeDef.pink,
        "purple2": themeDef.purple,
        "blue": themeDef.blue,
        "cyan": themeDef.cyan,
        "green": themeDef.green,
        "yellow": themeDef.yellow,
        "light orange": themeDef.lightOrange,
        "orange": themeDef.orange,
        "white": themeDef.codeFgColor4,
        "base": themeDef.codeFgColor2,
        "gray": themeDef.codeFgColor0,
        "black": new Color(0, 0, 0, 0)
    };

    const brightColors = {
        "bright red": themeDef.brightRed,
        "bright blue": themeDef.brightBlue,
        "bright green": themeDef.brightGreen,
        "bright yellow": themeDef.brightYellow,
    };

    const opacities = [0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125, 0.075, 0.05]

    const colorEntry = (c: Color) => `${c.toHex()} | ${c.overlayOpacity(themeDef.mutedOpacity, themeDef.overlayBaseColor).toHex()}`
    const diffColorEntry = (c: Color) => `BG: ${c.overlayOpacity(themeDef.diffBgOpacity, themeDef.overlayBaseColor).toHex()}, Highlight: ${c.overlayOpacity(themeDef.diffGutterOpacity, themeDef.overlayBaseColor).toHex()}`;

    const color_scheme = `
# Color scheme

This document outlines overall theme style and colors.

> TIP: View this file inside the VSCode with [Color Highlight] (or similar) extension for easy visualization of colors.

## Code

> Elements not listed below are file specific but should follow the style of code in some meaningful way. If some color cannot be used anywhere in such a way, it can replace some other color if it results in better contrast or more pleasing visuals.

* Underlined
  * mutable variables and methods that mutate self/this (if they should be differentiated from regular variables)
* Italic
  * static variables and methods
* Bold
  * Don't use

| scope              | color   | muted   | description                                               |
| ------------------ | ------- | ------- | --------------------------------------------------------- |
| keywords           | ${colorEntry(themeDef.keywordsColor)} |                                                           |
| function like      | ${colorEntry(themeDef.functionsColor)} | functions, macros, enum members(may be language specific) |
| types              | ${colorEntry(themeDef.typesColor)} | including primitive types like \`str\`, \`int\`               |
| traits/interfaces  | ${colorEntry(themeDef.interfacesColor)} |                                                           |
| attributes         | ${colorEntry(themeDef.attributesColor)} | derives, decorators, annotations                          |
| namespaces/modules | ${colorEntry(themeDef.namespacesColor)} |                                                           |
| operators          | ${colorEntry(themeDef.operatorsColor)} |                                                           |
| local variables    | ${colorEntry(themeDef.localVariablesColor)} |                                                           |
| special variables  | ${colorEntry(themeDef.specialVariablesColor)} | parameters, constants, struct/class members               |
| strings            | ${colorEntry(themeDef.stringsColor)} | includes prefixes and suffixes                            |
| string escapes     | ${colorEntry(themeDef.stringEscapesColor)} | \\n \\u123, template delimiters and format specifiers       |
| numbers            | ${colorEntry(themeDef.numbersColor)} | includes prefixes and suffixes                            |
| labels             | ${colorEntry(themeDef.labelsColor)} | label names, lifetimes in rust                            |
| comments           | ${colorEntry(themeDef.commentsColor)} |                                                           |
| code in comments   |         |         | same color as the actual code but muted variant           |

Muted variant is 62.5% value in muted colors table below.

### Config files (TOML, JSON etc)

| scope                    | color   | description                                                 |
| ------------------------ | ------- | ----------------------------------------------------------- |
| keys                     | ${themeDef.specialVariablesColor.toHex()} | white as they are like properties/fields                    |
| keyword like values      | ${themeDef.keywordsColor.toHex()} | true false                                                  |
| other values             | ${themeDef.literalsColor.toHex()} | strings, numbers, plain text which semantically is a string |
| headings, section labels | ${themeDef.typesColor.toHex()} | XML tags, TOML, INI array headings                          |

### Markdown, text files

| scope    | color   | description |
| -------- | ------- | ----------- |
| text     | ${themeDef.codeFgColor2.toHex()} |             |
| headings | ${themeDef.typesColor.toHex()} |             |

## Muted colors table

Table where each color is applied over dark background color ${themeDef.overlayBaseColor.toHex()}.
Note that these are gamma corrected (with gamma = 2.2) and do not match the opacity values used directly in VS Code. 
Advantage of this is that the colors seem to retain a bit more saturation.

Main uses:
* 100% - main code, terminal bright colors
* 62.5% - muted code (in docs), terminal colors
* 12.5%, 7.5%, 5.0% - backgrounds (diff, find matches)

${buildColorsTable(codeColors, themeDef.overlayBaseColor, opacities)}

## Diff

* Added   - ${diffColorEntry(themeDef.green)}
* Removed - ${diffColorEntry(themeDef.red)}
* Changed - ${diffColorEntry(themeDef.blue)}
* Else    - ${diffColorEntry(themeDef.yellow)}

## UI

| scope                      | color   | description                                    |
| -------------------------- | ------- | ---------------------------------------------- |
| very dark bg               | ${themeDef.bgColor0.toHex()} | inputs, title bar                              |
| dark bg                    | ${themeDef.bgColor1.toHex()} | side bar, panels                               |
| base bg                    | ${themeDef.bgColor2.toHex()} | main editor                                    |
| light bg                   | ${themeDef.bgColor3.toHex()} | hover                                          |
| bright bg                  | ${themeDef.bgColor4.toHex()} | active selected tab                            |
|                            |         |                                                |
| very dark fg               | ${themeDef.fgColor0.toHex()} |                                                |
| dark fg                    | ${themeDef.fgColor1.toHex()} |                                                |
| base fg                    | ${themeDef.fgColor2.toHex()} | main editor text                               |
| light fg                   | ${themeDef.fgColor3.toHex()} |                                                |
| bright fg                  | ${themeDef.fgColor4.toHex()} | highlight text                                 |
|                            |         |                                                |
| dark highlight             | ${themeDef.accentAltBgColor.toHex()} | active selections                              |
| highlight                  | ${themeDef.accentBgColor.toHex()} | buttons, badges, tab highlight, resize borders |
|                            |         |                                                |
| match background           | ${themeDef.searchMatchSelectedBgColor.toHex()} | currently selected match                       |
| match highlight            | ${themeDef.searchMatchBgColor.toHex()} | other matches                                  |

* Use subtle borders darker than the inner area usually ${themeDef.borderColor.toHex("rgba")}.
* Hover is slightly lighter, focused slightly lighter than that.

If possible and it looks good, try to use colors from code section for yellows, greens etc.
However below are some other darker and brighter colors used:

${buildColorsTable(brightColors, themeDef.overlayBaseColor, opacities)}

[Color Highlight]: https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight
`
    return color_scheme;
}