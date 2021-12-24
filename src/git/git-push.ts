import * as vscode from 'vscode'
import { gitAPI } from './git-api'


export async function showRepoQuickPick(val: any) {
  const result = vscode.window.showQuickPick(val, {
    placeHolder: '确定你的仓库(confirm your repo)',
  })
  return result
}


export function showBranchQuickPick(branch: string) {
  const quickPick = vscode.window.createQuickPick()
  quickPick.placeholder = `确定你的分支(confirm HEAD:refs/for/${branch})`
  quickPick.items = [{ label: branch }]
  quickPick.onDidAccept(() => {
    const selection = quickPick.activeItems[0]
    gitAPI('push', selection.label)
    quickPick.hide()
  })
  quickPick.show()
}
