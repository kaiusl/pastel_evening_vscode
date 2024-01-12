# Change Log

All notable changes to the "Pastel Evening Theme" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Fixed

* Make selection colors transparent in order to not to hide underlying decorations ([#1]).
* Find new color (#eddd9a30) for hover, word and other editor highlights that previously used the same color as selection ([#1]).
* Add "editorIndentGuide.activeBackground1", "editorIndentGuide.background1" colors to replace deprecated "editorIndentGuide.activeBackground", "editorIndentGuide.background".

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

[Unreleased]: https://github.com/kaiusl/pastel_evening_vscode/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.3.0
[0.2.0]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.2.0
[0.1.1]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.1.1
[0.1.0]: https://github.com/kaiusl/pastel_evening_vscode/releases/tag/v0.1.0

[ColorScheme.md]: https://github.com/kaiusl/pastel_evening_vscode/blob/main/ColorScheme.md

[#1]: https://github.com/kaiusl/pastel_evening_vscode/issues/1
