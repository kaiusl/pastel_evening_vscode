
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
| keywords           | #faa2a0 | #ca8483 |                                                           |
| function like      | #83cafb | #6ba4cc | functions, macros, enum members(may be language specific) |
| types              | #8edca9 | #74b28a | including primitive types like `str`, `int`               |
| traits/interfaces  | #efc785 | #c2a16d |                                                           |
| attributes         | #efc785 | #c2a16d | derives, decorators, annotations                          |
| namespaces/modules | #a6aebe | #878d9b |                                                           |
| operators          | #a6aebe | #878d9b |                                                           |
| local variables    | #a6aebe | #878d9b |                                                           |
| special variables  | #d3dbec | #abb2c0 | parameters, constants, struct/class members               |
| strings            | #e0b490 | #b59276 | includes prefixes and suffixes                            |
| string escapes     | #f9a988 | #ca8970 | \n \u123, template delimiters and format specifiers       |
| numbers            | #e0b490 | #b59276 | includes prefixes and suffixes                            |
| labels             | #f9a988 | #ca8970 | label names, lifetimes in rust                            |
| comments           | #7c8393 | #656b78 |                                                           |
| code in comments   |         |         | same color as the actual code but muted variant           |

Muted variant is 62.5% value in muted colors table below.

### Config files (TOML, JSON etc)

| scope                    | color   | description                                                 |
| ------------------------ | ------- | ----------------------------------------------------------- |
| keys                     | #d3dbec | white as they are like properties/fields                    |
| keyword like values      | #faa2a0 | true false                                                  |
| other values             | #e0b490 | strings, numbers, plain text which semantically is a string |
| headings, section labels | #8edca9 | XML tags, TOML, INI array headings                          |

### Markdown, text files

| scope    | color   | description |
| -------- | ------- | ----------- |
| text     | #a6aebe |             |
| headings | #8edca9 |             |

## Muted colors table

Table where each color is applied over dark background color #1d1f27.
Note that these are gamma corrected (with gamma = 2.2) and do not match the opacity values used directly in VS Code. 
Advantage of this is that the colors seem to retain a bit more saturation.

Main uses:
* 100% - main code, terminal bright colors
* 62.5% - muted code (in docs), terminal colors
* 12.5%, 7.5%, 5.0% - backgrounds (diff, find matches)

| name         | 100%    | 87.5%   | 75%     | 62.5%   | 50%     | 37.5%   | 25%     | 12.5%   | 7.5%    | 5%      |
| ------------ | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| red          | #faa2a0 | #eb9997 | #dc8f8d | #ca8483 | #b77877 | #a16a6a | #87595a | #644446 | #51393c | #453236 |
| purple       | #f9b0e1 | #eaa6d4 | #db9bc6 | #ca8fb7 | #b682a6 | #a07392 | #86607b | #63495d | #503c4d | #443543 |
| purple2      | #c6b4fb | #bbaaec | #ae9edd | #a192cc | #9185b9 | #8075a3 | #6c6389 | #504a67 | #423e54 | #393649 |
| blue         | #83cafb | #7cbeec | #74b2dd | #6ba4cc | #6194b9 | #5683a3 | #496e89 | #385267 | #304454 | #2b3a49 |
| cyan         | #6bd8dc | #65cbcf | #5fbec2 | #58afb3 | #509fa2 | #478c8f | #3d7579 | #30585b | #2a484c | #263e42 |
| green        | #8edca9 | #86cf9f | #7dc195 | #74b28a | #69a27e | #5d8e6f | #4f775f | #3c5949 | #33493e | #2d3e38 |
| yellow       | #efc785 | #e1bb7e | #d2af76 | #c2a16d | #af9264 | #9a8159 | #816c4d | #60513e | #4d4336 | #423a32 |
| light orange | #e0b490 | #d3aa88 | #c59e7f | #b59276 | #a4856c | #917560 | #796352 | #5a4a41 | #493e38 | #3f3633 |
| orange       | #f9a988 | #ea9f81 | #db9578 | #ca8970 | #b67d66 | #a06e5b | #865d4e | #63463f | #503b37 | #443332 |
| white        | #d3dbec | #c7cede | #b9c1d0 | #abb2c0 | #9ba1ae | #888e99 | #727781 | #555961 | #454850 | #3c3e46 |
| base         | #a6aebe | #9ca4b3 | #9299a7 | #878d9b | #7a808d | #6c717c | #5b5f69 | #454851 | #393c44 | #32343c |
| gray         | #7c8393 | #757c8b | #6d7482 | #656b78 | #5c616e | #525662 | #464a54 | #363942 | #2e3139 | #292c34 |
| black        | #000000 | #0b0c0f | #0f1115 | #131419 | #15171c | #17191f | #191b22 | #1b1d25 | #1c1e26 | #1c1e26 |


## Diff

* Added   - BG: #2d3e38, Highlight: #385144
* Removed - BG: #453236, Highlight: #5b3f42
* Changed - BG: #2b3a49, Highlight: #344b5e
* Else    - BG: #423a32, Highlight: #574a3a

## UI

| scope                      | color   | description                                    |
| -------------------------- | ------- | ---------------------------------------------- |
| very dark bg               | #1d1f27 | inputs, title bar                              |
| dark bg                    | #24262e | side bar, panels                               |
| base bg                    | #2b2d36 | main editor                                    |
| light bg                   | #33353d | hover                                          |
| bright bg                  | #3b3d45 | active selected tab                            |
|                            |         |                                                |
| very dark fg               | #7c8393 |                                                |
| dark fg                    | #9198a8 |                                                |
| base fg                    | #a6aebe | main editor text                               |
| light fg                   | #bcc4d5 |                                                |
| bright fg                  | #d3dbec | highlight text                                 |
|                            |         |                                                |
| dark highlight             | #6ca1c5 | active selections                              |
| highlight                  | #83cafb | buttons, badges, tab highlight, resize borders |
|                            |         |                                                |
| match background           | #1d1f27 | currently selected match                       |
| match highlight            | #5b3f42 | other matches                                  |

* Use subtle borders darker than the inner area usually #1d1f2740.
* Hover is slightly lighter, focused slightly lighter than that.

If possible and it looks good, try to use colors from code section for yellows, greens etc.
However below are some other darker and brighter colors used:

| name          | 100%    | 87.5%   | 75%     | 62.5%   | 50%     | 37.5%   | 25%     | 12.5%   | 7.5%    | 5%      |
| ------------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| bright red    | #fe7577 | #ef6e71 | #df676a | #ce6062 | #ba575a | #a44e51 | #894346 | #653539 | #522d33 | #46292f |
| bright blue   | #49b8fe | #45adef | #41a2df | #3d95ce | #3887bb | #3378a5 | #2d658a | #264c68 | #233f55 | #21374a |
| bright green  | #1ceb96 | #1cdd8e | #1ccf85 | #1cbe7b | #1dac70 | #1d9864 | #1d7f55 | #1d5f43 | #1d4d3a | #1d4234 |
| bright yellow | #fec257 | #efb753 | #dfab4e | #ce9d49 | #ba8f44 | #a47e3e | #896a38 | #654f30 | #52412d | #46392b |


[Color Highlight]: https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight
