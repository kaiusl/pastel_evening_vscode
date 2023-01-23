# Color scheme

This document outlines overall theme style and colors.

> TIP: View this file inside the VSCode with [Color Highlight] (or similar) extension for easy visualization of colors.
> 
## Code

> Elements not listed below are file specific but should follow the style of code in some meaningful way. If some color cannot be used anywhere in such a way, it can replace some other color if it results in better contrast or more pleasing visuals.

* Underlined
  * mutable variables and methods that mutate self/this (if they should be differentiated from regular variables)
* Italic
  * static variables and methods
* Bold
  * Don't use

| scope              | color   | description                                                                     |
| ------------------ | ------- | ------------------------------------------------------------------------------- |
| keywords           | #f28585 |                                                                                 |
| function like      | #6dbaf2 | functions, macros, enum members(may be language specific)                       |
| types              | #69edab | including primitive types like `str`, `int`                                     |
| traits/interfaces  | #eddd9a |                                                                                 |
| attributes         | #eddd9a | derives, decorators, annotations                                                |
| namespaces/modules | #acafbf |                                                                                 |
| operators          | #acafbf |                                                                                 |
| local variables    | #acafbf |                                                                                 |
| special variables  | #d1d5eb | parameters, constants, struct/class members                                     |
| strings            | #e6b583 | includes prefixes and suffixes                                                  |
| string escapes     | #df9355 | \n \u123, template delimiters and format specifiers                             |
| numbers            | #e6b583 | includes prefixes and suffixes                                                  |
| labels             | #df9355 | label names, lifetimes in rust                                                  |
| comments           | #737580 |                                                                                 |
| code in comments   |         | same color as the actual code but a bit transparent like #f28585b9 for keywords |

### Config files (TOML, JSON etc)

| scope                    | color   | description                                                 |
| ------------------------ | ------- | ----------------------------------------------------------- |
| keys                     | #d1d5eb | white as they are like properties/fields                    |
| keyword like values      | #f28585 | true false                                                  |
| other values             | #e6b583 | strings, numbers, plain text which semantically is a string |
| headings, section labels | #69edab | XML tags, TOML, INI array headings                          |

### Markdown, text files

| scope    | color   | description |
| -------- | ------- | ----------- |
| text     | #acafbf |             |
| headings | #69edab |             |

## UI

| scope                      | color     | description                                    |
| -------------------------- | --------- | ---------------------------------------------- |
| very dark bg               | #1c1f24   | inputs, title bar                              |
| dark bg                    | #23252b   | side bar, panels                               |
| base bg                    | #292b33   | main editor                                    |
| light bg                   | #2d323b   | hover                                          |
| bright bg                  | #353842   | active selected tab                            |
|                            |           |                                                |
| very dark fg               | #737580   |                                                |
| dark fg                    | #9193a1   |                                                |
| base fg                    | #acafbf   | main editor text                               |
| light fg                   | #bfc3d4   |                                                |
| bright fg                  | #d1d5eb   | highlight text                                 |
|                            |           |                                                |
| very dark highlight        | #2b3947   | inactive selections                            |
| dark highlight             | #324454   | active selections                              |
| highlight                  | #0a6bb1   | buttons, badges, tab highlight, resize borders |
| slightly lighter highlight | #0a77c5   | button hover                                   |
|                            |           |                                                |
| match background           | #000000a0 | currently selected match                       |
| match highlight            | #f2858540 | other matches                                  |

* Use subtle borders darker than the inner area usually "#00000040".
* Hover is slightly lighter, focused slightly lighter than that.

If possible and it looks good, try to use colors from code section for yellows, greens etc.
However below are some other darker and brighter colors used:

* red - #f14c4c, #ee5c5c
* green - #14df79, #50e080
* yellow - #fdbc4b, #ffda47
* orange - #da941d, 
* blue - #55aff0

Use purples or cyans as a last resort if nothing else fits at all.
* purple - #b180d7, #e24ae2, #e086e0
* cyan - #74dada, #41ffff

[Color Highlight]: https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight