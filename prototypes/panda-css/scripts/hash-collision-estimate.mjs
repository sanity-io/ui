#!/usr/bin/env node
/**
 * How likely is it that two DIFFERENT atomic styles get the same hashed class
 * name? Panda's `hash: true` maps the readable atomic name (`cond:prop_value`)
 * through a 32-bit DJB2 hash encoded in base-52 (crates/pandacss_shared/src/hash.rs,
 * mirrored by `toHash` in the generated styled-system/helpers.js). A 32-bit
 * space means the birthday bound applies: P(collision) ≈ 1 − exp(−N² / 2³³).
 *
 * This script uses the generated runtime's own `toHash` over realistic atomic
 * names (every utility in the generated map × a spread of values × common
 * conditions) and counts actual collisions, next to the birthday estimate.
 */
import {execFileSync} from 'node:child_process'
import {cpSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ss = join(root, 'packages/button-v1/styled-system')
const {toHash} = await import(join(ss, 'helpers.js'))

// Property class names from the generated runtime map ("background:bg/1,…").
const cssSource = readFileSync(join(ss, 'css/css.js'), 'utf8')
const map = cssSource.match(/const utilities = "([^"]+)"/)[1]
const props = map.split(',').map((u) => u.split(':')[1].split('/')[0]).filter(Boolean)

const values = [
  ...['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '64', 'auto', 'full', 'none', 'inherit'],
  ...['gray', 'blue', 'green', 'yellow', 'red', 'purple', 'orange', 'cyan', 'magenta'].flatMap((h) => ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((t) => `${h}.${t}`)),
  ...['tone.default.bg', 'tone.primary.bg', 'tone.positive.bg', 'tone.caution.bg', 'tone.critical.bg', 'fg.base', 'bg.base', 'focusRing'],
  ...Array.from({length: 40}, (_, i) => `[${i * 3}px]`),
]
const conditions = ['', 'hover:', 'focus-visible:', 'disabled:', 'dark:', 'active:', 'md:', 'lg:', 'hover:dark:']

const names = []
for (const c of conditions) for (const p of props) for (const v of values) names.push(`${c}${p}_${v}`)

const report = {}
for (const n of [2000, 5000, 10000, 20000, 50000, 100000, names.length]) {
  const seen = new Map()
  let collisions = 0
  const examples = []
  // Deterministic pseudo-random sample so different N are comparable.
  const step = Math.max(1, Math.floor(names.length / n))
  let count = 0
  for (let i = 0; i < names.length && count < n; i += step, count++) {
    const name = names[i]
    const h = toHash(name)
    if (seen.has(h) && seen.get(h) !== name) {
      collisions++
      if (examples.length < 3) examples.push([seen.get(h), name, h])
    } else seen.set(h, name)
  }
  const birthday = 1 - Math.exp(-(count * count) / 2 ** 33)
  report[count] = {collisions, birthdayEstimate: `${(birthday * 100).toFixed(2)}%`, expectedPairs: (count * count) / 2 ** 33, examples}
}
console.log(`distinct atomic names generated: ${names.length} (props ${props.length} × values ${values.length} × conditions ${conditions.length})`)
console.log('N names → actual colliding pairs | birthday P(≥1 collision) | expected colliding pairs')
for (const [n, r] of Object.entries(report)) console.log(`  ${String(n).padStart(7)} → ${String(r.collisions).padStart(3)} | ${r.birthdayEstimate.padStart(7)} | ${r.expectedPairs.toFixed(3)}${r.examples.length ? `  e.g. ${r.examples.map((e) => `${e[0]} ≡ ${e[1]} (${e[2]})`).join('; ')}` : ''}`)

// Reproduce one colliding pair inside a single build and show what the compiler does with it.
const pkg = join(root, 'packages/button-v1')
const dir = join(pkg, '.scale/collide')
rmSync(dir, {recursive: true, force: true})
mkdirSync(join(dir, 'src'), {recursive: true})
mkdirSync(join(dir, 'dist'))
cpSync(join(pkg, 'panda.config.ts'), join(dir, 'panda.config.ts'))
cpSync(join(pkg, 'package.json'), join(dir, 'package.json'))
cpSync(join(pkg, 'src/theme'), join(dir, 'src/theme'), {recursive: true})
writeFileSync(
  join(dir, 'src/collide.tsx'),
  `import {css} from '../../../styled-system/css'
export const a: string = css({bg: '[39px]'})
export const b: string = css({borderRight: 'red.50'})
`,
)
const out = execFileSync(join(pkg, 'node_modules/.bin/panda'), ['cssgen', '--cwd', dir, '--outfile', 'dist/styles.css'], {encoding: 'utf8'})
const generated = readFileSync(join(dir, 'dist/styles.css'), 'utf8')
const h = toHash('bg_[39px]')
const rules = [...generated.matchAll(new RegExp(`\\.sui-v4-${h}\\s*\\{[^}]*\\}`, 'g'))].map((m) => m[0].replace(/\s+/g, ' '))
rmSync(join(pkg, '.scale'), {recursive: true, force: true})
console.log(`\nIntra-build reproduction: css({bg: '[39px]'}) and css({borderRight: 'red.50'}) both hash to ${h}`)
console.log(`  compiler output: ${out.trim()}`)
console.log(`  rules emitted under .sui-v4-${h}: ${rules.length}`)
for (const r of rules) console.log(`    ${r}`)
console.log(rules.length > 1 ? '  → silent collision: both rules apply to any element carrying either atom; no diagnostic.' : '  → no collision reproduced')
writeFileSync(join(root, 'results/hash-collision-estimate.json'), JSON.stringify({report, reproduction: {hash: h, compilerOutput: out.trim(), rules}}, null, 2) + '\n')
