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
		let hppGuard = '#ifndef CLASS_HPP\n\
# define CLASS_HPP\n\
\n';
		let hppContent = 'class CLASS\n\
{\n\
	public:\n\
		CLASS(void);\n\
		virtual ~CLASS(void);\n\
		CLASS(CLASS const & other);\n\
\n\
		CLASS &					operator=(CLASS const & other);\n\
\n\
	private:\n\
		void					_copy(CLASS const & other);\n\
\n\
};\n\
\n\
#endif';
		let cppContent = '#include "CLASS.hpp" \n\
\n\
CLASS::CLASS(void)\n\
{\n\
}\n\
\n\
CLASS::~CLASS(void)\n\
{\n\
}\n\
\n\
CLASS::CLASS(CLASS const & other)\n\
{\n\
	CLASS::_copy(other);\n\
}\n\
\n\
CLASS &\n\
CLASS::operator=(CLASS const & other)\n\
{\n\
	if (this != &other)\n\
		CLASS::_copy(other);\n\
	return (*this);\n\
}\n\
\n\
void\n\
CLASS::_copy(CLASS const & other)\n\
{\n\
}\n';
		vscode.window.showInputBox(options).then((value) =>
		{
			let capitalized = value[0].toUpperCase() + value.substring(1);
			fs.writeFile(path.join(folderPath, capitalized + ".hpp"), hppGuard.replace(/CLASS/g, value.toUpperCase()) + hppContent.replace(/CLASS/g, capitalized), err => {
				if (err)
				{
					console.error(err);
					return ;
				}
				vscode.window.showInformationMessage(capitalized + ".hpp created.");
			})
			fs.writeFile(path.join(folderPath, capitalized + ".cpp"), cppContent.replace(/CLASS/g, capitalized), err => {
				if (err)
				{
					console.error(err);
					return ;
				}
				vscode.window.showInformationMessage(capitalized + ".cpp created.");
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
