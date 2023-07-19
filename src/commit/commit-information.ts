// messageConfig 接口校验
interface GitMessage {
  [index: string]: string
  type: string
  scope: string
  details: string
}

// 最终在scm上显示的消息合集
export const messageConfig: GitMessage = {
  type: '',
  scope: '',
  details: '',
}

// 组合信息 Portfolio information，用于将各个模块的信息组合成一个信息，方便后续的处理，包含commit类型，scope范围，details详情，

export function messageCombine(config: GitMessage) {
  let result = ''
  if (config.type)
    result += `${config.type}: `

  if (config.scope)
    result += `${config.scope}->> `

  if (config.details)
    result += `${config.details} `

  result = result.replace(/<enter>/g, '\n\n')
  result = result.replace(/<space>/g, ' ')
  return result.trim()
}

// 清除填写的input信息
export function clearMessage(messageConfig: GitMessage, commitDetailType: any) {
  Object.keys(messageConfig).forEach(key => (messageConfig[key] = ''))
  commitDetailType.map((item: any) => {
    item.isEdit = false
    return item
  })
}
