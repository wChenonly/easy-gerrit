import { InputBoxOptions } from 'vscode'

/**
 * @description git commit input 输入提交信息的配置对象
 */
export type CommitInputType = InputBoxOptions
const commitInputType: CommitInputType = {
  placeHolder: '',
  ignoreFocusOut: true,
  prompt: ''
}

export default commitInputType
