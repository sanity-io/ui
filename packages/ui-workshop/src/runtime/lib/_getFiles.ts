import fg from 'fast-glob'
import path from 'path'

import type {_Observable} from './_observable'

export function _getFiles(options: {
  cwd: string
  pattern: string | string[]
}): _Observable<string[]> {
  const {cwd, pattern} = options

  return {
    subscribe(observer) {
      fg(pattern, {cwd}).then((files) => {
        observer.next(files.map((f) => path.resolve(cwd, f)))
      })

      return {
        unsubscribe() {
          //
        },
      }
    },
  }
}
