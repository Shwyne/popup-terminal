// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as childProcess from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "popup-terminal" is now active!');
	let runCodeButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    runCodeButton.text = 'Run Code';
    runCodeButton.command = 'popup-terminal.runCode';
    runCodeButton.show();

    context.subscriptions.push(runCodeButton);

	const disposable = vscode.commands.registerCommand('popup-terminal.runCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            if (document.languageId === 'cpp') {
                childProcess.exec(`g++ ${document.fileName} -o output`, (error, _, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Compilation error: ${stderr}`);
                    } else {
                        childProcess.exec('./output', (error, stdout, stderr) => {
                            if (error) {
                                vscode.window.showErrorMessage(`Runtime error: ${stderr}`);
                            } else {
                                vscode.window.showInformationMessage(`Program output: ${stdout}`);
                            }
                        });
                    }
                });
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
