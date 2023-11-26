import chokidar from 'chokidar'
import path from 'path'

import {_Observable} from './_observable'

export interface _FileEvent {
  type: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'
  file: string
}

export function _watchFiles(options: {
  cwd: string
  pattern: string | string[]
}): _Observable<_FileEvent> {
  const {cwd, pattern} = options

  return {
    subscribe(observer) {
      const watcher = chokidar.watch(pattern, {
        cwd,
        ignoreInitial: true,
      })

      watcher.on('all', (event, file) => {
        observer.next({type: event, file: path.resolve(cwd, file)})
      })

      return {
        unsubscribe() {
          watcher.close()
        },
      }
    },
  }
}
