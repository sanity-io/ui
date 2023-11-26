import globby from 'globby'
import path from 'path'

import {_Observable} from './_observable'

export function _getFiles(options: {
  cwd: string
  pattern: string | string[]
}): _Observable<string[]> {
  const {cwd, pattern} = options

  return {
    subscribe(observer) {
      globby(pattern, {cwd}).then((files) => {
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
