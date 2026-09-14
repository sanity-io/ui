import {readFileSync} from 'node:fs'

import type {PackageJson} from './types.js'

/**
 * Reads this package's own package.json so the CLI installs the exact version
 * it ships with and the real declared ranges, never invented ones. The path is
 * two levels up from both src/cli (dev) and dist/cli (published), which both
 * resolve to the package root.
 */
export function readSelfPackage(): PackageJson {
  const url = new URL('../../package.json', import.meta.url)
  return JSON.parse(readFileSync(url, 'utf8')) as PackageJson
}
