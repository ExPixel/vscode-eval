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

    test("hex", async () => {
        const content = 'hex(255)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), 'ff', 'Expected document text to be FF');
    });

    test("bin", async () => {
        const content = 'bin(1234)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '10011010010', 'Expected document text to be 10011010010');
    });

    test("oct", async () => {
        const content = 'oct(1234)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '2322', 'Expected document text to be 2322');
    });

    test("dec2hex", async () => {
        const content = 'dec2hex(255)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), 'ff', 'Expected document text to be FF');
    });

    test("dec2bin", async () => {
        const content = 'dec2bin(1234)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '10011010010', 'Expected document text to be 10011010010');
    });

    test("dec2oct", async () => {
        const content = 'dec2oct(1234)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '2322', 'Expected document text to be 2322');
    });

    test("hex2dec", async () => {
        const content = 'hex2dec("4d2")';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '1234', 'Expected document text to be 255');
    });

    test("hex2bin", async () => {
        const content = 'hex2bin("4d2")';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '10011010010', 'Expected document text to be 255');
    });

    test("hex2oct", async () => {
        const content = 'hex2oct("4d2")';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '2322', 'Expected document text to be 255');
    });

    test("oct2dec", async () => {
        const content = 'oct2dec(2322)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '1234', 'Expected document text to be 255');
    });

    test("oct2bin", async () => {
        const content = 'oct2bin(2322)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '10011010010', 'Expected document text to be 255');
    });

    test("oct2hex", async () => {
        const content = 'oct2hex(2322)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '4d2', 'Expected document text to be 255');
    });

    test("bin2dec", async () => {
        const content = 'bin2dec(10011010010)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '1234', 'Expected document text to be 1234');
    });

    test("bin2oct", async () => {
        const content = 'bin2oct(10011010010)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '2322', 'Expected document text to be 2322');
    });

    test("bin2hex", async () => {
        const content = 'bin2hex(10011010010)';
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content
        });
        await vscode.window.showTextDocument(document);
        const selection = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
        const editResult = await evalSelections(vscode.window.activeTextEditor, [selection]);
        assert.equal(document.getText(), '4d2', 'Expected document text to be 4d2');
    });

});
