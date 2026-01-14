import path from 'path'
import {watch} from 'chokidar'
import type {_Observable} from './_observable'

export interface _FileEvent {
  type: 'all' | 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir' | 'ready' | 'raw' | 'error'
  file: string
}

export function _watchFiles(options: {
  cwd: string
  pattern: string | string[]
}): _Observable<_FileEvent> {
  const {cwd, pattern} = options

  return {
    subscribe(observer) {
      const watcher = watch(pattern, {
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
