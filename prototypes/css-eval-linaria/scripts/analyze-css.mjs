/**
 * Static comparison of the v1 and v2 stylesheets per build flavor: which
 * selectors appear in both, and whether their declarations agree. A selector
 * that both versions emit with different declarations is a class-name
 * collision waiting to happen as soon as both stylesheets share a page.
 *
 * Usage: node scripts/analyze-css.mjs   (expects both libraries to be built)
 */
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import postcss from 'postcss'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const flavors = ['default', 'namespaced', 'atomic']

function rulesBySelector(cssPath) {
  const map = new Map()
  postcss.parse(readFileSync(cssPath, 'utf8')).walkRules((rule) => {
    const decls = []
    rule.walkDecls((d) => decls.push(`${d.prop}:${d.value}${d.important ? '!important' : ''}`))
    const context = []
    for (let p = rule.parent; p && p.type === 'atrule'; p = p.parent) {
      context.unshift(`@${p.name} ${p.params}`)
    }
    const key = [...context, rule.selector].join(' ')
    map.set(key, (map.get(key) ?? []).concat(decls.sort().join(';')))
  })
  return map
}

const report = {}
for (const flavor of flavors) {
  const v1Path = resolve(root, `button-lib/dist/${flavor}/style.css`)
  const v2Path = resolve(root, `button-lib-v2/dist/${flavor}/style.css`)
  if (!existsSync(v1Path) || !existsSync(v2Path)) {
    console.log(`skipping ${flavor}: build both libraries first`)
    continue
  }
  const v1 = rulesBySelector(v1Path)
  const v2 = rulesBySelector(v2Path)
  const shared = [...v1.keys()].filter((k) => v2.has(k))
  const conflicting = shared.filter((k) => v1.get(k).join('|') !== v2.get(k).join('|'))
  const identical = shared.length - conflicting.length

  report[flavor] = {
    v1Selectors: v1.size,
    v2Selectors: v2.size,
    shared: shared.length,
    identical,
    conflicting: conflicting.map((selector) => ({
      selector,
      v1: v1.get(selector),
      v2: v2.get(selector),
    })),
  }

  console.log(`\n== ${flavor} ==`)
  console.log(
    `  v1: ${v1.size} selectors, v2: ${v2.size} selectors, shared: ${shared.length} ` +
      `(identical declarations: ${identical}, CONFLICTING declarations: ${conflicting.length})`,
  )
  for (const selector of conflicting) {
    console.log(`  ✗ ${selector}`)
    console.log(`      v1: ${v1.get(selector).join(' | ').slice(0, 120)}`)
    console.log(`      v2: ${v2.get(selector).join(' | ').slice(0, 120)}`)
  }
  if (conflicting.length === 0) {
    console.log('  ✓ every selector that both versions emit carries identical declarations')
  }
}

const out = resolve(root, 'results/css-analysis.json')
mkdirSync(dirname(out), {recursive: true})
writeFileSync(out, JSON.stringify(report, null, 2) + '\n')
console.log(`\nwritten to ${out}`)
