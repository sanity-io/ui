import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'

import murmur2 from '@emotion/hash'

/**
 * A vanilla-extract `identifiers` function (the upstream option every @vanilla-extract/* and
 * @sanity/vanilla-extract-* plugin accepts) that makes all generated identifiers — class names,
 * theme classes, CSS variables, keyframes, containers, layers — unique per package version.
 *
 * Upstream names are `murmur2(packageName + filePath)` followed by a per-file counter, so a
 * release that reorders a module's `style()` calls reuses its class names for different rules
 * (SAPP-4639: `_2mi48t0` was the Button loading overlay in 4.4.2 and the Button root in 4.4.4).
 * Here the per-file prefix is derived from `name@version` and the file path instead, and the
 * counter is kept, so names keep their length and compressibility while two releases can only
 * share a name through a hash collision between two files, never through renumbering.
 *
 * Prototype for the css-eval (`prototypes/vanilla-extract/`); the natural home for this is a
 * default inside `@sanity/tsdown-config`, which already knows the package it builds.
 */
export function versionedIdentifiers(options: {
  name: string
  version: string
  /** Base36 characters of the per-file prefix; 7 ≈ 36 bits (upstream's murmur2 is 32 bits). */
  prefixLength?: number
}): (args: {hash: string; filePath: string; packageName?: string}) => string {
  const {name, version, prefixLength = 7} = options
  const prefixes = new Map<string, string>()
  const prefixFor = (filePath: string): string => {
    let prefix = prefixes.get(filePath)
    if (prefix === undefined) {
      const digest = createHash('sha256').update(`${name}@${version}\0${filePath}`).digest('hex')
      prefix = BigInt(`0x${digest.slice(0, 16)}`)
        .toString(36)
        .padStart(prefixLength, '0')
        .slice(0, prefixLength)
      prefixes.set(filePath, prefix)
    }
    return prefix
  }
  return ({hash, filePath, packageName}) => {
    const upstreamPrefix = murmur2(packageName ? `${packageName}${filePath}` : filePath)
    const counter = hash.startsWith(upstreamPrefix) ? hash.slice(upstreamPrefix.length) : hash
    const identifier = `${prefixFor(filePath)}${counter}`
    return /^[0-9]/.test(identifier) ? `_${identifier}` : identifier
  }
}

export function readPackageIdentity(packageJsonPath: string | URL): {
  name: string
  version: string
} {
  const parsed: unknown = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('name' in parsed) ||
    !('version' in parsed) ||
    typeof parsed.name !== 'string' ||
    typeof parsed.version !== 'string'
  ) {
    throw new Error(`${String(packageJsonPath)} has no string "name" and "version"`)
  }
  return {name: parsed.name, version: parsed.version}
}
