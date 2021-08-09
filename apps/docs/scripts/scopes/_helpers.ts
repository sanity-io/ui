import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'
import globby from 'globby'

declare global {
  // eslint-disable-next-line no-var
  var $workshopWatcher: chokidar.FSWatcher | undefined
}

export interface ScopeResolverOptions {
  pattern: string | string[]
  target: string
}

function _sanitizeModulePath(opts: ScopeResolverOptions, modulePath: string) {
  const dirPath = path.dirname(opts.target)

  return path
    .relative(dirPath, modulePath)
    .replace(/\.[^/.]+$/, '')
    .replace(/\/index$/, '')
}

export function _writeScopes(opts: ScopeResolverOptions) {
  const paths = globby.sync(opts.pattern)

  _writeModule(opts, paths)

  return paths
}

export function _initWatcher(opts: ScopeResolverOptions) {
  const paths: string[] = []

  if (global.$workshopWatcher) {
    global.$workshopWatcher.close()
  }

  global.$workshopWatcher = chokidar.watch(opts.pattern, {
    ignoreInitial: true,
  })

  global.$workshopWatcher.on('all', (event, filePath) => {
    if (event === 'add') {
      if (!paths.includes(filePath)) {
        paths.push(filePath)
        paths.sort()
      }

      _writeModule(opts, paths)
    }

    if (event === 'unlink') {
      const idx = paths.indexOf(filePath)

      if (idx > -1) {
        paths.splice(idx)
      }

      _writeModule(opts, paths)
    }
  })
}

function _writeModule(opts: ScopeResolverOptions, paths: string[]) {
  fs.writeFileSync(opts.target, _compileModule(opts, paths))
}

function _compileModule(opts: ScopeResolverOptions, paths: string[]) {
  if (paths.length === 0) {
    return `export const scopes = []`
  }

  const sortedPaths = paths.sort()
  const imports = sortedPaths
    .map((p, idx) => `import _${idx} from '${_sanitizeModulePath(opts, p)}'`)
    .join('\n')
  const exports = sortedPaths.map((_p, idx) => `  _${idx}`).join(',\n')
  const code = [imports, `export const scopes = [\n${exports},\n]`].join('\n\n') + `\n`

  return code
}
