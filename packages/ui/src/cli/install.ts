import {spawnSync} from 'node:child_process'
import process from 'node:process'

import {isPackageInstalled, PACKAGE_NAME} from './detect.js'
import {readSelfPackage} from './selfPackage.js'
import type {PackageManager} from './types.js'

const ICONS = '@sanity/icons'
const DEV_FLAG: Record<PackageManager, string> = {
  npm: '--save-dev',
  pnpm: '-D',
  yarn: '-D',
  bun: '-d',
}

export interface InstallResult {
  ok: boolean
  command: string
  args: string[]
  reason?: 'spawn' | 'exit'
  message?: string
  status?: number | null
}

/** Strips range operators to the exact floor version, e.g. "^3.7.4" -> "3.7.4". */
function exactFromRange(range: string | undefined): string | null {
  if (typeof range !== 'string') return null
  const match = range.match(/\d+\.\d+\.\d+(?:-[\w.]+)?/)
  return match ? match[0] : null
}

/**
 * Builds the exact specs to install from this package's own manifest: the
 * package at its shipped version, and icons at the version it declares in
 * dependencies. Nothing here is invented.
 *
 * Icons is already a dependency, so the package manager installs it either way.
 * It is listed explicitly because apps import icons directly to pass to
 * components (`import {AddIcon} from '@sanity/icons/Add'`, then
 * `<Button iconStart={AddIcon} />`), and under pnpm an import that
 * isn't in the app's own package.json doesn't resolve. Dependencies the app
 * never imports itself (react-refractor, clsx) are left to the package manager.
 * React/react-dom are peers that belong to the host app, so they are left out
 * too (the prereq check verifies them).
 */
export function resolveInstallSpecs(): string[] {
  const self = readSelfPackage()
  const deps = self.dependencies ?? {}

  const specs = [`${PACKAGE_NAME}@${self.version ?? 'latest'}`]

  const iconsVersion = exactFromRange(deps[ICONS])
  specs.push(iconsVersion ? `${ICONS}@${iconsVersion}` : ICONS)

  return specs
}

/**
 * The React type packages a TypeScript project needs to type-check JSX and the
 * component props. Only the ones not already installed are returned, pinned to
 * the project's React major (defaulting to the supported React 19).
 */
export function resolveTypeSpecs(cwd: string, {reactMajor = 19} = {}): string[] {
  const major = Number.isInteger(reactMajor) ? reactMajor : 19
  return ['@types/react', '@types/react-dom']
    .filter((name) => !isPackageInstalled(cwd, name))
    .map((name) => `${name}@^${major}`)
}

export function installCommand(
  packageManager: PackageManager,
  specs: string[],
  {dev = false} = {},
): {command: string; args: string[]} {
  const verb = packageManager === 'npm' ? 'install' : 'add'
  const flags = dev ? [DEV_FLAG[packageManager]] : []
  return {command: packageManager, args: [verb, ...flags, ...specs]}
}

/**
 * Runs the install with inherited stdio. Returns a structured result so the
 * caller can explain a peer-dependency conflict in plain language instead of
 * failing silently.
 */
export function runInstall(
  cwd: string,
  packageManager: PackageManager,
  specs: string[],
  {dev = false} = {},
): InstallResult {
  const {command, args} = installCommand(packageManager, specs, {dev})
  // On Windows the package managers are .cmd shims, and spawning them without a
  // shell throws (ENOENT, or EINVAL since the Node .cmd security fix). The args
  // are package specs we build ourselves, so there is nothing to escape.
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.error) {
    return {ok: false, reason: 'spawn', message: result.error.message, command, args}
  }
  if (result.status !== 0) {
    return {ok: false, reason: 'exit', status: result.status, command, args}
  }
  return {ok: true, command, args}
}
