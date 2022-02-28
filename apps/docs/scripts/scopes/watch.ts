import path from 'path'
import {_initWatcher, ScopeResolverOptions} from './_helpers'

const ROOT_PATH = path.resolve(__dirname, '../../../..')

const SCOPES_RESOLVER_OPTIONS: ScopeResolverOptions = {
  pattern: [
    path.resolve(ROOT_PATH, 'packages/**/src/**/__workshop__/index.ts'),
    path.resolve(ROOT_PATH, 'packages/**/src/**/__workshop__/index.tsx'),
  ],
  target: path.resolve(__dirname, '../../workshop/scopes.js'),
}

_initWatcher(SCOPES_RESOLVER_OPTIONS)
