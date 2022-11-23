import {_getFiles} from './lib/_getFiles'
import {_Observable} from './lib/_observable'
import {_watchFiles} from './lib/_watchFiles'

export function _watchScopes(options: {
  cwd: string
  pattern: string | string[]
}): _Observable<string[]> {
  return {
    subscribe(observer) {
      const initialFiles$ = _getFiles(options)
      const fileEvent$ = _watchFiles(options)

      let files: string[]

      const initialFilesSub = initialFiles$.subscribe({
        next(initialFiles) {
          files = initialFiles

          observer.next(files)
        },
      })

      const fileEventSub = fileEvent$.subscribe({
        next(event) {
          if (event.type === 'add') {
            files.push(event.file)

            observer.next(files)
          }

          if (event.type === 'unlink') {
            const idx = files.indexOf(event.file)

            if (idx) {
              files.splice(idx, 1)

              observer.next(files)
            }
          }
        },
      })

      return {
        unsubscribe() {
          initialFilesSub.unsubscribe()
          fileEventSub.unsubscribe()
        },
      }
    },
  }
}
