/**
 * Script that builds and writes the theme files into dist folder.
 */

import fs from 'fs';
import { buildColorSchemeMd } from '../theme_builder/color_scheme_md';
import { DIST_DIR, DIST_MDSTYLE_CSS_CONST_THEMED_PATH, DIST_MDSTYLE_CSS_CONTRIB_PATH, DIST_MDSTYLE_CSS_THEMED_PATH, DIST_MDSTYLE_DIR, DIST_THEMES_DIR } from '../common_defs';
import { buildMdstyleCss, buildMdstyleCssSingle } from '../theme_builder/mdstyle';
import { buildThemeJson, createAllConstThemes, createDarkTheme } from '../theme_builder/theme';
import { DEF_THEME_CONFIG } from '../config';

for (const dir of [DIST_DIR, DIST_THEMES_DIR, DIST_MDSTYLE_DIR]) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

const theme = createDarkTheme(DEF_THEME_CONFIG);
const themes = createAllConstThemes();
for (const t of [...themes, theme]) {
    const json = buildThemeJson(t);
    fs.writeFile(t.themeDistPath, json, (err) => {
        if (err) throw err;
    });

    fs.writeFile('./ColorScheme_' + t.fileName + '.md', buildColorSchemeMd(t), (err) => {
        if (err) throw err;
    });
}

const const_css = buildMdstyleCss(themes)
fs.writeFile(DIST_MDSTYLE_CSS_CONST_THEMED_PATH, const_css, (err) => {
    if (err) throw err;
});

const css = const_css + "\n" + buildMdstyleCssSingle(theme);

fs.writeFile(DIST_MDSTYLE_CSS_THEMED_PATH, css, (err) => {
    if (err) throw err;
});
fs.writeFile(DIST_MDSTYLE_CSS_CONTRIB_PATH, css, (err) => {
    if (err) throw err;
});

