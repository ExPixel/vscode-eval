'use strict';

import {window, TextEditor, TextEditorEdit, Selection, Range, workspace} from 'vscode';
import * as vm from 'vm';
import evalDefaults from './eval-defaults';

interface ErrorLine {
    filename: string,
    fn: string | null,
    line: number,
    column: number
}

const errorLocRegexFile = /at\s+([^:]+):(\d+):(\d+)/;
const errorLocRegexFunction = /at\s+([^\s]+)\s+\(([^:]+):(\d+):(\d+)\)/;

function getErrorLineInfo(stackLine: string) : ErrorLine | null {
    if (stackLine.indexOf('(') >= 0) {
        errorLocRegexFunction.lastIndex = 0;
        const matches = errorLocRegexFunction.exec(stackLine);
        if (matches) {
            return {
                fn: matches[1],
                filename: matches[2],
                line: parseInt(matches[3]),
                column: parseInt(matches[4])
            };
        }
    } else {
        errorLocRegexFile.lastIndex = 0;
        const matches = errorLocRegexFile.exec(stackLine);
        if (matches) {
            return {
                filename: matches[1],
                line: parseInt(matches[2]),
                column: parseInt(matches[3]),
                fn: null
            };
        }
    }
    return null;
}

function getFirstStackError(stack: string) : ErrorLine | null {
    const firstErrorLineStart = stack.indexOf('\n');
    if (firstErrorLineStart >= 0) {
        let firstErrorLineEnd = stack.indexOf('\n', firstErrorLineStart + 1);
        if (firstErrorLineEnd < 0) { firstErrorLineEnd = stack.length; }
        const firstErrorLine = stack.substring(firstErrorLineStart + 1, firstErrorLineEnd);
        return getErrorLineInfo(firstErrorLine);
    }
    return null;
}

function countOccurrences(text: string, needle: string): number {
    if (text.length < 1 || needle.length < 1) return 0;

    let count = -1, pos = 0;
    do {
        count++;
        pos = text.indexOf(needle, pos) + 1;
    } while(pos > 0);
    return count;
}

export interface LineMapping {
    /**
     * The offset of the line in the current source.
     */
    offset: number,

    /**
     * The number of lines to map.
     */
    count: number,

    /**
     * The offset of the line in the original source.
     */
    orignalOffset: number
}

export function evalSelections(editor: TextEditor, selections: Range[]) : Thenable<boolean> {
    const context = Object.assign({
        '$results': new Array(selections.length)
    }, evalDefaults);
    
    let fsource = '';

    const lineMap = new Array<LineMapping>();
    
    for (let idx = 0, line = 0; idx < selections.length; idx++) {
        const sel = selections[idx];
        const selectionSource = editor.document.getText(sel);
        if (selectionSource.trim().length > 0) {
            fsource += `$prev = $localResults[${idx}] = (${selectionSource});\n`;
        }
        
        const lineCount = countOccurrences(selectionSource, '\n') + 1;
        lineMap.push({
            offset: line + 1, // make it 1-indexed
            count: lineCount,
            orignalOffset: sel.start.line
        });
        line += lineCount;
    };

    const source = `$results = (() => { const $localResults = []; let $prev = ''; ${fsource}; return $localResults; })();`;

    vm.createContext(context);

    try {
        vm.runInContext(source, context, {
            filename: editor.document.fileName,
            displayErrors: false,
            timeout: 1000
        });
    } catch(e) {
        const message = e['message'] || 'Unknown error.';
        const errorLoc = typeof e['stack'] === 'string' ? getFirstStackError(e['stack']) : null;

        let locationFile = editor.document.fileName, locationLine = -1;

        if (errorLoc) {
            const {filename, line} = errorLoc;
            if (filename === editor.document.fileName) {
                locationFile = filename;
                for(let mapping of lineMap) {
                    if (line >= mapping.offset && line < mapping.offset + mapping.count) {
                        locationLine = line - mapping.offset + mapping.orignalOffset + 1;
                        break;
                    }
                }
            }
        }

        window.showErrorMessage(`[Eval Error | ${locationFile}${locationLine == -1 ? '' : ':' + locationLine}] ${message}`);
    }

    const results = context['$results'];
    return editor.edit((editorEdit) => {
        for (let idx = 0; idx < selections.length; idx++) {
            const replacement = results[idx];
            if (replacement !== undefined) {
                if (typeof replacement === 'object') {
                    editorEdit.replace(selections[idx], '' + JSON.stringify(replacement));
                } else {
                    editorEdit.replace(selections[idx], '' + replacement);
                }
            }
        }
    });
}

export function evalAllSelections(): Thenable<boolean> {
    const editor = window.activeTextEditor;
    if (!editor) { return; }

    let selections = editor.selections;
    const orderByPosition = workspace.getConfiguration('eval')
        .get<boolean>('evalSelectionsByPosition', true);
    if (orderByPosition) {
        selections = selections.sort((a, b) => {
            const linediff = a.start.line - b.start.line;
            if (linediff == 0) return a.start.character - b.start.character;
            else return linediff;
        });
    }

    return evalSelections(editor, selections);
}