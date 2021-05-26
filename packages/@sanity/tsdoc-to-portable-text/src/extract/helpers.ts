import tmp from 'tmp'

export function createTmpDir(): Promise<{path: string; cleanup: () => void}> {
  return new Promise((resolve, reject) => {
    tmp.dir((err, dirPath, cleanupCallback) => {
      if (err) {
        reject(err)

        return
      }

      resolve({path: dirPath, cleanup: cleanupCallback})
    })
  })
}
