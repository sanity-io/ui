/**
 * Output parity: official `@stylexjs/babel-plugin` vs the Rust port
 * `@stylexswc/rs-compiler`, with identical options, over
 *  - the Button library sources (v1 and v2),
 *  - the synthetic 300-file set (generated if missing),
 * comparing per file: the set of class names referenced in the compiled JS, the
 * rule metadata (class → rule text + priority), and the assembled stylesheet
 * (`processStylexRules`) byte for byte.
 *
 * Then an end-to-end check: the v1 library built through tsdown with each
 * compiler (stock StyleX settings on both sides), comparing `dist/stylex.css`
 * (normalized with lightningcss, since only the Babel unplugin runs it) and the
 * class names in `dist/index.js`.
 */
import {spawnSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {transformSync} from '@babel/core'
import stylexPlugin from '@stylexjs/babel-plugin'
import {transform as rsTransform} from '@stylexswc/rs-compiler'
import {transform as lightningcss} from 'lightningcss'

import {generateSynthetic, generatedDir} from './gen-synthetic.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const lines = []
const log = (s = '') => {
  lines.push(s)
  console.log(s)
}

const options = (rootDir) => ({
  dev: false,
  runtimeInjection: false,
  unstable_moduleResolution: {type: 'commonJS', rootDir},
})

function babel(file, rootDir) {
  const code = fs.readFileSync(file, 'utf8')
  const r = transformSync(code, {
    filename: file,
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-typescript', {isTSX: true, allExtensions: true}]],
    plugins: [[stylexPlugin, options(rootDir)]],
  })
  return {code: r.code, rules: r.metadata.stylex}
}

function rs(file, rootDir) {
  const code = fs.readFileSync(file, 'utf8')
  const r = rsTransform(file, code, options(rootDir))
  return {code: r.code, rules: r.metadata.stylex}
}

const classNames = (code) => new Set(code.match(/\bx[0-9a-z]{4,}\b/g) ?? [])
const varNames = (code) => new Set(code.match(/--x[0-9a-z-]+/g) ?? [])
const ruleMap = (rules) =>
  new Map(rules.map(([key, rule, priority]) => [key, JSON.stringify({ltr: rule.ltr, rtl: rule.rtl ?? null, priority})]))
const setEq = (a, b) => a.size === b.size && [...a].every((x) => b.has(x))

function compareSet(label, files, rootDir) {
  let filesCompared = 0
  let classMismatch = 0
  let varMismatch = 0
  let ruleMismatch = 0
  let babelRules = 0
  let rsRules = 0
  const allBabel = []
  const allRs = []
  const examples = []
  for (const file of files) {
    const b = babel(file, rootDir)
    const r = rs(file, rootDir)
    filesCompared++
    allBabel.push(...b.rules)
    allRs.push(...r.rules)
    const bm = ruleMap(b.rules)
    const rm = ruleMap(r.rules)
    babelRules += bm.size
    rsRules += rm.size
    if (!setEq(classNames(b.code), classNames(r.code))) {
      classMismatch++
      if (examples.length < 3) examples.push({file: path.relative(root, file), kind: 'classNames', babel: [...classNames(b.code)].filter((c) => !classNames(r.code).has(c)), rs: [...classNames(r.code)].filter((c) => !classNames(b.code).has(c))})
    }
    if (!setEq(varNames(b.code), varNames(r.code))) varMismatch++
    const sameRules = bm.size === rm.size && [...bm].every(([k, v]) => rm.get(k) === v)
    if (!sameRules) {
      ruleMismatch++
      if (examples.length < 3) examples.push({file: path.relative(root, file), kind: 'rules', babelOnly: [...bm].filter(([k, v]) => rm.get(k) !== v).slice(0, 3), rsOnly: [...rm].filter(([k, v]) => bm.get(k) !== v).slice(0, 3)})
    }
  }
  const cssBabel = stylexPlugin.processStylexRules(allBabel, false)
  const cssRs = stylexPlugin.processStylexRules(allRs, false)
  const cssIdentical = cssBabel === cssRs
  log(`\n=== ${label}: ${filesCompared} files`)
  log(`distinct rules            babel ${babelRules} / rs ${rsRules}`)
  log(`class-name set mismatches ${classMismatch}`)
  log(`variable-name mismatches  ${varMismatch}`)
  log(`rule-metadata mismatches  ${ruleMismatch}`)
  log(`assembled CSS byte-identical: ${cssIdentical} (${cssBabel.length} B)`)
  for (const e of examples) log(`  example: ${JSON.stringify(e)}`)
  return {label, filesCompared, babelRules, rsRules, classMismatch, varMismatch, ruleMismatch, cssIdentical, cssBytes: cssBabel.length}
}

const results = {sets: []}
for (const v of ['button-v1', 'button-v2']) {
  const dir = path.join(root, 'packages', v)
  const files = ['src/tokens.stylex.ts', 'src/theme.ts', 'src/button.tsx'].map((f) => path.join(dir, f))
  results.sets.push(compareSet(v, files, dir))
}
{
  const dir = path.join(generatedDir, 'synthetic-300')
  if (!fs.existsSync(path.join(dir, 'src', 'index.ts'))) generateSynthetic(300)
  const files = fs
    .readdirSync(path.join(dir, 'src'))
    .filter((f) => f.endsWith('.tsx') || f.endsWith('.stylex.ts'))
    .map((f) => path.join(dir, 'src', f))
  results.sets.push(compareSet('synthetic-300', files, dir))
}

// --- end to end through tsdown -------------------------------------------------
log('\n=== end-to-end: v1 library built with tsdown, stock StyleX settings on both compilers')
const libDir = path.join(root, 'packages', 'button-v1')
const tsdownBin = path.join(root, 'node_modules', '.bin', 'tsdown')
const build = (env) => {
  const r = spawnSync(tsdownBin, [], {cwd: libDir, stdio: 'pipe', env: {...process.env, ...env}})
  if (r.status !== 0) throw new Error(String(r.stdout) + String(r.stderr))
  return {
    css: fs.readFileSync(path.join(libDir, 'dist', 'stylex.css'), 'utf8'),
    js: fs.readFileSync(path.join(libDir, 'dist', 'index.js'), 'utf8') + fs.readFileSync(path.join(libDir, 'dist', 'tokens.stylex.js'), 'utf8'),
  }
}
const minify = (css) => lightningcss({filename: 'x.css', code: Buffer.from(css), minify: true}).code.toString()
const ruleList = (css) => minify(css).split(/(?<=})/).filter(Boolean)
const outBabel = build({STYLEX_COMPILER: 'babel', STYLEX_BABEL_STOCK_RESOLUTION: '1'})
const outRs = build({STYLEX_COMPILER: 'rs', STYLEX_RS_STOCK_PREFIX: '1'})
const babelRules = ruleList(outBabel.css)
const rsRules = ruleList(outRs.css)
const e2e = {
  rawCssIdentical: outBabel.css === outRs.css,
  normalizedCssIdentical: minify(outBabel.css) === minify(outRs.css),
  babelCssBytes: outBabel.css.length,
  rsCssBytes: outRs.css.length,
  ruleCount: {babel: babelRules.length, rs: rsRules.length},
  // the Babel unplugin runs lightningcss with browserslist targets (vendor
  // prefixes); the Rust unplugin emits the assembled CSS as-is
  rulesOnlyInBabelOutput: babelRules.filter((r) => !rsRules.includes(r)),
  rulesOnlyInRsOutput: rsRules.filter((r) => !babelRules.includes(r)),
  jsClassNamesIdentical: setEq(classNames(outBabel.js), classNames(outRs.js)),
  jsVarNamesIdentical: setEq(varNames(outBabel.js), varNames(outRs.js)),
  jsClassNameCount: classNames(outBabel.js).size,
}
log(`dist/stylex.css raw identical: ${e2e.rawCssIdentical} (babel ${e2e.babelCssBytes} B after its lightningcss pass, rs ${e2e.rsCssBytes} B raw)`)
log(`dist/stylex.css identical after lightningcss normalization: ${e2e.normalizedCssIdentical} (${e2e.ruleCount.babel} vs ${e2e.ruleCount.rs} rules)`)
log(`  only in babel output: ${JSON.stringify(e2e.rulesOnlyInBabelOutput)}`)
log(`  only in rs output:    ${JSON.stringify(e2e.rulesOnlyInRsOutput)}`)
log(`dist/index.js class names identical: ${e2e.jsClassNamesIdentical} (${e2e.jsClassNameCount}); variable names identical: ${e2e.jsVarNamesIdentical}`)
results.endToEnd = e2e

// restore the default (Babel, version-scoped) build
build({STYLEX_COMPILER: 'babel'})

fs.mkdirSync(path.join(root, 'evidence'), {recursive: true})
fs.writeFileSync(path.join(root, 'evidence', 'parity.json'), JSON.stringify(results, null, 2))
fs.writeFileSync(path.join(root, 'evidence', 'parity.txt'), lines.join('\n').trimStart() + '\n')
console.log('\n✔ wrote evidence/parity.{json,txt}')
