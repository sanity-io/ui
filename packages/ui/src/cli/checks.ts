import {existsSync, readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, join} from 'node:path'
import process from 'node:process'

import {
  detect,
  isPackageInstalled,
  isLegacyUiVersion,
  PACKAGE_NAME,
  readInstalledPackageVersion,
} from './detect.js'
import {inspectStylesheet, STYLES_SPECIFIER} from './styles.js'
import {inspectTsconfig} from './tsconfig.js'
import type {Check, CheckStatus, Detected} from './types.js'
import {meetsNode, meetsReact, NODE_REQUIREMENT, REACT_MIN} from './versions.js'

const ICONS = '@sanity/icons'

/** Resolves the built stylesheet on disk (not the Node no-op shim). */
function resolveStylesheet(cwd: string): string | null {
  try {
    const require = createRequire(join(cwd, 'noop.js'))
    const pkgJsonPath = require.resolve(`${PACKAGE_NAME}/package.json`)
    const path = join(dirname(pkgJsonPath), 'dist/styles.css')
    return existsSync(path) ? path : null
  } catch {
    return null
  }
}

/**
 * Without a browser, "a component renders with a computed background" is
 * verified by confirming the resolved stylesheet ships the component class and
 * a background declaration for it. If both are present and the import is wired,
 * the component renders styled.
 */
function stylesheetHasComponentStyles(path: string): boolean {
  try {
    const css = readFileSync(path, 'utf8')
    return /\.sui-Card\b/.test(css) && /background/.test(css)
  } catch {
    return false
  }
}

interface CheckMeta {
  title: string
  detail?: string
  fix?: string
  status?: CheckStatus
}

function check(id: string, ok: boolean, meta: CheckMeta): Check {
  return {
    id,
    title: meta.title,
    ok,
    status: meta.status ?? (ok ? 'pass' : 'fail'),
    detail: meta.detail,
    fix: meta.fix,
  }
}

export interface CheckReport {
  detected: Detected
  checks: Check[]
  stylesheetPath: string | null
}

/**
 * Runs every verification and returns structured results. `doctor` prints them
 * all; `init` reuses a subset on exit. Pure read-only.
 */
export function collectChecks(cwd: string): CheckReport {
  const detected = detect(cwd)
  const checks: Check[] = []

  const installedVersion = readInstalledPackageVersion(cwd, PACKAGE_NAME)
  checks.push(
    check('install', Boolean(installedVersion), {
      title: 'Package installed',
      detail: installedVersion ? `${PACKAGE_NAME}@${installedVersion}` : 'not installed',
      fix: `Run \`npx ${PACKAGE_NAME}@alpha init\` or install it with your package manager`,
    }),
  )

  if (installedVersion) {
    const legacyInstalled = isLegacyUiVersion(installedVersion)
    checks.push(
      check('version', !legacyInstalled, {
        title: 'Package version',
        detail: legacyInstalled
          ? `${PACKAGE_NAME}@${installedVersion} is pre-v5 (expected v5)`
          : `${PACKAGE_NAME}@${installedVersion}`,
        fix: `Remove the existing @sanity/ui version, or install v5 with a package alias — see README "For apps using Sanity UI v3"`,
      }),
    )
  }

  const iconsInstalled = isPackageInstalled(cwd, ICONS)
  checks.push(
    check('icons', iconsInstalled, {
      title: 'Icons installed',
      detail: iconsInstalled ? `${ICONS} present` : `${ICONS} missing`,
      fix: `Install it: add ${ICONS}`,
    }),
  )

  const stylesheetPath = resolveStylesheet(cwd)
  const stylesheetResolves = Boolean(stylesheetPath)
  checks.push(
    check('stylesheet-resolves', stylesheetResolves, {
      title: 'Stylesheet resolves',
      detail: stylesheetResolves ? `${PACKAGE_NAME}/styles.css` : 'cannot resolve styles.css',
      fix: 'Reinstall the package, or build it if working inside this monorepo',
    }),
  )

  const stylesheet = inspectStylesheet(cwd, detected.entry)
  checks.push(
    check('stylesheet-wired', stylesheet.imported, {
      title: 'Stylesheet imported',
      detail: stylesheet.imported
        ? `imported in ${stylesheet.importedIn ?? detected.entry}`
        : stylesheet.exists
          ? `missing from ${detected.entry}`
          : `entry file ${detected.entry} not found`,
      fix: `Add \`import '${STYLES_SPECIFIER}'\` to ${detected.entry}`,
    }),
  )

  if (detected.typescript) {
    const tsconfig = inspectTsconfig(cwd)
    const loadBearing = tsconfig.changes.filter((c) => c.load)
    // An unreadable file has no changes to report, so guard against it explicitly
    // rather than letting an empty change list read as "all good".
    const ok = tsconfig.exists && !tsconfig.unreadable && loadBearing.length === 0
    checks.push(
      check('tsconfig', ok, {
        title: 'tsconfig options',
        detail: !tsconfig.exists
          ? 'tsconfig.json not found'
          : tsconfig.unreadable
            ? 'tsconfig.json could not be parsed'
            : loadBearing.length === 0
              ? tsconfig.changes.length === 0
                ? 'all required options set'
                : 'required options set (some optional additions available)'
              : `needs: ${loadBearing.map((c) => `${c.key}: ${String(c.to)}`).join(', ')}`,
        fix: tsconfig.unreadable
          ? 'Fix the JSON syntax in tsconfig.json'
          : `Run \`npx ${PACKAGE_NAME}@alpha init\` to reconcile tsconfig.json`,
      }),
    )
  }

  const reactVersion = detected.react.version
  const reactOk = reactVersion ? meetsReact(reactVersion) : false
  checks.push(
    check('react', reactOk, {
      title: 'React version',
      status: reactVersion ? (reactOk ? 'pass' : 'fail') : 'warn',
      detail: reactVersion ? `react ${reactVersion}` : 'react not detected',
      fix: `Upgrade React to >= ${REACT_MIN}`,
    }),
  )

  const nodeVersion = process.versions.node
  checks.push(
    check('node', meetsNode(nodeVersion), {
      title: 'Node version',
      detail: `node ${nodeVersion} (requires ${NODE_REQUIREMENT})`,
      fix: `Use Node ${NODE_REQUIREMENT}`,
    }),
  )

  return {detected, checks, stylesheetPath}
}

/** The subset `init` verifies on exit, plus the render probe. */
export function verifyAfterInit(cwd: string): Check[] {
  const {checks, stylesheetPath} = collectChecks(cwd)
  const ids = new Set(['stylesheet-resolves', 'stylesheet-wired', 'tsconfig'])
  const subset = checks.filter((c) => ids.has(c.id))

  const probeOk = stylesheetPath ? stylesheetHasComponentStyles(stylesheetPath) : false
  subset.push({
    id: 'probe',
    title: 'Probe renders with background',
    ok: probeOk,
    status: probeOk ? 'pass' : 'fail',
    detail: stylesheetPath
      ? 'Card ships a background declaration'
      : 'stylesheet not resolved, cannot probe',
    fix: 'Ensure the package is installed and built',
  })

  return subset
}
