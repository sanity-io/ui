import {collectChecks} from './checks.js'
import {detect, LEGACY_COEXISTENCE_HINT, PACKAGE_NAME} from './detect.js'
import {color, fail, heading, info, success, warn} from './log.js'
import type {Check, CliOptions} from './types.js'

export function printChecks(checks: Check[]): void {
  for (const c of checks) {
    const label = `${color.bold(c.title)}${c.detail ? ` ${color.dim(`— ${c.detail}`)}` : ''}`
    if (c.status === 'pass') success(label)
    else if (c.status === 'warn') warn(label)
    else fail(label)

    if (c.status !== 'pass' && c.fix) {
      info(`  ${color.dim('fix:')} ${c.fix}`)
    }
  }
}

/** Runs every check and prints it. Returns 1 only when something fails; warnings still pass. */
export function runDoctor({cwd}: Pick<CliOptions, 'cwd'>): number {
  const detected = detect(cwd)

  heading('Sanity UI doctor')

  if (detected.aliasedInstall) {
    warn(
      `This project installs v5 under the alias "${detected.aliasedInstall}". doctor checks direct @sanity/ui v5 installs only.`,
    )
    info(`  ${color.dim('hint:')} ${LEGACY_COEXISTENCE_HINT}`)
    return 0
  }

  if (detected.legacyInstall) {
    warn(
      `This project has ${PACKAGE_NAME}@${detected.legacyInstall} (pre-v5). doctor checks v5 installs only.`,
    )
    info(`  ${color.dim('hint:')} ${LEGACY_COEXISTENCE_HINT}`)
    return 0
  }

  const {checks} = collectChecks(cwd)
  info(
    color.dim(
      `framework: ${detected.framework} · package manager: ${detected.packageManager} · entry: ${detected.entry}`,
    ),
  )
  info('')

  printChecks(checks)

  const failed = checks.filter((c) => c.status === 'fail')
  const warned = checks.filter((c) => c.status === 'warn')

  info('')
  if (failed.length === 0 && warned.length === 0) {
    success('Everything looks good.')
    return 0
  }
  if (failed.length === 0) {
    warn(`${warned.length} warning${warned.length === 1 ? '' : 's'}, no blocking issues.`)
    return 0
  }
  fail(`${failed.length} issue${failed.length === 1 ? '' : 's'} found. See fixes above.`)
  return 1
}
