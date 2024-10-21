# Changelog

All notable changes to the "Pastel Evening Theme" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added

* A new theme variant `Pastel Evening Dark #2` which is a mix of orange/yellow shades with a bit of blue for functions.
  
  The main use case for this is web version of VSCode which doesn't support theme customization.

  It's also worth pointing out that none of the customizations apply to this theme variant.
  Customizations only apply to the main variant `Pastel Evening Dark`.
  You can use new `pastelEveningTheme.colorOverrides.baseScheme` option to choose which variant you want as a base theme.

* A new config option `pastelEveningTheme.colorOverrides.baseScheme` which allows to select base theme variant for customization.

* Two new customizable colors: `lime green` and `faint yellow`. 

### Changed

* Fully updated colors to have more uniform perceived lightness across the spectrum.
  
    Overall the look is a bit more pastel and less vibrant than before.

    It you want to revert to the previous style, add following to your VSCode's `settings.json`:
    ```json
    "pastelEveningTheme.colorOverrides.common": {
        "red": "#f28585",
        "pink": "#e086e0",
        "purple": "#b385e0",
        "blue": "#6dbaf2",
        "cyan": "#74dada",
        "green": "#69edab",
        "yellow": "#eddd9a",
        "light orange": "#e6b583",
        "orange": "#df9355",
    }
    ```

* Accent color is now a base blue (#80cafe) with a dark foreground (#1d1f27). 

    This fits much more with pastel style than the previous darker blue.

    It you want to revert to the previous style, add following to your VSCode's `settings.json`:
    ```json
    "pastelEveningTheme.colorOverrides.ui": {
        "accent background": "#0d70b9",
        "accent foreground": "#e3e7ff"
    }
    ```

* Diff gutter colors are slightly darker.

## [0.4.3] - 2024-02-09

### Added

* Accept common color names (`background0`, `foreground4`, `blue`, `yellow` etc) as values for token, UI and editor color overrides. Settings UI includes the descriptions on what exactly is accepted.

  This allows to simplify color overrides by possibly deduplicating raw color strings. 

### Changed

* Slight adjustment for GitLens gutter file blame colors.

## [0.4.2] - 2024-02-02

### Added

* Add theme colors for couple of extensions.
  * GitLens
  * Error Lens
  * GitHub Pull Requests and Issues
  
  Each of them can be turned off from the settings.
* Add themed `gitDecoration` colors.

### Fixed

* `symbolIcon` colors (icon colors in outline, breadcrumbs and suggest widgets) not respecting overridden token colors.

## [0.4.1] - 2024-02-01

### Added

* Support for untrusted workspaces. The configuration values from the untrusted workspaces are not 
  used.
* Check that extension works in virtual workspaces.
* Default values to the color overrides descriptions.

### Fixed

* Removed unnecessary `machine` scope from `exportMarkdownPreviewStyle` option. 
* Removed unnecessary theme updates when VSCode calls `onDidChangeConfiguration` but configuration 
  didn't actually change for our purposes.
* Removed unnecessary reload warning messages after configuration change that didn't require theme 
  update.

## [0.4.0] - 2024-01-26

### Fixed

* Some inconsistencies in operator and punctuation coloring.
* Inconsistencies between selection colors in editor and UI.

### Added

* Configuration options to modify the theme to users liking. Options include:
  * Toggle italic font on static variables and functions
  * Toggle underlines on mutable variables
  * Toggle custom markdown preview style
  * Change base colors
  * Change some UI, editor and token colors

### Changed

* Extension is now a full fledged VSCode extension which allow to generate theme on the fly based on
  the configuration.
* Small color changes because the theme and colors are now generated from a smaller set of colors.

## [0.3.1] - 2024-01-12

### Fixed

* Make selection colors transparent in order to not to hide underlying decorations ([#1]).
* Find new color (#eddd9a30) for hover, word and other editor highlights that previously used the 
  same color as selection ([#1]).
* Add "editorIndentGuide.activeBackground1", "editorIndentGuide.background1" colors to replace 
  deprecated "editorIndentGuide.activeBackground", "editorIndentGuide.background".

## [0.3.0] - 2023-02-06

### Added

* Stylesheet for markdown preview for highlighting code blocks.

### Changed

* Very small color adjustments. Probably not even noticeable.

## [0.2.0] - 2023-01-28

### Added

* Defined muted code colors in [ColorScheme.md]

### Changed

* Slight color adjustments
  * UI background colors and blue highlights
  * Diff backgrounds
  * Find match backgrounds
  * Code in comments
  * Terminal uses same colors as code highlighting
* Markup and LaTeX heading colors decrease in brightness for every sublevel

### Fixed

* CSS: Invalid bracket color in function calls
* C++: Invalid bracket color in attributes
* LaTeX: Headings not being colored green

## [0.1.1] - 2023-01-25

### Fixed

* Broken links to .md files in Marketplace.
* Inconsistent input background colors in the settings.

## [0.1.0] - 2023-01-23

- Initial release

[Unreleased]: https://github.com/kaiusl/pastel_evening_vscode/compare/v0.4.3...HEAD
[0.4.3]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.4.3
[0.4.2]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.4.2
[0.4.1]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.4.1
[0.4.0]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.4.0
[0.3.1]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.3.1
[0.3.0]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.3.0
[0.2.0]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.2.0
[0.1.1]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.1.1
[0.1.0]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.1.0

[ColorScheme.md]: https://github.com/kaiusl/pastel_evening_vscode/blob/main/ColorScheme.md

[#1]: https://github.com/kaiusl/pastel_evening_vscode/issues/1
