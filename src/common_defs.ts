/**
 * Common simple definitions used throughout the extension such that they are all defined in one place.
 */

import path from "path"


/** The root directory of the extension where all distributed files will be generated. */
export const DIST_DIR = "dist"
/** The root directory of the mdstyle .css files. */
export const DIST_MDSTYLE_DIR = path.join(DIST_DIR, "mdstyle")
export const DIST_MDSTYLE_CSS_CONTRIB_PATH = path.join(DIST_MDSTYLE_DIR, "pastel_evening.css")
export const DIST_MDSTYLE_CSS_THEMED_PATH = path.join(DIST_MDSTYLE_DIR, "pastel_evening_themed.css")
export const DIST_MDSTYLE_CSS_CONST_THEMED_PATH = path.join(DIST_MDSTYLE_DIR, "pastel_evening_const_themed.css")
/** The root directory of the themes .json files. */
export const DIST_THEMES_DIR = path.join(DIST_DIR, "themes")
/** The root directory of the source files for the extension. */
export const DIST_SRC_DIR = path.join(DIST_DIR, "src")