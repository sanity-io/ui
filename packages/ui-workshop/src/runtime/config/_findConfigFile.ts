import path from 'path'
import {_fileExists} from '../lib/_fileExists'

const CONFIG_FILE_NAMES = [
  'workshop.config.js',
  'workshop.config.jsx',
  'workshop.config.mjs',
  'workshop.config.cjs',
  'workshop.config.ts',
  'workshop.config.tsx',
]

/** @internal */
export function _findConfigFile(options: {packagePath: string}): string | undefined {
  const {packagePath} = options

  for (const f of CONFIG_FILE_NAMES) {
    const file = path.resolve(packagePath, f)

    if (_fileExists(file)) return file
  }

  return undefined
}
