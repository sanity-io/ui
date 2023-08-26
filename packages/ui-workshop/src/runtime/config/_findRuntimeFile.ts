import path from 'path'
import {_fileExists} from '../lib/_fileExists'

const RUNTIME_FILE_NAMES = [
  'workshop.runtime.js',
  'workshop.runtime.jsx',
  'workshop.runtime.mjs',
  'workshop.runtime.cjs',
  'workshop.runtime.ts',
  'workshop.runtime.tsx',
]

/** @internal */
export function _findRuntimeFile(options: {packagePath: string}): string | undefined {
  const {packagePath} = options

  for (const f of RUNTIME_FILE_NAMES) {
    const file = path.resolve(packagePath, f)

    if (_fileExists(file)) return file
  }

  return undefined
}
