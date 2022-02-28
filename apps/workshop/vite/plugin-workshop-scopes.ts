import {Plugin, ResolvedConfig} from 'vite'
import {_initWatcher, _writeScopes, ScopeResolverOptions} from '../scripts/scopes/_helpers'

export function pluginWorkshopScopes(opts: ScopeResolverOptions): Plugin {
  let isInitialized = false
  let isWatcherInitialized = false
  let shouldWatch = false

  return {
    name: 'resolve-stories',

    enforce: 'pre',

    configResolved(config: ResolvedConfig) {
      shouldWatch = config.command !== 'build'
    },

    resolveId() {
      if (!isInitialized) {
        _writeScopes(opts)
        isInitialized = true
      }

      if (shouldWatch && !isWatcherInitialized) {
        _initWatcher(opts)
        isWatcherInitialized = true
      }

      return undefined
    },
  }
}
