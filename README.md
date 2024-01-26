# Pastel Evening Theme <img src="icon.png" width="32">

Dark theme with pastel colors and a slight blue hint to the editor.

![](resources/example_rust.png)

## Color scheme

This theme aims to use relatively few different colors but still clearly distinguish different elements in the code. 
The comments are purposefully muted to emphasize the actual code. 
Short summary about colors and their meaning is below.

| Color                                   | Tokens                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| ![](resources/cf28585.png) Red          | Keywords                                                                         |
| ![](resources/c69edab.png) Green        | Types                                                                            |
| ![](resources/c6dbaf2.png) Blue         | Functions                                                                        |
| ![](resources/ceddd9a.png) Yellow       | Interfaces and annotations                                                       |
| ![](resources/ce6b583.png) Light Orange | Strings and numbers                                                              |
| ![](resources/cdf9355.png) Orange       | Labels, lifetimes, escape sequences in strings                                   |
| ![](resources/c737580.png) Dark gray    | Comments                                                                         |
| ![](resources/cacafbf.png) Light gray   | Main text, local variables, namespaces, modules, operators, punctuation          |
| ![](resources/cd1d5eb.png) White        | Constant and static variables, function parameters, member fields and properties |

Additionally static variables and methods are in *italic* (where possible). 
Mutable variables are underlined in languages where mutable variables are special, like Rust and Kotlin. 
See [ColorScheme.md] for more details about the color scheme.

It is recommended to use this theme with semantic highlighting. 
It will work without it as well, but may miss some colors.

Style related editor settings used to develop this theme are
```json
"editor.fontFamily": "'JetBrains Mono'",
"editor.fontSize": 13,
"editor.inlayHints.fontSize": 10,
"editor.fontWeight": 600,
"editor.fontLigatures": true,
"workbench.iconTheme": "material-icon-theme",
```
It's worth noting that Linux's and Windows' font rendering is different, I have found that on Linux `fontWeight=600` is about the same look as `fontWeight=425` on Windows using `JetBrains Mono` font. 
With same `fontWeight` the theme looks quite a bit brighter on Windows than on Linux.
Thus if the colors seem a bit too bright you can slightly lower the fontWeight and other way around too.

## Configuration

This theme includes various configuration options to easily customize the theme to your liking. Check out the extension settings in VSCode itself, they should be relatively self-explanatory.

## Tested languages

The theme has been tested with various languages, mainly against the examples from [Code Syntax Examples] repo but with some other projects as well.

* C++, C#, F#, Go, Haskell, Java, Javascript (.js, .jsx), Typescript (.ts, .tsx), CSS, HTML, Kotlin, Python, Ruby, Rust, Dart[^1], Elm[^1], PHP[^1], Scala[^1]
* Markup and text
    * LaTeX, Markdown, AsciiDoc
* Misc
    * HCL, INI, JSON, RON, TOML, XML, YAML, Pest, Cabal, 

[^1]: Have been tested with very short snippet.

## Contributions

All suggestions, requests or improvements are very welcome. 
Submit an [issue] or [pull request] and we'll see what can be done.
Check out [CONTRIBUTING.md] for more information.

## Inspiration

This theme's code style is inspired by [Panda Syntax]'s and [Gatito Theme]'s pastel colors. 
Editor's UI style is inspired by [Lapce] editor's default dark theme.

## License

[MIT](LICENSE.md)

[Code Syntax Examples]: https://github.com/kaiusl/code_syntax_examples
[repository]: https://github.com/kaiusl/pastel_evening_vscode
[pull request]: https://github.com/kaiusl/pastel_evening_vscode/pulls
[issue]: https://github.com/kaiusl/pastel_evening_vscode/issues
[Marketplace]: https://marketplace.visualstudio.com/items?itemName=kaiusl.paste-evening-theme
[Panda Syntax]: https://marketplace.visualstudio.com/items?itemName=tinkertrain.theme-panda
[Gatito Theme]: https://marketplace.visualstudio.com/items?itemName=pawelgrzybek.gatito-theme
[Lapce]: https://lapce.dev/
[ColorScheme.md]: https://github.com/kaiusl/pastel_evening_vscode/blob/main/ColorScheme.md
[CONTRIBUTING.md]: https://github.com/kaiusl/pastel_evening_vscode/blob/main/CONTRIBUTING.md
