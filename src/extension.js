"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const childProcess = __importStar(require("child_process"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
async function activate(context) {
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
                    }
                    else {
                        childProcess.exec('./output', (error, stdout, stderr) => {
                            if (error) {
                                vscode.window.showErrorMessage(`Runtime error: ${stderr}`);
                            }
                            else {
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
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map