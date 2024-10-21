/**
 * Script that builds and writes the theme files into dist folder.
 */

import fs from 'fs';
import { buildColorSchemeMd } from '../theme_builder/color_scheme_md';
import { DIST_DIR, DIST_MDSTYLE_CSS_CONTRIB_PATH, DIST_MDSTYLE_CSS_THEMED_PATH, DIST_MDSTYLE_DIR, DIST_THEMES_DIR } from '../common_defs';
import { buildMdstyleCss } from '../theme_builder/mdstyle';
import { buildThemeJson, createAllThemes } from '../theme_builder/theme';
import { defaultConfig } from '../config';


for (const dir of [DIST_DIR, DIST_THEMES_DIR, DIST_MDSTYLE_DIR]) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

const cfg = defaultConfig();
const themes = createAllThemes(cfg);
for (const theme of themes) {
    const json = buildThemeJson(theme);
    fs.writeFile(theme.themeDistPath, json, (err) => {
        if (err) throw err;
    });

    fs.writeFile('./ColorScheme_' + theme.fileName + '.md', buildColorSchemeMd(theme), (err) => {
        if (err) throw err;
    });
}

const css = buildMdstyleCss(themes)
fs.writeFile(DIST_MDSTYLE_CSS_THEMED_PATH, css, (err) => {
    if (err) throw err;
});
fs.writeFile(DIST_MDSTYLE_CSS_CONTRIB_PATH, css, (err) => {
    if (err) throw err;
});

