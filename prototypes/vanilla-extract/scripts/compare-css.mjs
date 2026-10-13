#!/usr/bin/env node
// Compares the generated identifiers of release 1.0.0 and 2.0.0 per naming mode: how many
// names they share, and how many of those shared names mean something different in each
// release (the SAPP-4639 failure). Writes results/compare.md and results/compare.json.
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

import {compareStylesheets} from './lib/cssIdentifiers.mjs'
import {MODES, RESULTS_DIR, distDir} from './lib/paths.mjs'

const rows = []
const examples = []
for (const mode of MODES) {
  const cssV1 = readFileSync(resolve(distDir('lib-v1', mode), 'styles.css'), 'utf8')
  const cssV2 = readFileSync(resolve(distDir('lib-v2', mode), 'styles.css'), 'utf8')
  const result = compareStylesheets(cssV1, cssV2)
  rows.push({
    mode,
    v1: result.countA,
    v2: result.countB,
    shared: result.shared.length,
    identical: result.identical.length,
    conflicting: result.conflicting.length,
  })
  const classesFirst = [...result.conflicting].sort((x, y) => (x[0] === '.' ? 0 : 1) - (y[0] === '.' ? 0 : 1))
  for (const key of classesFirst.slice(0, 4)) {
    const {a, b} = result.detail(key)
    examples.push({mode, key, v1: a[0], v2: b[0]})
  }
}

const header = '| mode | identifiers v1 | identifiers v2 | shared names | shared, same rules | shared, DIFFERENT rules |'
const divider = '| --- | ---: | ---: | ---: | ---: | ---: |'
const table = rows
  .map((r) => `| \`${r.mode}\` | ${r.v1} | ${r.v2} | ${r.shared} | ${r.identical} | **${r.conflicting}** |`)
  .join('\n')

let md = `# Identifier collisions between @css-eval/ve-button 1.0.0 and 2.0.0\n\n${header}\n${divider}\n${table}\n`
if (examples.length) {
  md += '\n## Examples of the same name meaning different rules\n\n'
  for (const ex of examples) {
    md += `- \`${ex.mode}\` \`${ex.key}\`\n  - 1.0.0: \`${ex.v1}\`\n  - 2.0.0: \`${ex.v2}\`\n`
  }
}

mkdirSync(RESULTS_DIR, {recursive: true})
writeFileSync(resolve(RESULTS_DIR, 'compare.md'), md)
writeFileSync(resolve(RESULTS_DIR, 'compare.json'), JSON.stringify({rows, examples}, null, 2))
console.log(md)
