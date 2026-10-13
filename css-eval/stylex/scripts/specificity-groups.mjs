/**
 * StyleX resolves shorthand-vs-longhand precedence (e.g. `padding` vs
 * `paddingTop`) with priority groups: rules are sorted by priority and each group
 * gets `:not(#\#)` specificity bumps (or an `@layer priorityN`). The bump count is
 * the group's INDEX within the compiled stylesheet, not its absolute level
 * (`packages/@stylexjs/babel-plugin/src/index.js`, `processStylexRules`).
 *
 * That is correct when one compiler sees the whole page, and it is what the
 * StyleX design assumes. With several independently precompiled stylesheets
 * (library + app, or two library versions) the same level can get different
 * bump counts in different sheets. This script shows the concrete consequence
 * and the single-compile baseline.
 */
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {transformSync} from '@babel/core'
import stylexPlugin from '@stylexjs/babel-plugin'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function rulesOf(source, filename) {
  const result = transformSync(source, {
    filename: path.join(root, filename),
    babelrc: false,
    configFile: false,
    plugins: [
      [
        stylexPlugin,
        {
          dev: false,
          runtimeInjection: false,
          unstable_moduleResolution: {type: 'commonJS', rootDir: root},
        },
      ],
    ],
  })
  return result.metadata.stylex
}

const LIB = `
import * as stylex from '@stylexjs/stylex'
export const tokens = stylex.defineVars({space: '12px'})
export const styles = stylex.create({
  root: {padding: tokens.space, borderRadius: 3, color: 'red', width: 100},
})
`
const APP = `
import * as stylex from '@stylexjs/stylex'
export const styles = stylex.create({
  flush: {paddingTop: 0},
})
`

const libRules = rulesOf(LIB, 'lib.stylex.js')
const appRules = rulesOf(APP, 'app.js')

const bumps = (css, decl) => {
  const line = css.split('\n').find((l) => l.includes(`{${decl}`))
  return {selector: line?.slice(0, line.indexOf('{')), bumps: (line?.match(/:not\(#\\#\)/g) ?? []).length}
}

const lines = []
const log = (s = '') => {
  lines.push(s)
  console.log(s)
}

log('=== separately compiled sheets (precompiled library + consumer app) ===')
const libCss = stylexPlugin.processStylexRules(libRules, false)
const appCss = stylexPlugin.processStylexRules(appRules, false)
const libPadding = bumps(libCss, 'padding:')
const appPaddingTop = bumps(appCss, 'padding-top:')
log(`library  padding      → ${libPadding.selector}  (${libPadding.bumps} bump(s): level 1 is group #${libPadding.bumps} of the library sheet)`)
log(`app      padding-top  → ${appPaddingTop.selector}  (${appPaddingTop.bumps} bump(s): level 4 is the ONLY group of the app sheet)`)
const broken = appPaddingTop.bumps <= libPadding.bumps
log(
  broken
    ? '→ On an element combining both (stylex.props(lib.root, app.flush)), the longhand `padding-top: 0` does NOT reliably beat the shorthand `padding: 12px`: equal or lower specificity, so stylesheet order decides. StyleX semantics require the longhand to win.'
    : '→ longhand wins as intended',
)

log('\n=== one compile over both modules (the model StyleX is designed for) ===')
const allCss = stylexPlugin.processStylexRules([...libRules, ...appRules], false)
const p = bumps(allCss, 'padding:')
const pt = bumps(allCss, 'padding-top:')
log(`padding      → ${p.selector}  (${p.bumps} bumps)`)
log(`padding-top  → ${pt.selector}  (${pt.bumps} bumps)`)
log('→ longhand wins regardless of order.')

log('\n=== with useLayers: true (layer names are also index-based) ===')
log(stylexPlugin.processStylexRules(appRules, true).split('\n')[1])
log(stylexPlugin.processStylexRules(libRules, true).split('\n')[1])
log('→ `priority1` means level 4 in the app sheet but level 0 in the library sheet; the first `@layer` statement on the page fixes the layer order for all sheets.')

log('\nScope: this only matters when ONE element merges styles from two precompiled sheets (a library style prop + app override), or shorthand/longhand pairs straddle sheets. Two versions of a library never share an element. Mitigations: (a) compile library source in the consumer (StyleX default model, `externalPackages`), (b) make bumps absolute (`Math.floor(priority / 1000)` instead of the group index — a one-line upstream change), (c) libraries avoid shorthands in styles consumers may override.')

fs.mkdirSync(path.join(root, 'evidence'), {recursive: true})
fs.writeFileSync(path.join(root, 'evidence', 'specificity-groups.txt'), lines.join('\n') + '\n')
