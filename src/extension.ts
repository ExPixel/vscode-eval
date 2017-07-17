'use strict';
import * as vscode from 'vscode';
import { evalAllSelections } from './eval-selections';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('eval.evalSelections', () => {
        evalAllSelections();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}