import murmur2 from '@emotion/hash'
import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

/**
 * The argument `@vanilla-extract/css` passes to a custom `identifiers` function
 * (`generateIdentifier` in `packages/css/src/identifier.ts`). Note what is *not* here: the
 * style rule. The identifier is generated before the rule reaches the adapter, so a custom
 * function cannot hash rule content — it can only re-derive a name from these inputs.
 */
export interface IdentifierArgs {
  /** Upstream's default `short` identifier: `murmur2(packageName + filePath)` + per-file counter (base36). */
  hash: string
  /** Path of the `.css.ts` module, relative to the integration's root (cwd for tsdown, `root` for Vite). */
  filePath: string
  /** Only present when authored (`style({}, 'id')`) or passed by `recipe`/`styleVariants`; upstream does not inject debug ids for custom functions (vanilla-extract PR #1229 is still open). */
  debugId?: string
  packageName?: string
  /**
   * NOT upstream: the serialized rule/keyframes/font-face/theme the identifier stands for. Only
   * present with the `upstream-content-hash.patch` sketch applied (here via `pnpm patch`, see
   * `patches/`). Undefined for `createVar`, `createContainer`, `layer`, `createViewTransition`.
   */
  content?: string
}

export type IdentifierFn = (args: IdentifierArgs) => string

export interface VersionedIdentifiersOptions {
  /** Package name, e.g. `@sanity/ui`. */
  name: string
  /** Package version, e.g. `4.4.4`. Any change renames every identifier the package emits. */
  version: string
  /**
   * Also hash each `.css.ts` module's own source into its identifiers. `root` is the directory
   * `filePath` is relative to. Covers "same version, different styles" (unreleased builds,
   * `PKG_VERSION`-only CDN previews) for the price of one file read per module per build.
   */
  moduleContent?: {root: string}
  /**
   * Length of the per-file prefix in base36 characters: 7 ≈ 36 bits (upstream's murmur2 prefix
   * is 32 bits and 6–7 characters). Two identifiers can only collide when two *files* across
   * releases hash to the same prefix and reuse a counter value.
   * @defaultValue 7
   */
  prefixLength?: number
  /** Prefix names with the debug id when there is one, like upstream's `debug` mode. */
  debug?: boolean
}

const MASK_64 = (1n << 64n) - 1n

function base36(hex: string, length: number): string {
  const n = BigInt(`0x${hex.slice(0, 16)}`) & MASK_64
  return n.toString(36).padStart(length, '0').slice(0, length)
}

/**
 * A vanilla-extract `identifiers` function that makes every generated identifier (class names,
 * theme classes, CSS variables, keyframes, containers, layers) unique per package version —
 * and optionally per module source — using nothing but upstream's public option.
 *
 * Why this fixes SAPP-4639: upstream names are `hash(name + path) + counter`. Reordering the
 * `style()` calls in a module renumbers them, so two releases reuse the same name for different
 * rules. Here the release is part of the per-file hash, so a name can only repeat across
 * releases through a hash collision between two files, never through renumbering.
 *
 * The output keeps upstream's shape — a per-file prefix followed by the per-file counter — so
 * names stay as short and as compressible as the defaults (every name in a module shares its
 * prefix). The counter is recovered from upstream's `hash` by stripping the murmur2 prefix it is
 * documented to start with; should that layout ever change, the whole `hash` is kept instead
 * (longer names, still unique).
 */
export function versionedIdentifiers(options: VersionedIdentifiersOptions): IdentifierFn {
  const {name, version, moduleContent, prefixLength = 7, debug = false} = options
  const salt = `${name}@${version}`
  const prefixes = new Map<string, string>()

  const prefixFor = (filePath: string): string => {
    let prefix = prefixes.get(filePath)
    if (prefix === undefined) {
      const hash = createHash('sha256').update(salt).update('\0').update(filePath)
      if (moduleContent) {
        const source = readFileSync(resolve(moduleContent.root, filePath), 'utf8')
        hash.update('\0').update(source.replace(/\r\n?/g, '\n'))
      }
      prefix = base36(hash.digest('hex'), prefixLength)
      prefixes.set(filePath, prefix)
    }
    return prefix
  }

  return ({hash, filePath, packageName, debugId}) => {
    const upstreamPrefix = murmur2(packageName ? `${packageName}${filePath}` : filePath)
    const counter = hash.startsWith(upstreamPrefix) ? hash.slice(upstreamPrefix.length) : hash
    const id = `${prefixFor(filePath)}${counter}`
    const identifier = /^[0-9]/.test(id) ? `_${id}` : id
    return debug && debugId ? `${debugId.replace(/\s/g, '_')}__${identifier}` : identifier
  }
}

/**
 * Content-addressed identifiers — what "hashed by content" means for vanilla-extract. Needs the
 * `content` argument from `upstream-content-hash.patch`; without it every identifier falls back
 * to the version salt. Styles, keyframes, font faces and theme classes are named by a hash of
 * their serialized content, so identical rules get identical names in every release (and are
 * deduplicated by the cascade), while changed rules get new names. Identifiers without content
 * (`createVar`, `createContainer`, `layer`) stay version-scoped, which in turn makes every rule
 * that references a generated variable version-specific as well.
 */
export function contentIdentifiers(options: VersionedIdentifiersOptions): IdentifierFn {
  const {debug = false, prefixLength = 7} = options
  const versioned = versionedIdentifiers(options)
  return (args) => {
    if (args.content === undefined) return versioned(args)
    const digest = createHash('sha256').update(args.content).digest('hex')
    // `prefixLength + 1` characters of content hash, with a letter prefix so the name is always
    // a valid identifier: comparable length to the counter-based names.
    const identifier = `c${base36(digest, prefixLength + 1)}`
    return debug && args.debugId ? `${args.debugId.replace(/\s/g, '_')}__${identifier}` : identifier
  }
}

/** Reads `name` and `version` from a package.json file. */
export function readPackageIdentity(packageJsonPath: string): {name: string; version: string} {
  const {name, version} = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    name: string
    version: string
  }
  return {name, version}
}

export type IdentifiersMode = 'default' | 'version' | 'version+module' | 'content'

export const IDENTIFIER_MODES: readonly IdentifiersMode[] = [
  'default',
  'version',
  'version+module',
  'content',
]

/**
 * Resolves the `identifiers` option for one of the prototype's build modes. `default` is
 * upstream's unsalted `short` naming (the control that reproduces the incident); `content`
 * additionally depends on the patched `@vanilla-extract/css`.
 */
export function identifiersForMode(
  mode: IdentifiersMode,
  identity: {name: string; version: string},
  root: string,
): 'short' | IdentifierFn {
  switch (mode) {
    case 'default':
      return 'short'
    case 'version':
      return versionedIdentifiers(identity)
    case 'version+module':
      return versionedIdentifiers({...identity, moduleContent: {root}})
    case 'content':
      return contentIdentifiers(identity)
    default: {
      const exhaustive: never = mode
      throw new Error(`Unknown identifiers mode: ${String(exhaustive)}`)
    }
  }
}
