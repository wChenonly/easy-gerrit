

//组合信息 Portfolio information，用于将各个模块的信息组合成一个信息，方便后续的处理，包含commit类型，scope范围，details详情，

export interface GitMessage {
  [index: string]: string;
  type: string;
  scope: string;
  details: string;
}

export function messageCombine(config: GitMessage) {
  let result: string = '';
  if (config.type) {
    result += `${config.type}: `;
  }
  if (config.details) {
    result += `${config.details}->> `;
  }
  if (config.scope) {
    result += `${config.scope} `;
  }
  result = result.replace(/<enter>/g, '\n\n');
  result = result.replace(/<space>/g, ' ');
  return result.trim();
}


