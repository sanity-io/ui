export type Framework =
  | 'next-app'
  | 'next-pages'
  | 'react-router'
  | 'remix'
  | 'vite'
  | 'astro'
  | 'react'

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

export interface PackageJson {
  name?: string
  version?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  packageManager?: string
  eslintConfig?: unknown
}

export interface ReactInfo {
  version: string | null
  source: 'installed' | 'declared' | 'missing'
}

export interface EntryInfo {
  entry: string
  exists: boolean
}

export interface Detected {
  pkg: PackageJson | null
  packageManager: PackageManager
  framework: Framework
  typescript: boolean
  entry: string
  exists: boolean
  react: ReactInfo
  aliasedInstall: string | null
  legacyInstall: string | null
}

export type CheckStatus = 'pass' | 'warn' | 'fail'

/**
 * Result of one verification. `status` carries the three-way outcome; `ok` is the
 * boolean shorthand. A `warn` is not ok but does not fail the run (e.g. React not
 * detected at all, versus a hard `fail` like a missing stylesheet import).
 */
export interface Check {
  id: string
  title: string
  ok: boolean
  status: CheckStatus
  detail?: string
  fix?: string
}

/**
 * One pending change to a compilerOptions key. `merge` appends to an array value
 * (used for `lib`) instead of replacing it. `load` marks options that actually
 * break consumption, which doctor reports as failures rather than optional extras.
 */
export interface TsconfigChange {
  key: string
  from: unknown
  to: unknown
  merge?: boolean
  load?: boolean
}

export interface CliOptions {
  cwd: string
  dry: boolean
  yes: boolean
}
