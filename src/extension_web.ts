/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * VS Code extension entry point.
 */

import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.onDidChangeConfiguration(onCfgChange)
}

function onCfgChange(event: vscode.ConfigurationChangeEvent) {
    void vscode.window.showWarningMessage("Theme customization is not supported in web environment.")
}