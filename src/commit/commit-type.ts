
interface CommitType {
  readonly label: string;
  readonly key?: string
  readonly description: string

}

const commitType: Array<CommitType> = [

  {
    label: 'ð init',
    key: 'init',
    description: 'åæ¬¡æäº¤/åå§åé¡¹ç®'
  },
  {
    label: 'â¨ feature',
    key: 'feature',
    description: 'å¼å¥æ°åè½'
  },
  {
    label: 'ð fix',
    key: 'fix',
    description: 'ä¿®å¤bug'
  },
  {
    label: 'ð style',
    key: 'style',
    description: 'æ´æ° UI åæ ·å¼æä»¶'
  },
  {
    label: 'ð¨ format',
    key: 'format',
    description: 'æ¹è¿ä»£ç ç»æ/ä»£ç æ ¼å¼ï¼ä¸æ¶åä»£ç é»è¾'
  },
  {
    label: 'ð docs',
    key: 'docs',
    description: 'ä»ä»ä¿®æ¹ææ¡£'
  },
  {
    label: 'ð  refactor',
    key: 'refactor',
    description: 'ä»£ç éæï¼æ²¡æå æ°åè½æèä¿®å¤bug'
  },
  {
    label: 'ð perf',
    key: 'perf',
    description: 'ä¼åç¸å³ï¼æ¯å¦æåæ§è½ãä½éª'
  },
  {
    label: 'ð test',
    key: 'test',
    description: 'å¢å æµè¯ç¨ä¾'
  },
  {
    label: 'ð¦ build',
    key: 'build',
    description: 'ä¾èµç¸å³çåå®¹'
  },
  {
    label: 'ð· ci',
    key: 'ci',
    description: 'ciéç½®ç¸å³/å¢å ä¾èµ/æ´æ°ä¾èµç­'
  }
]


export default commitType
