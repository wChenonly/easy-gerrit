import * as vscode from 'vscode';
import { commitEditQuickPickOptions, commitDetailType } from './commit/commit-detail';
import commitType from './commit/commit-type';
import commitInputType from './commit/commit-input';
import { gitAPI } from './git/gitApi';
import { messageCombine, GitMessage } from './utils/informationProcess';


export function activate(context: vscode.ExtensionContext) {

	//最终在scm上显示的消息合集
	const messageConfig: GitMessage = {
		type: '',
		scope: '',
		details: ''
	};


	//点击编辑editingCommit的时候，自动弹框选择commit type
	const startEditingCommit = () => {
		commitEditQuickPickOptions.placeHolder = '提交 commit 类型(Submit Commit Type)';
		vscode.window.showQuickPick(commitType, commitEditQuickPickOptions).then((select: any) => {
			messageConfig.type = select.label;

			//先显示让用户填写scope范围
			recursiveInputMessage('scope');
		});
	};

	// 递归输入信息
	const recursiveInputMessage = (type: string) => {
		commitEditQuickPickOptions.placeHolder = '请点击下方选项，后填写信息(Submit Commit Describe Info)';
		const _commitDetailType = commitDetailType.filter((item) => {
			if (item.key === type) {
				return item;
			}
		});
		vscode.window.showQuickPick(_commitDetailType, commitEditQuickPickOptions).then((item) => {
			let key = (item && item.key) || '';
			inputMessageDetail(key);
		});
	};
	//输入提交详情 Input message detail
	const inputMessageDetail = (_key: string) => {
		const _detailType = commitDetailType.find((item) => item.key === _key);
		commitInputType.prompt = `${_detailType?.description} ⚠️👉 ${_detailType?.detail}`;
		commitInputType.value = messageConfig[_key] ? messageConfig[_key] : '';
		vscode.window.showInputBox(commitInputType).then((value) => {
			const _value = value || '';
			messageConfig[_key] = _value;
			_detailType && (_detailType.isEdit = true);
			// 第二次让用户填写commit details详情
			if (_detailType?.key !== 'details') {
				recursiveInputMessage('details');
			}
			// if (_detailType?.key === 'details') {
			// 	recursiveInputMessage('details');
			completeInputMessage();
			// }
		});
	};
	//完成输入 Complete input message
	const completeInputMessage = (select?: boolean) => {
		vscode.commands.executeCommand('workbench.view.scm');
		let repo = gitAPI("repos");
		repo.inputBox.value = messageCombine(messageConfig);
	};
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let editingCommit = vscode.commands.registerCommand('easy-gerrit.editingCommit', () => {
		startEditingCommit();
	});

	let pushCode = vscode.commands.registerCommand('easy-gerrit.pushCode', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('pushCodepushCodepushCode!');
	});

	context.subscriptions.push(editingCommit, pushCode);
}

// this method is called when your extension is deactivated
export function deactivate() { }
