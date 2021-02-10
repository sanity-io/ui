import child_process from 'child_process'

export function getLatestCommitSha() {
  return new Promise((resolve, reject) => {
    child_process.exec('git rev-parse HEAD', function (err, stdout) {
      if (err) {
        reject(err)
      } else {
        resolve(stdout.trim())
      }
    })
  })
}
