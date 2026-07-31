import {existsSync, readFileSync} from 'node:fs'
import {join} from 'node:path'

import type {Detected, EntryInfo, Framework, PackageJson, PackageManager, ReactInfo} from './types.js'

export const PACKAGE_NAME = '@sanity-labs/ui-poc'

/**
 * Framework ids map 1:1 to the `framework` field written into sanity-ui.json.
 * Each carries the ordered list of candidate entry files where the stylesheet
 * import belongs.
 */
const FRAMEWORK_ENTRIES: Record<Framework, string[]> = {
  'next-app': ['app/layout.tsx', 'app/layout.jsx', 'src/app/layout.tsx', 'src/app/layout.jsx'],
  'next-pages': ['pages/_app.tsx', 'pages/_app.jsx', 'src/pages/_app.tsx', 'src/pages/_app.jsx'],
  'react-router': ['app/root.tsx', 'app/root.jsx'],
  remix: ['app/root.tsx', 'app/root.jsx'],
  vite: ['src/main.tsx', 'src/main.jsx', 'src/main.ts'],
  astro: [],
  react: ['src/index.tsx', 'src/main.tsx', 'src/index.jsx', 'src/main.jsx'],
}

export function readPackageJson(cwd: string): PackageJson | null {
  const file = join(cwd, 'package.json')
  if (!existsSync(file)) return null
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as PackageJson
  } catch {
    return null
  }
}

function allDeps(pkg: PackageJson | null): Record<string, string | undefined> {
  if (!pkg) return {}
  return {...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies}
}

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
  if (existsSync(join(cwd, 'package-lock.json'))) return 'npm'

  const declared = readPackageJson(cwd)?.packageManager
  if (typeof declared === 'string') {
    const name = declared.split('@')[0]
    if (name === 'pnpm' || name === 'yarn' || name === 'npm' || name === 'bun') return name
  }
  return 'npm'
}

export function detectFramework(cwd: string, pkg: PackageJson | null = readPackageJson(cwd)): Framework {
  const deps = allDeps(pkg)
  const has = (name: string): boolean => Boolean(deps[name])
  const dir = (relative: string): boolean => existsSync(join(cwd, relative))

  if (has('next')) {
    if (dir('app') || dir('src/app')) return 'next-app'
    if (dir('pages') || dir('src/pages')) return 'next-pages'
    return 'next-app'
  }
  if (has('@remix-run/react') || has('@remix-run/dev')) return 'remix'
  if (has('@react-router/dev') || has('react-router')) return 'react-router'
  if (has('astro')) return 'astro'
  if (has('vite')) return 'vite'
  return 'react'
}

export function detectTypeScript(cwd: string, pkg: PackageJson | null = readPackageJson(cwd)): boolean {
  return existsSync(join(cwd, 'tsconfig.json')) || Boolean(allDeps(pkg)['typescript'])
}

/**
 * Returns the first existing candidate entry file, otherwise the first
 * candidate as the place to create one. Astro has no fixed entry, so we look
 * for a layout component.
 */
export function detectEntry(cwd: string, framework: Framework): EntryInfo {
  if (framework === 'astro') return detectAstroLayout(cwd)

  const candidates = FRAMEWORK_ENTRIES[framework]
  const existing = candidates.find((rel) => existsSync(join(cwd, rel)))
  return {entry: existing ?? candidates[0] ?? 'src/index.tsx', exists: Boolean(existing)}
}

function detectAstroLayout(cwd: string): EntryInfo {
  const candidates = [
    'src/layouts/Layout.astro',
    'src/layouts/BaseLayout.astro',
    'src/layouts/index.astro',
    'src/pages/index.astro',
  ]
  const existing = candidates.find((rel) => existsSync(join(cwd, rel)))
  return {entry: existing ?? candidates[0] ?? 'src/layouts/Layout.astro', exists: Boolean(existing)}
}

/**
 * Resolves the installed React version from node_modules, falling back to the
 * declared range in package.json (carets/tildes stripped).
 */
export function detectReactVersion(cwd: string, pkg: PackageJson | null = readPackageJson(cwd)): ReactInfo {
  const installed = readInstalledVersion(cwd, 'react')
  if (installed) return {version: installed, source: 'installed'}

  const declared = allDeps(pkg)['react']
  if (typeof declared === 'string') {
    return {version: declared.replace(/^[\^~>=<\s]+/, ''), source: 'declared'}
  }
  return {version: null, source: 'missing'}
}

function readInstalledVersion(cwd: string, name: string): string | null {
  const file = join(cwd, 'node_modules', name, 'package.json')
  if (!existsSync(file)) return null
  try {
    const pkg = JSON.parse(readFileSync(file, 'utf8')) as PackageJson
    return pkg.version ?? null
  } catch {
    return null
  }
}

export function isPackageInstalled(cwd: string, name: string): boolean {
  return existsSync(join(cwd, 'node_modules', name, 'package.json'))
}

export function readInstalledPackageVersion(cwd: string, name: string): string | null {
  return readInstalledVersion(cwd, name)
}

export function detect(cwd: string): Detected {
  const pkg = readPackageJson(cwd)
  const framework = detectFramework(cwd, pkg)
  const entry = detectEntry(cwd, framework)
  const typescript = detectTypeScript(cwd, pkg) || (entry.exists && /\.tsx?$/.test(entry.entry))
  return {
    pkg,
    packageManager: detectPackageManager(cwd),
    framework,
    typescript,
    ...entry,
    react: detectReactVersion(cwd, pkg),
  }
}
