import {basename} from 'node:path'
import process from 'node:process'

import {verifyAfterInit} from './checks.js'
import {buildConfig, CONFIG_FILE, configExists, writeConfig} from './config.js'
import {detect, LEGACY_COEXISTENCE_HINT, PACKAGE_NAME} from './detect.js'
import {printChecks} from './doctor.js'
import {installCommand, resolveInstallSpecs, resolveTypeSpecs, runInstall} from './install.js'
import {color, confirm, fail, heading, info, step, success, warn} from './log.js'
import {inspectStylesheet, STYLES_SPECIFIER, wireStylesheet} from './styles.js'
import type {StylesheetInfo} from './styles.js'
import {inspectTsconfig, reconcileTsconfig} from './tsconfig.js'
import type {TsconfigInspection} from './tsconfig.js'
import type {CliOptions, Detected} from './types.js'
import {meetsNode, meetsReact, NODE_REQUIREMENT, REACT_MIN} from './versions.js'

interface Plan {
  specs: string[]
  typeSpecs: string[]
  install: string
  stylesheet: StylesheetInfo
  tsconfig: TsconfigInspection | null
}

/**
 * Prints the React and Node checks. Missing React only warns, since the user may
 * be scaffolding before installing it; an out-of-range React or Node sets
 * `blocking`. `blocking` never hard-stops init. It only triggers a louder warning
 * before the apply confirmation, so the user stays in control either way.
 */
function reportPrereqs({react}: Detected): {blocking: boolean} {
  let blocking = false

  const reactVersion = react.version
  if (!reactVersion) {
    warn(`React not detected. This package needs React >= ${REACT_MIN}.`)
  } else if (meetsReact(reactVersion)) {
    success(`React ${reactVersion} meets the >= ${REACT_MIN} requirement.`)
  } else {
    warn(`React ${reactVersion} is below ${REACT_MIN}. Components may not render correctly.`)
    info(`  ${color.dim('fix:')} Upgrade React to >= ${REACT_MIN}`)
    blocking = true
  }

  const nodeVersion = process.versions.node
  if (meetsNode(nodeVersion)) {
    success(`Node ${nodeVersion} meets the ${NODE_REQUIREMENT} requirement.`)
  } else {
    warn(`Node ${nodeVersion} is outside ${NODE_REQUIREMENT}. Install may behave unexpectedly.`)
    info(`  ${color.dim('fix:')} Use Node ${NODE_REQUIREMENT}`)
    blocking = true
  }

  return {blocking}
}

function parseReactMajor(version: string | null): number {
  const match = typeof version === 'string' ? version.match(/\d+/) : null
  return match ? Number(match[0]) : 19
}

function buildPlan(cwd: string, detected: Detected): Plan {
  const specs = resolveInstallSpecs()
  const {command, args} = installCommand(detected.packageManager, specs)
  const reactMajor = parseReactMajor(detected.react.version)
  const typeSpecs = detected.typescript ? resolveTypeSpecs(cwd, {reactMajor}) : []
  const stylesheet = inspectStylesheet(cwd, detected.entry)
  const tsconfig = detected.typescript ? inspectTsconfig(cwd) : null

  return {specs, typeSpecs, install: `${command} ${args.join(' ')}`, stylesheet, tsconfig}
}

function printPlan(cwd: string, detected: Detected, plan: Plan): void {
  heading('Plan')

  step(`Install: ${color.bold(plan.install)}`)

  if (plan.typeSpecs.length > 0) {
    step(`Dev types: ${color.bold(plan.typeSpecs.join(' '))}`)
  }

  if (plan.stylesheet.imported) {
    step(`Stylesheet: already imported in ${plan.stylesheet.importedIn ?? detected.entry}`)
  } else if (plan.stylesheet.exists) {
    step(`Stylesheet: add ${color.bold(`import '${STYLES_SPECIFIER}'`)} to ${detected.entry}`)
  } else {
    step(`Stylesheet: entry ${detected.entry} not found, will skip (add the import manually)`)
  }

  if (!detected.typescript || !plan.tsconfig) {
    step('tsconfig: no TypeScript detected, skipping')
  } else if (!plan.tsconfig.exists) {
    step('tsconfig: create tsconfig.json with required options')
  } else if (plan.tsconfig.changes.length === 0) {
    step('tsconfig: already has required options')
  } else {
    const summary = plan.tsconfig.changes.map((c) => c.key).join(', ')
    step(`tsconfig: update ${basename(plan.tsconfig.file)} (${summary})`)
  }

  step(configExists(cwd) ? `${CONFIG_FILE}: overwrite` : `${CONFIG_FILE}: create`)
}

