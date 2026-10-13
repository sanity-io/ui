#!/usr/bin/env node
// Compares the generated identifiers of two arbitrary stylesheets, e.g. two published
// @sanity/ui releases: `node scripts/compare-files.mjs a.css b.css [labelA labelB]`.
import {readFileSync} from 'node:fs'
import {brotliCompressSync, gzipSync} from 'node:zlib'

import {compareStylesheets} from './lib/cssIdentifiers.mjs'

const [fileA, fileB, labelA = fileA, labelB = fileB] = process.argv.slice(2)
if (!fileA || !fileB) {
  console.error('usage: compare-files.mjs <a.css> <b.css> [labelA] [labelB]')
  process.exit(1)
}
const a = readFileSync(fileA)
const b = readFileSync(fileB)
const result = compareStylesheets(a.toString(), b.toString())
const size = (buf) => `${buf.length} B raw / ${gzipSync(buf, {level: 9}).length} B gzip / ${brotliCompressSync(buf).length} B brotli`

console.log(`A: ${labelA} — ${result.countA} identifiers, ${size(a)}`)
console.log(`B: ${labelB} — ${result.countB} identifiers, ${size(b)}`)
console.log(`shared names: ${result.shared.length}; same rules: ${result.identical.length}; DIFFERENT rules: ${result.conflicting.length}`)
for (const key of result.conflicting.filter((k) => k.startsWith('.')).slice(0, 5)) {
  const {a: ra, b: rb} = result.detail(key)
  console.log(`  ${key}\n    A: ${ra[0].slice(0, 140)}\n    B: ${rb[0].slice(0, 140)}`)
}
