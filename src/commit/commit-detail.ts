import type { QuickPickOptions } from 'vscode'

export const commitEditQuickPickOptions: QuickPickOptions = {
  matchOnDescription: true,
  matchOnDetail: true,
  ignoreFocusOut: true,
}

interface CommitDetailType {
  label: string
  key: string
  detail: string
  isEdit: boolean
}

export const commitDetailType: Array<CommitDetailType> = [
  {
    label: '修改范围',
    key: 'scope',
    detail: '本次修改包含哪些模块',
    isEdit: false,
  },
  {
    label: '详细内容',
    key: 'details',
    detail: '本次修改的详细内容',
    isEdit: false,
  },
]
