#!/usr/bin/env node
/**
 * The Next.js integration path: Panda as a PostCSS plugin (`@pandacss/dev/postcss`),
 * which is what Next.js (webpack and Turbopack) runs through postcss.config.cjs.
 * Processes the layer-declaring stylesheet and verifies the extracted CSS is injected.
 */
import {readFileSync} from 'node:fs'
import postcss from 'postcss'
import pandacss from '@pandacss/dev/postcss'

const cwd = import.meta.dirname
const input = readFileSync(`${cwd}/src/index.css`, 'utf8')
const started = performance.now()
const result = await postcss([pandacss({cwd})]).process(input, {from: `${cwd}/src/index.css`})
const elapsed = Math.round(performance.now() - started)

const checks = {
  'layer order kept': result.css.includes('@layer reset, base, tokens, recipes, utilities;'),
  'app tokens emitted': result.css.includes('--app-colors-accent: #8e44ad'),
  'static css() atoms emitted': /\.app-bg_accent\s*\{/.test(result.css),
  'cva variant atoms emitted': /\.app-c_paper\s*\{/.test(result.css),
  'dir-dependency messages for watch invalidation': result.messages.some((m) => m.type === 'dir-dependency' || m.type === 'dependency'),
}
let ok = true
for (const [label, pass] of Object.entries(checks)) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}`)
  if (!pass) ok = false
}
console.log(`postcss + @pandacss/dev/postcss: ${elapsed} ms, ${result.css.length} bytes, messages: ${result.messages.map((m) => m.type).join(', ') || 'none'}`)
process.exit(ok ? 0 : 1)
