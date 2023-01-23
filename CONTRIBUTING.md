# Contributing

First of all welcome and thank you for being interested in this project. Every contribution is welcome. Below are few informal guidelines for contributing.

## Filing an issue

Please check the existing issues/PRs for similar issues before adding new one. Also make sure you are using the latest version of the theme. When filing an issue please fill out the information requested by the template. It will help us resolve the issue as fast as possible. When your issue doesn't really fit under the provided templates try to give as much relevant information as you can think of.

## PRs

All from above also applies here but there are few basic stylistic and structural choices I'd like to keep with new additions. 

### Modifying the theme

* Fork this repo and open it with VS Code.
* What's in the folder
  * This folder contains all of the files necessary for your color theme extension.
  * `package.json` - this is the manifest file that defines the location of the theme file and specifies the base theme of the theme.
  * `themes/pastel_evening_dark.json` - the color theme definition file.
* Get up and running straight away
  * Press `F5` to open a new window with the extension loaded.
  * Open `File > Preferences > Color Themes` and pick the color theme.
  * Open a file that has a language associated. The languages' configured grammar will tokenize the text and assign 'scopes' to the tokens. To examine these scopes, invoke the `Developer: Inspect Editor Tokens and Scopes` command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
* Make changes
  * Changes to the theme file are automatically applied to the Extension Development Host window.
* When happy and guidelines below are met, commit the changes and open a PR to this repository. Please include a before and after screenshot with the PR.

### Guidelines

* [ColorScheme.md] file outlines the overall color scheme and theme style which should be kept.
* In the UI section we have listed all possible options, while the ones not currently set are commented out. 
For more detailed description of what each rule does see [here](https://code.visualstudio.com/api/references/theme-color).
* In the code token section the scopes are grouped by their semantic meaning, for example "Strings", "Function like" etc. 
If the addition fits under one of those groups, use it. 
This way we can quickly adjust the color of specific elements, if the need should arise.
* Code examples that have been used to test this theme can be found in [Code Syntax Examples] repository. All contributions to the examples are also welcome.
* When adding a new scopes, also add a short comment like existing rules have. 
* A new scope should have a language specifier included in the scope unless it is general scope that should apply to all languages. Most of the general scopes should already be listed and thus it is likely that a new scope should be language specific. However when adding or changing a general scope, make sure to compare the changes with multiple languages using the examples from [Code Syntax Examples] repo.
* When adding a new scope for semantic highlighting, prefer finding a textMate scope that the semantic scope maps to and add that scope, if possible. This way that scope is grouped together under the same rule as other similar scopes and it will be easy to change it's color later.
* When changing highlighting for language which has very similar languages (like Javascript and Typescript) add the rule for all of them for consistency.
* Check that the change works with semantic highlighting as well as without it. 

    > Note the for C/C++ extension the semantic highlighting is turned on and off under the extension setting `C_Cpp.enhancedColorization` and the theme value has no effect.
    
    > Go's semantic highlighting is turned off by default. Add `"gopls": { "ui.semanticTokens": true}` to the `settings.json` to turn it on.

I think that is all. Thank you for reading and I hope to see you in the Issues or PR sections.


[ColorScheme.md]: ColorScheme.md
[Code Syntax Examples]: https://github.com/kaiusl/code_syntax_examples

