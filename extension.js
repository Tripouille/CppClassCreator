// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('cppclasscreator is now active.');
	let disposable = vscode.commands.registerCommand('cppclasscreator.ccc', function () {
		let options = {
			prompt: "Classname.hpp and Classname.cpp will be created.",
			placeHolder: "Classname"
		}
		const folderPath = vscode.workspace.workspaceFolders[0].uri
			.toString()
			.split(":")[1];
		let hppContent = '#ifndef CLASS_HPP \n\
# define CLASS_HPP\n\
\n\
class CLASS \n\
{\n\
	public:\n\
		CLASS(void);\n\
		~CLASS(void);\n\
		CLASS(const CLASS &other);\n\
		CLASS               &operator=(const CLASS &other);\n\
\n\
	private:\n\
};\n\
\n\
#endif';
		let cppContent = "#include \"CLASS.hpp\" \n\
\n\
CLASS::CLASS(void)\n\
{\n\
}\n\
\n\
CLASS::~CLASS(void)\n\
{\n\
}\n\
\n\
CLASS::CLASS(const CLASS &other)\n\
{\n\
}\n\
\n\
CLASS		&CLASS::operator=(const CLASS &other)\n\
{\n\
}";
		vscode.window.showInputBox(options).then((value) =>
		{
			fs.writeFile(path.join(folderPath, value + ".hpp"), hppContent.replace(/CLASS/g, value), err => {
				if (err)
				{
					console.error(err);
					return ;
				}
				vscode.window.showInformationMessage(value + ".hpp created.");
			})
			fs.writeFile(path.join(folderPath, value + ".cpp"), cppContent.replace(/CLASS/g, value), err => {
				if (err)
				{
					console.error(err);
					return ;
				}
				vscode.window.showInformationMessage(value + ".cpp created.");
			})
		});
	});
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
