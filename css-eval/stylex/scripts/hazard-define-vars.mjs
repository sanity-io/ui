/**
 * Demonstrates the one non-content-addressed identifier in StyleX — `defineVars`
 * names — by compiling the same tokens file as two versions of one package:
 *
 *  1. stock `unstable_moduleResolution: {type: 'commonJS'}`
 *     → `<name>:<path>//<export>.<key>` is version-independent, so both versions
 *       declare the SAME `--var` on `:root` with DIFFERENT values: last sheet wins.
 *  2. the prototype's version-scoped canonical path (scripts/stylex-options.mjs)
 *     → distinct variable names per version, no shared `:root` declarations.
 *  3. explicit `--sui-*` keys → names are kept verbatim (an intentional, stable
 *     public theming contract, same semantics as today's `--card-bg-color`).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {transformSync} from '@babel/core'
import stylexPlugin from '@stylexjs/babel-plugin'

import {versionScopedModuleResolution} from './stylex-options.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SOURCE = (radius) => `
import * as stylex from '@stylexjs/stylex'
export const tokens = stylex.defineVars({radius2: '${radius}', bg: '#fff'})
export const named = stylex.defineVars({'--sui-radius-2': '${radius}'})
`

function compile(version, radius, resolution) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stylex-hazard-'))
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify({name: '@sanity/ui', version, type: 'module'}),
  )
  fs.mkdirSync(path.join(dir, 'src'))
  const filename = path.join(dir, 'src', 'tokens.stylex.ts')
  fs.writeFileSync(filename, SOURCE(radius))

  const result = transformSync(SOURCE(radius), {
    filename,
    babelrc: false,
    configFile: false,
    presets: ['@babel/preset-typescript'],
    plugins: [
      [
        stylexPlugin,
        {
          dev: false,
          runtimeInjection: false,
          unstable_moduleResolution:
            resolution === 'stock' ? {type: 'commonJS', rootDir: dir} : versionScopedModuleResolution(),
        },
      ],
    ],
  })
  const css = stylexPlugin.processStylexRules(result.metadata.stylex, false)
  const varGroup = /:root, \.(x[0-9a-z]+)\{(--x[0-9a-z]+):/.exec(css.replace(/\s+/g, ''))
  return {css, exportsJs: result.code.split('\n').filter((l) => l.includes('var(--')).join('\n'), varGroup}
}

const lines = []
const log = (s = '') => {
  lines.push(s)
  console.log(s)
}

for (const resolution of ['stock', 'version-scoped']) {
  log(`\n=== ${resolution} unstable_moduleResolution ===`)
  const a = compile('4.4.3', '3px', resolution)
  const b = compile('4.4.4', '4px', resolution)
  log(`@sanity/ui@4.4.3 compiled JS:\n${a.exportsJs}`)
  log(`@sanity/ui@4.4.3 CSS:\n${a.css}`)
  log(`@sanity/ui@4.4.4 compiled JS:\n${b.exportsJs}`)
  log(`@sanity/ui@4.4.4 CSS:\n${b.css}`)
  const sameNames = a.exportsJs === b.exportsJs
  log(
    sameNames
      ? '→ IDENTICAL variable names across versions: both sheets set the same `:root` custom properties to different values; whichever stylesheet loads last wins for BOTH versions. (`--sui-radius-2` is identical by design.)'
      : '→ DISTINCT hashed variable names per version: no shared `:root` declarations. The explicit `--sui-radius-2` key is kept verbatim in both, i.e. an intentionally shared contract.',
  )
}

log('\nAtomic class names, `createTheme` classes and keyframes are content hashes and never have this problem; see evidence/class-name-comparison.json.')

fs.mkdirSync(path.join(root, 'evidence'), {recursive: true})
fs.writeFileSync(path.join(root, 'evidence', 'hazard-define-vars.txt'), lines.join('\n').trimStart() + '\n')
