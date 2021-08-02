import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'
import globby from 'globby'
import {ResolvedConfig} from 'vite'

const WORKSHOP_ENV_MODULE_ID = '$workshop'

const WORKSHOP_PATTERNS = [
  path.resolve(__dirname, '../src/**/__workshop__/index.ts'),
  path.resolve(__dirname, '../src/**/__workshop__/index.tsx'),
]

const WORKSHOP_SCOPES_PATH = path.resolve(__dirname, './scopes.ts')

declare global {
  // eslint-disable-next-line no-var
  var $workshopWatcher: chokidar.FSWatcher | undefined
}

function sanitizeModulePath(modulePath: string) {
  return path
    .relative(__dirname, modulePath)
    .replace(/\.[^/.]+$/, '')
    .replace(/\/index$/, '')
}

function compileModule(paths: string[]) {
  const sortedPaths = paths.sort()
  const imports = sortedPaths
    .map((p, idx) => `import _${idx} from '${sanitizeModulePath(p)}'`)
    .join('\n')
  const exports = sortedPaths.map((_p, idx) => `  _${idx}`).join(',\n')
  const code = [imports, `export const scopes = [\n${exports},\n]`].join('\n\n') + `\n`

  return code
}

export function resolveWorkshopEnvPlugin() {
  let paths: string[] = []
  let isInitialized = false
  let isWatcherInitialized = false
  let shouldWatch = true

  return {
    name: 'resolve-stories',

    configResolved(config: ResolvedConfig) {
      shouldWatch = config.command !== 'build'
    },

    resolveId(id: string) {
      if (id === WORKSHOP_ENV_MODULE_ID) {
        if (!isInitialized) {
          isInitialized = true
          paths = globby.sync(WORKSHOP_PATTERNS)
          _writeModule()
        }

        if (shouldWatch && !isWatcherInitialized) {
          _initWatcher()
        }

        return WORKSHOP_SCOPES_PATH
      }

      return undefined
    },
  }

  function _initWatcher() {
    isWatcherInitialized = true

    if (global.$workshopWatcher) {
      global.$workshopWatcher.close()
    }

    global.$workshopWatcher = chokidar.watch(WORKSHOP_PATTERNS, {
      ignoreInitial: true,
    })

    global.$workshopWatcher.on('all', (event, filePath) => {
      if (event === 'add') {
        if (!paths.includes(filePath)) {
          paths.push(filePath)
          paths.sort()
        }

        _writeModule()
      }

      if (event === 'unlink') {
        const idx = paths.indexOf(filePath)

        if (idx > -1) {
          paths.splice(idx)
        }

        _writeModule()
      }
    })
  }

  function _writeModule() {
    fs.writeFileSync(WORKSHOP_SCOPES_PATH, compileModule(paths))
  }
}