/**
 * The init lifecycle: detect the project, report prerequisites, build and print
 * the plan, confirm, apply each step, then verify. `--dry` stops after the plan;
 * `--yes` accepts the confirmation without prompting.
 */
export async function runInit(options: CliOptions): Promise<number> {
  const {cwd, dry, yes} = options
  const detected = detect(cwd)

  heading('Sanity UI init')
  info(
    color.dim(
      `framework: ${detected.framework} · package manager: ${detected.packageManager} · entry: ${detected.entry} · typescript: ${detected.typescript}`,
    ),
  )

  if (detected.aliasedInstall) {
    fail(
      `This project installs v5 under the alias "${detected.aliasedInstall}". init is for new apps only.`,
    )
    info(`  ${color.dim('fix:')} ${LEGACY_COEXISTENCE_HINT}`)
    return 1
  }

  if (detected.legacyInstall) {
    fail(
      `This project already has ${PACKAGE_NAME}@${detected.legacyInstall} (pre-v5). init is for new apps only.`,
    )
    info(`  ${color.dim('fix:')} ${LEGACY_COEXISTENCE_HINT}`)
    return 1
  }

  heading('Requirements')
  const {blocking} = reportPrereqs(detected)

  const plan = buildPlan(cwd, detected)
  printPlan(cwd, detected, plan)

  if (dry) {
    info('')
    info(color.dim('Dry run: no changes made.'))
    return 0
  }

  if (blocking) {
    info('')
    warn('Some requirements are unmet (see above). Continuing may not work.')
  }

  // Without a TTY there's no one to answer the prompt, so confirm() falls back to
  // the default (apply). Say so explicitly rather than appearing to act silently;
  // --dry is the preview-only path for anyone who doesn't want writes.
  if (!yes && !process.stdin.isTTY) {
    info('')
    info(color.dim('Non-interactive (no TTY): applying automatically. Use --dry to preview.'))
  }

  const proceed = await confirm('\nApply these changes?', {defaultValue: true, assumeYes: yes})
  if (!proceed) {
    info('Aborted. No changes made.')
    return 0
  }

  heading('Applying')

  step(`Installing with ${detected.packageManager}…`)
  const install = runInstall(cwd, detected.packageManager, plan.specs)
  if (install.ok) {
    success('Dependencies installed.')
  } else if (install.reason === 'spawn') {
    warn(`Could not run ${detected.packageManager}: ${install.message ?? 'unknown error'}`)
    info(`  ${color.dim('fix:')} Install manually: ${install.command} ${install.args.join(' ')}`)
  } else {
    warn(`Install exited with code ${install.status ?? 'unknown'}.`)
    info(
      `  ${color.dim('hint:')} This is usually a peer-dependency conflict. Re-run the install and read the conflict, or retry with your package manager's legacy peer-deps flag.`,
    )
  }

  if (plan.typeSpecs.length > 0) {
    step('Installing React type definitions…')
    const typeInstall = runInstall(cwd, detected.packageManager, plan.typeSpecs, {dev: true})
    if (typeInstall.ok) success('Type definitions installed.')
    else warn(`Could not install ${plan.typeSpecs.join(' ')}. Add them manually.`)
  }

  if (plan.stylesheet.exists && !plan.stylesheet.imported) {
    const wired = wireStylesheet(cwd, detected.entry, {dryRun: false})
    if (wired.wrote) success(`Imported the stylesheet in ${detected.entry}.`)
  } else if (plan.stylesheet.imported) {
    success('Stylesheet already imported.')
  } else {
    warn(`Could not find ${detected.entry}. Add \`import '${STYLES_SPECIFIER}'\` manually.`)
  }

  if (detected.typescript) {
    const result = reconcileTsconfig(cwd, {dryRun: false})
    if (result.created) success('Created tsconfig.json with required options.')
    else if (result.unreadable) warn('tsconfig.json could not be parsed; left untouched.')
    else if (result.changes.length === 0) success('tsconfig already has the required options.')
    else success(`Updated tsconfig: ${result.changes.map((c) => c.key).join(', ')}.`)
  }

  const config = buildConfig({framework: detected.framework, entry: detected.entry})
  writeConfig(cwd, config)
  success(`Wrote ${CONFIG_FILE}.`)

  heading('Verifying')
  const results = verifyAfterInit(cwd)
  printChecks(results)

  const failed = results.filter((c) => c.status === 'fail')
  info('')
  if (failed.length === 0) {
    success('Setup verified. Import components from @sanity/ui and start building.')
    return 0
  }
  fail(
    `${failed.length} check${failed.length === 1 ? '' : 's'} failed. Run \`npx ${PACKAGE_NAME}@alpha doctor\` for details.`,
  )
  return 1
}
