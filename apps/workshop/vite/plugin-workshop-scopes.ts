import path from 'path'
import {ResolvedConfig} from 'vite'
import {_initWatcher, _writeScopes, ScopeResolverOptions} from '../scripts/scopes/_helpers'

const ROOT_PATH = path.resolve(__dirname, '../../..')

const SCOPES_RESOLVER_OPTIONS: ScopeResolverOptions = {
  pattern: [
    path.resolve(ROOT_PATH, 'packages/**/src/**/__workshop__/index.ts'),
    path.resolve(ROOT_PATH, 'packages/**/src/**/__workshop__/index.tsx'),
  ],
  target: path.resolve(__dirname, '../src/scopes.ts'),
}

const WORKSHOP_ENV_MODULE_ID = '$workshop'

export function pluginWorkshopScopes() {
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
          _writeScopes(SCOPES_RESOLVER_OPTIONS)
          isInitialized = true
        }

        if (shouldWatch && !isWatcherInitialized) {
          _initWatcher(SCOPES_RESOLVER_OPTIONS)
          isWatcherInitialized = true
        }

        return SCOPES_RESOLVER_OPTIONS.target
      }

      return undefined
    },
  }
}
