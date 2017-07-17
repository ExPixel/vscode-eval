//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as assert from 'assert';
import { evalSelections } from '../src/eval-selections';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("Evaluating Single Expression", async () => {
        const content = '12 + 30';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '42', 'Expected document text to be 42');
    });

});