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

| scope              | color   | muted   | description                                               |
| ------------------ | ------- | ------- | --------------------------------------------------------- |
| keywords           | #f28585 | #c36c6d |                                                           |
| function like      | #6dbaf2 | #5997c4 | functions, macros, enum members(may be language specific) |
| types              | #69edab | #56c08b | including primitive types like `str`, `int`               |
| traits/interfaces  | #eddd9a | #bfb37d |                                                           |
| attributes         | #eddd9a | #bfb37d | derives, decorators, annotations                          |
| namespaces/modules | #acafbf | #8b8e9b |                                                           |
| operators          | #acafbf | #8b8e9b |                                                           |
| local variables    | #acafbf | #8b8e9b |                                                           |
| special variables  | #d1d5eb | #a9acbe | parameters, constants, struct/class members               |
| strings            | #e6b583 | #ba936b | includes prefixes and suffixes                            |
| string escapes     | #df9355 | #b47747 | \n \u123, template delimiters and format specifiers       |
| numbers            | #e6b583 | #ba936b | includes prefixes and suffixes                            |
| labels             | #df9355 | #b47747 | label names, lifetimes in rust                            |
| comments           | #737580 | #5e5f69 |                                                           |
| code in comments   |         |         | same color as the actual code but muted variant           |

Muted variant is 62.5% value in muted colors table below.

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

## Muted colors table

Table where each color is applied over dark background color #1d1f24.
Note that these are gamma corrected (with gamma = 2.2) and do not match the opacity values used directly in VS Code. 
Advantage of this is that the colors seem to retain a bit more saturation.

Main uses:
* 100% - main code, terminal bright colors
* 62.5% - muted code (in docs), terminal colors
* 12.5%, 7.5%, 5.0% - backgrounds (diff, find matches)

| name         | 100%    | 87.5%   | 75%     | 62.5%   | 50%     | 37.5%   | 25%     | 12.5%   | 7.5%    | 5.0%    |
| ------------ | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| red          | #f28585 | #e37d7d | #d47575 | #c36c6d | #b16263 | #9c5758 | #824a4c | #60393c | #4e3134 | #422c2f |
| magenta      | #e086e0 | #d27ed3 | #c476c5 | #b56db5 | #a463a4 | #905891 | #794b7a | #5a3a5b | #49314b | #3e2c41 |
| blue         | #6dbaf2 | #66afe3 | #60a3d4 | #5997c4 | #5188b1 | #48789c | #3e6583 | #314c62 | #2a3f50 | #263645 |
| cyan         | #74dada | #6dcdcd | #66bfbf | #5eb0b0 | #56a0a0 | #4c8d8d | #417677 | #335859 | #2c4849 | #273e40 |
| green        | #69edab | #63dfa1 | #5cd096 | #56c08b | #4ead7e | #469970 | #3c805e | #2f5f48 | #294d3d | #254236 |
| yellow       | #eddd9a | #dfd091 | #d0c287 | #bfb37d | #ada272 | #988e65 | #7f7756 | #5e5943 | #4c4839 | #413e33 |
| light_orange | #e6b583 | #d8aa7b | #ca9f73 | #ba936b | #a88562 | #947557 | #7c634b | #5c4a3b | #4a3d33 | #40352f |
| orange       | #df9355 | #d28a50 | #c3814c | #b47747 | #a36c42 | #8f603c | #785135 | #593e2d | #48342a | #3e2e28 |
| white        | #d1d5eb | #c4c8dd | #b7bbce | #a9acbe | #999cac | #878998 | #71737f | #54565f | #44464e | #3b3c43 |
| gray         | #acafbf | #a2a4b4 | #979aa8 | #8b8e9b | #7e808c | #6f717c | #5e5f69 | #46484f | #3a3c42 | #32343a |
| dark_gray    | #737580 | #6c6e78 | #656771 | #5e5f69 | #55575f | #4c4d55 | #414249 | #33343a | #2b2d32 | #27292e |
| black        | #000000 | #0b0c0d | #0f1013 | #121317 | #15161a | #17191d | #191b1f | #1b1d21 | #1b1d22 | #1c1e23 |

## Diff

* Added   - BG: #254236, Highlight: #2f5f48
* Removed - BG: #422c2f, Highlight: #60393c
* Changed - BG: #263645, Highlight: #314c62
* Else    - BG: #413e33, Highlight: #5e5943

## UI

| scope                      | color   | description                                    |
| -------------------------- | ------- | ---------------------------------------------- |
| very dark bg               | #1d1f24 | inputs, title bar                              |
| dark bg                    | #23252c | side bar, panels                               |
| base bg                    | #292b33 | main editor                                    |
| light bg                   | #2f313a | hover                                          |
| bright bg                  | #353842 | active selected tab                            |
|                            |         |                                                |
| very dark fg               | #737580 |                                                |
| dark fg                    | #9193a1 |                                                |
| base fg                    | #acafbf | main editor text                               |
| light fg                   | #bfc3d4 |                                                |
| bright fg                  | #d1d5eb | highlight text                                 |
|                            |         |                                                |
| very dark highlight        | #2b3947 | inactive selections                            |
| dark highlight             | #324454 | active selections                              |
| highlight                  | #0d70b9 | buttons, badges, tab highlight, resize borders |
| slightly lighter highlight | #0a77c5 | button hover                                   |
|                            |         |                                                |
| match background           | #1c1e24 | currently selected match                       |
| match highlight            | #60393c | other matches                                  |

* Use subtle borders darker than the inner area usually "#00000040".
* Hover is slightly lighter, focused slightly lighter than that.

If possible and it looks good, try to use colors from code section for yellows, greens etc.
However below are some other darker and brighter colors used:

| name          | 100%    | 87.5%   | 75%     | 62.5%   | 50%     | 37.5%   | 25%     | 12.5%   | 7.5%    |
| ------------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| bright blue   | #0a77c5 | #0d70b9 | #1069ad | #1361a0 | #155891 | #174f80 | #18436c | #1a3552 | #1b2d44 |
| bright red    | #ee5c5c | #e05757 | #d15152 | #c04c4c | #ae4546 | #993e40 | #803638 | #5f2c2f | #4c272b |
| bright green  | #50e080 | #4bd278 | #47c471 | #42b569 | #3ca45f | #369055 | #2f7949 | #275a3a | #234932 |
| bright yellow | #fdbc4b | #eeb147 | #dea543 | #cc983f | #b98a3b | #a27a36 | #886631 | #644d2b | #513f28 |

[Color Highlight]: https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight