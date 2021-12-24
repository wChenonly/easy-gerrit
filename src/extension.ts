import * as vscode from 'vscode'
import * as path from 'path'
import { commitEditQuickPickOptions, commitDetailType } from './commit/commit-detail'
import commitType from './commit/commit-type'
import commitInputType from './commit/commit-input'
import { gitAPI } from './git/git-api'
import { messageCombine, GitMessage, clearMessage } from './commit/commit-information'
import { showBranchQuickPick, showRepoQuickPick } from './git/git-push'


export function activate(context: vscode.ExtensionContext) {
  //获取当前的 git仓库实例
  let repo: any = gitAPI('repos')[0]

  //最终在scm上显示的消息合集
  const messageConfig: GitMessage = {
    type: '',
    scope: '',
    details: ''
  }


  //点击编辑editingCommit的时候，自动弹框选择commit type
  const startEditingCommit = () => {
    commitEditQuickPickOptions.placeHolder = '提交 commit 类型(Submit Commit Type)'
    vscode.window.showQuickPick(commitType, commitEditQuickPickOptions).then((select: any) => {
      messageConfig.type = select.label

      //先显示让用户填写scope范围
      recursiveInputMessage('scope')
    })
  }

  // 递归输入信息
  const recursiveInputMessage = (type: string) => {
    commitEditQuickPickOptions.placeHolder = '请点击下方选项，后填写信息(Submit Commit Describe Info)'
    const _commitDetailType = commitDetailType.filter((item) => {
      if (item.key === type) {
        return item
      }
    })
    vscode.window.showQuickPick(_commitDetailType, commitEditQuickPickOptions).then((item) => {
      const key = (item && item.key) || ''
      inputMessageDetail(key)
    })
  }
  //输入提交详情 Input message detail
  const inputMessageDetail = (_key: string) => {
    const _detailType = commitDetailType.find((item) => item.key === _key)
    commitInputType.prompt = `${_detailType?.label} 👉 ${_detailType?.detail}`
    commitInputType.value = messageConfig[_key] ? messageConfig[_key] : ''
    vscode.window.showInputBox(commitInputType).then((value) => {
      // 如果是空，则代表用户没写数据，此时就重新跳转到选择填写页面
      if (!value) {
        vscode.window.showErrorMessage(`请务必填写 ${_detailType?.label} 👉 ${_detailType?.detail}`)
        recursiveInputMessage(_key)
        return
      }
      messageConfig[_key] = value || ''
      _detailType && (_detailType.isEdit = true)
      // 第二次让用户填写commit details详情
      if (_detailType?.key !== 'details') {
        recursiveInputMessage('details')
      }
      if (_detailType?.key === 'details') {
        completeInputMessage()
      }
    })
  }


  //完成输入 Complete input message
  const completeInputMessage = () => {
    vscode.commands.executeCommand('workbench.view.scm')
    repo.inputBox.value = messageCombine(messageConfig)
    clearMessage(messageConfig, commitDetailType)
  }



  //向gerrit提交code
  const startPushCode = async () => {
    const repos: any = []
    repos.push({ label: path.basename(repo._repository.root), branch: repo._repository.headLabel })
    const repoId: any = await showRepoQuickPick(repos)
    showBranchQuickPick(repoId.branch)
  }


  //提交commit
  const editingCommit = vscode.commands.registerCommand('easy-gerrit.editingCommit', (u) => {
    if (u) {
      // 如果开的空间，则有多个repo，则寻找当前的
      repo = gitAPI('repos').find((repo: any) => {
        return repo.rootUri.path === u._rootUri.path
      })
    }
    startEditingCommit()
  })

  // 提交code
  const pushCode = vscode.commands.registerCommand('easy-gerrit.pushCode', (u) => {
    if (u) {
      // 如果开的空间，则有多个repo，则寻找当前的
      repo = gitAPI('repos').find((repo: any) => {
        return repo.rootUri.path === u._rootUri.path
      })
    }
    startPushCode()
  })

  context.subscriptions.push(editingCommit, pushCode)
}

// this method is called when your extension is deactivated
// export function deactivate() { }
