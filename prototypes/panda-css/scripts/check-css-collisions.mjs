#!/usr/bin/env node
/**
 * Static proof: compares the two published stylesheets and classifies every
 * selector that appears in BOTH:
 *
 *  - identical declarations  → harmless duplicate (same name, same content)
 *  - different declarations  → a COLLISION (same name, different content)
 *
 * The atomic (cva) Button classes must produce zero collisions. The config
 * recipe `badge` (negative control) and the `:root` token defaults are expected
 * to collide and are reported separately, so the boundary is visible.
 *
 * It also checks each stylesheet on its own for duplicate selectors with
 * different declarations, which is what a 32-bit hash collision inside one
 * build would look like.
 */
import {copyFileSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import postcss from 'postcss'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const v1Path = join(root, 'packages/button-v1/dist/styles.css')
const v2Path = join(root, 'packages/button-v2/dist/styles.css')

/** @returns {Map<string, {decls: string, context: string}[]>} selector → occurrences */
function index(cssText) {
  const map = new Map()
  const ast = postcss.parse(cssText)
  ast.walkRules((rule) => {
    const context = []
    let parent = rule.parent
    while (parent && parent.type === 'atrule') {
      context.unshift(`@${parent.name} ${parent.params}`.trim())
      parent = parent.parent
    }
    const decls = rule.nodes
      .filter((n) => n.type === 'decl')
      .map((d) => `${d.prop}:${d.value}${d.important ? '!important' : ''}`)
      .sort()
      .join(';')
    for (const selector of rule.selectors) {
      const key = `${context.join(' ')} ${selector}`.trim()
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(decls)
    }
  })
  return map
}

function classify(name) {
  if (/^@layer recipes/.test(name)) return 'config-recipe (negative control)'
  if (/^@layer tokens/.test(name)) return 'token defaults (:root / dark block)'
  if (/^@layer base/.test(name)) return 'panda watermark'
  return 'atomic'
}

const v1 = index(readFileSync(v1Path, 'utf8'))
const v2 = index(readFileSync(v2Path, 'utf8'))

// 1. Intra-stylesheet duplicates with different content (would reveal a hash collision).
const intra = []
for (const [label, map] of [
  ['v1', v1],
  ['v2', v2],
]) {
  for (const [selector, occurrences] of map) {
    const distinct = new Set(occurrences)
    if (distinct.size > 1) intra.push({stylesheet: label, selector, variants: [...distinct]})
  }
}

// 2. Cross-stylesheet comparison.
const shared = []
const collisions = []
const onlyV1 = []
const onlyV2 = []
for (const [selector, occ1] of v1) {
  const occ2 = v2.get(selector)
  if (!occ2) {
    onlyV1.push(selector)
    continue
  }
  const same = occ1.join('|') === occ2.join('|')
  const entry = {selector, kind: classify(selector), v1: occ1.join('|'), v2: occ2.join('|')}
  if (same) shared.push(entry)
  else collisions.push(entry)
}
for (const selector of v2.keys()) if (!v1.has(selector)) onlyV2.push(selector)

const atomicCollisions = collisions.filter((c) => c.kind === 'atomic')
const expectedCollisions = collisions.filter((c) => c.kind !== 'atomic')

const summary = {
  v1Selectors: v1.size,
  v2Selectors: v2.size,
  sharedIdentical: shared.length,
  sharedIdenticalAtomic: shared.filter((s) => s.kind === 'atomic').length,
  onlyInV1: onlyV1.length,
  onlyInV2: onlyV2.length,
  atomicCollisions: atomicCollisions.length,
  expectedCollisions: expectedCollisions.map((c) => ({selector: c.selector, kind: c.kind, v1: c.v1, v2: c.v2})),
  intraStylesheetHashCollisions: intra,
}

mkdirSync(join(root, 'results'), {recursive: true})
writeFileSync(join(root, 'results/css-collision-check.json'), JSON.stringify(summary, null, 2) + '\n')
// Archive the two published stylesheets next to the verdict so the evidence is reviewable without a build.
copyFileSync(v1Path, join(root, 'results/button-v1.styles.css'))
copyFileSync(v2Path, join(root, 'results/button-v2.styles.css'))

console.log('Static CSS cross-check: packages/button-v1/dist/styles.css vs packages/button-v2/dist/styles.css')
console.log(`  selectors: v1=${summary.v1Selectors} v2=${summary.v2Selectors}`)
console.log(`  shared selectors with IDENTICAL declarations: ${summary.sharedIdentical} (${summary.sharedIdenticalAtomic} atomic)`)
console.log(`  selectors only in v1: ${summary.onlyInV1}, only in v2: ${summary.onlyInV2}`)
console.log(`  atomic (cva/css) collisions — same class, different declarations: ${summary.atomicCollisions}`)
console.log(`  expected collisions (name-addressed): ${expectedCollisions.length}`)
for (const c of expectedCollisions) {
  console.log(`    [${c.kind}] ${c.selector}`)
  console.log(`       v1: ${c.v1.slice(0, 160)}`)
  console.log(`       v2: ${c.v2.slice(0, 160)}`)
}
console.log(`  intra-stylesheet duplicate selectors with different content (hash collisions): ${intra.length}`)

let failed = false
if (atomicCollisions.length > 0) {
  failed = true
  console.error('\nFAIL: atomic class collisions found:')
  for (const c of atomicCollisions) console.error(`  ${c.selector}\n    v1: ${c.v1}\n    v2: ${c.v2}`)
}
if (intra.length > 0) {
  failed = true
  console.error('\nFAIL: intra-stylesheet hash collisions found:', JSON.stringify(intra, null, 2))
}
if (!expectedCollisions.some((c) => c.kind.startsWith('config-recipe'))) {
  failed = true
  console.error('\nFAIL: the negative control (config recipe `badge`) did not collide — the control is broken')
}
console.log(failed ? '\nRESULT: FAIL' : '\nRESULT: PASS (zero atomic collisions; negative control collided as predicted)')
process.exit(failed ? 1 : 0)
