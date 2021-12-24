import * as vscode from 'vscode'


export function gitAPI(val: string, pushBranch = '', id = 0) {
  const gitExtension = vscode.extensions.getExtension('vscode.git')
  const git = gitExtension?.exports
  const api = git.getAPI(1)
  if (val === 'push') {
    const repo = api.repositories[id]
    repo.push('origin', `HEAD:refs/for/${pushBranch}`)
      .catch((err: any) => {
        vscode.window.showErrorMessage(err.stderr)
      })
    return repo
  } else if (val === 'repos') {
    const repo = api.repositories
    return repo
  }
}
