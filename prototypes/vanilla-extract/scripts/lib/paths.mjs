import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
export const LIBS = ['lib-v1', 'lib-v2']
export const MODES = ['default', 'version', 'version+module', 'content']
export const RESULTS_DIR = resolve(ROOT, 'results')
export const TSDOWN_BIN = resolve(ROOT, 'node_modules/.bin/tsdown')

export function libDir(lib) {
  return resolve(ROOT, lib)
}

export function distDir(lib, mode) {
  return resolve(ROOT, lib, 'dist', mode)
}
