import * as vscode from 'vscode'
import { gitAPI } from './git-api'


export function showRepoQuickPick(val: any) {
  const result = vscode.window.showQuickPick(val, {
    placeHolder: 'Select your workdir',
  })
  return result
}


export function showBranchQuickPick(codes: any, id: any) {
  return new Promise((resolve) => {
    const quickPick = vscode.window.createQuickPick()
    quickPick.placeholder = 'Select (or create) HEAD:refs/for/<branch>'
    quickPick.canSelectMany = false
    quickPick.items = codes.map((label: any) => ({ label }))
    quickPick.onDidAccept(async () => {
      const selection = quickPick.activeItems[0]
      resolve(selection.label)
      gitAPI('push', selection.label, id)
      quickPick.hide()
    })
    quickPick.onDidChangeValue(() => {
      // add a new code to the pick list as the first item
      if (!codes.includes(quickPick.value)) {
        const newItems = [quickPick.value, ...codes].map(label => ({ label }))
        quickPick.items = newItems
      }
    })
    quickPick.onDidHide(() => quickPick.dispose())
    quickPick.show()
  })
}
