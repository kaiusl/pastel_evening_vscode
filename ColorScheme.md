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
| keywords           | #f28585 | #c46d6d |                                                           |
| function like      | #6dbaf2 | #5997c4 | functions, macros, enum members(may be language specific) |
| types              | #69edab | #56c08b | including primitive types like `str`, `int`               |
| traits/interfaces  | #eddd9a | #c0b37e |                                                           |
| attributes         | #eddd9a | #c0b37e | derives, decorators, annotations                          |
| namespaces/modules | #acafbf | #8c8e9b |                                                           |
| operators          | #acafbf | #8c8e9b |                                                           |
| local variables    | #acafbf | #8c8e9b |                                                           |
| special variables  | #d1d5eb | #a9adbf | parameters, constants, struct/class members               |
| strings            | #e6b583 | #ba936b | includes prefixes and suffixes                            |
| string escapes     | #df9355 | #b57847 | \n \u123, template delimiters and format specifiers       |
| numbers            | #e6b583 | #ba936b | includes prefixes and suffixes                            |
| labels             | #df9355 | #b57847 | label names, lifetimes in rust                            |
| comments           | #737580 | #5e6069 |                                                           |
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

| name         | 100%    | 87.5%   | 75%     | 62.5%   | 50%     | 37.5%   | 25%     | 12.5%   | 7.5%    | 5%      |
| ------------ | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| red          | #f28585 | #e47d7e | #d57576 | #c46d6d | #b16364 | #9c5859 | #834b4c | #613a3c | #4e3134 | #432c2f |
| purple       | #e086e0 | #d37ed3 | #c576c5 | #b56db6 | #a464a5 | #915891 | #794b7a | #5a3a5c | #49324c | #3f2c42 |
| blue         | #6dbaf2 | #67afe4 | #60a4d5 | #5997c4 | #5189b2 | #49799d | #3e6683 | #314d62 | #2a3f51 | #273746 |
| cyan         | #74dada | #6ecdcd | #67c0c0 | #5fb1b1 | #56a0a0 | #4d8d8e | #427677 | #33585a | #2c484a | #283e40 |
| green        | #69edab | #63dfa1 | #5dd097 | #56c08b | #4fae7f | #469970 | #3c805f | #305f49 | #294e3d | #264237 |
| yellow       | #eddd9a | #dfd091 | #d0c288 | #c0b37e | #aea272 | #998f66 | #807856 | #5f5943 | #4d4939 | #423f33 |
| light orange | #e6b583 | #d9ab7c | #ca9f74 | #ba936b | #a98562 | #947657 | #7c634b | #5c4b3b | #4b3e34 | #40362f |
| orange       | #df9355 | #d28b51 | #c4824c | #b57847 | #a46d42 | #90603c | #795236 | #5a3f2e | #49352a | #3e2f28 |
| white        | #d1d5eb | #c5c9dd | #b8bbcf | #a9adbf | #999cad | #878a98 | #717480 | #545660 | #45474f | #3b3d44 |
| base         | #acafbf | #a2a5b4 | #979aa8 | #8c8e9b | #7f818d | #70727d | #5e6069 | #474950 | #3b3c43 | #33353b |
| gray         | #737580 | #6d6e79 | #666771 | #5e6069 | #565760 | #4c4e56 | #41434a | #33353b | #2c2d33 | #28292f |
| black        | #000000 | #0b0c0e | #0f1113 | #131417 | #15171a | #17191d | #191b20 | #1b1d22 | #1c1e23 | #1c1e23 |


## Diff

* Added   - BG: #264237, Highlight: #305f49
* Removed - BG: #432c2f, Highlight: #613a3c
* Changed - BG: #273746, Highlight: #314d62
* Else    - BG: #423f33, Highlight: #5f5943

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
| highlight                  | #0e70ba | buttons, badges, tab highlight, resize borders |
| slightly lighter highlight | #0a77c5 | button hover                                   |
|                            |         |                                                |
| match background           | #1d1f24 | currently selected match                       |
| match highlight            | #613a3c | other matches                                  |

* Use subtle borders darker than the inner area usually #00000040.
* Hover is slightly lighter, focused slightly lighter than that.

If possible and it looks good, try to use colors from code section for yellows, greens etc.
However below are some other darker and brighter colors used:

| name          | 100%    | 87.5%   | 75%     | 62.5%   | 50%     | 37.5%   | 25%     | 12.5%   | 7.5%    | 5%      |
| ------------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| bright red    | #ee5c5c | #e05757 | #d15252 | #c14c4d | #ae4647 | #9a3f40 | #803739 | #5f2d30 | #4d282b | #422529 |
| bright blue   | #0a77c5 | #0e70ba | #1169ad | #1461a0 | #165991 | #184f80 | #1a446c | #1b3552 | #1c2e44 | #1c2a3c |
| bright green  | #50e080 | #4cd379 | #47c571 | #42b669 | #3da460 | #379156 | #30794a | #285b3b | #244a33 | #223f2f |
| bright yellow | #fdbc4b | #eeb147 | #dea544 | #cd9940 | #b98a3b | #a37a37 | #886731 | #654d2b | #524029 | #453727 |


[Color Highlight]: https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight
