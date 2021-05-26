import cpx from 'cpx'

export function copy(source: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cpx.copy(source, dest, {}, (err) => {
      if (err) {
        reject(err)

        return
      }

      resolve()
    })
  })
}
