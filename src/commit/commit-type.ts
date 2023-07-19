interface CommitType {
  readonly label: string
  readonly key?: string
  readonly description: string
}

const commitType: Array<CommitType> = [
  {
    label: '🎉 init',
    key: 'init',
    description: '初次提交/初始化项目',
  },
  {
    label: '✨ feature',
    key: 'feature',
    description: '引入新功能',
  },
  {
    label: '🚑 fix',
    key: 'fix',
    description: '修复bug',
  },
  {
    label: '💄 style',
    key: 'style',
    description: '更新 UI 和样式文件',
  },
  {
    label: '🎨 format',
    key: 'format',
    description: '改进代码结构/代码格式，不涉及代码逻辑',
  },
  {
    label: '📝 docs',
    key: 'docs',
    description: '仅仅修改文档',
  },
  {
    label: '🛠 refactor',
    key: 'refactor',
    description: '代码重构，没有加新功能或者修复bug',
  },
  {
    label: '🚀 perf',
    key: 'perf',
    description: '优化相关，比如提升性能、体验',
  },
  {
    label: '💉 test',
    key: 'test',
    description: '增加测试用例',
  },
  {
    label: '📦 build',
    key: 'build',
    description: '依赖相关的内容',
  },
  {
    label: '👷 ci',
    key: 'ci',
    description: 'ci配置相关/增加依赖/更新依赖等',
  },
]

export default commitType
