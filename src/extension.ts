import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('vscode-java-extras.pn', pn));
	context.subscriptions.push(vscode.commands.registerCommand('vscode-java-extras.fqcn', fqcn));
}

function pn(target: any) {
	if (target.contextValue.startsWith('package+')) {
        vscode.env.clipboard.writeText(target.name);
	}
}

async function fqcn(target: any) {
	if (target.contextValue.startsWith('type+')) {
		let fqcn;
		if (target.uri.match(/^jdt:\/\/contents\/.*\.jar\//)) {
			fqcn = target.uri.replace(/^jdt:\/\/contents\/.*\.jar\//, '').replace(/\.class\?.*$/, '').replace(/\//, '.');
			vscode.env.clipboard.writeText(fqcn);
		} else if (target.uri.match(/file:\/\/.+src\/[^/]+\/java\/.+\.java/)) {
			fqcn = target.uri.replace(/^file:\/\/.*\/src\/[^/]+\/java\//, '').replace(/\.java$/, '').replace(/\//g, '.');
			vscode.env.clipboard.writeText(fqcn);
		}
	}
}

export function deactivate() {}
