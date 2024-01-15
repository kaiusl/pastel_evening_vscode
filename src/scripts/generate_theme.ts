/**
 * Script that builds and writes the theme files into dist folder.
 */

import fs from 'fs';
import { buildColorSchemeMd } from '../theme_builder/color_scheme_md';
import { DIST_DIR, DIST_MDSTYLE_DIR, DIST_THEMES_DIR } from '../common_defs';
import { buildMdstyleCss } from '../theme_builder/mdstyle';
import { createDarkTheme, buildThemeJson } from '../theme_builder/theme';
import { defaultConfig } from '../config';

for (const dir of [DIST_DIR, DIST_THEMES_DIR, DIST_MDSTYLE_DIR]) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

const cfg = defaultConfig()
const theme = createDarkTheme(cfg)
const json = buildThemeJson(theme);
fs.writeFile(theme.themeDistPath, json, (err) => {
    if (err) throw err;
});

const css = buildMdstyleCss(theme)
fs.writeFile(theme.mdstyleDistPath, css, (err) => {
    if (err) throw err;
});
fs.writeFile(theme.mdstyleContribPath, css, (err) => {
    if (err) throw err;
});

fs.writeFile('./ColorScheme_' + theme.fileName + '.md', buildColorSchemeMd(theme), (err) => {
    if (err) throw err;
});


