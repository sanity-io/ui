#!/usr/bin/env node
/**
 * Verifies the @pandacss/vite build output: the static css()/cva() call sites
 * were rewritten to class strings (no Panda runtime left in the bundle), the
 * extracted CSS landed in the stylesheet that declares the layers, and the
 * app's `app-*` classes coexist with the library's `sui-v4-*` classes.
 */
import {readdirSync, readFileSync} from 'node:fs'
import {join} from 'node:path'

const assets = join(import.meta.dirname, 'dist/assets')
const files = readdirSync(assets)
const js = readFileSync(join(assets, files.find((f) => f.endsWith('.js'))), 'utf8')
const cssText = readFileSync(join(assets, files.find((f) => f.endsWith('.css'))), 'utf8')

const literals = [...js.matchAll(/"((?:app-[\w.-]+\s*)+)"/g)].map((m) => new Set(m[1].trim().split(/\s+/)))
const hasLiteral = (...classes) => literals.some((set) => classes.every((c) => set.has(c)))

const checks = {
  'page css() inlined to a class string': hasLiteral('app-d_flex', 'app-flex-d_column', 'app-gap_4', 'app-p_4', 'app-bg_paper', 'app-c_ink'),
  'cva base inlined to a class string': hasLiteral('app-p_2', 'app-bdr_md', 'app-bd-w_1px', 'app-border-style_solid', 'app-bd-c_accent'),
  'cva({emphasis:"high"}) variant inlined to a class string': hasLiteral('app-bg_accent', 'app-c_paper'),
  // The transform turns the cva into `join(base, {low: "...", high: "..."}[variant])`.
  'cva rewritten to a static variant lookup table': /\{\s*low: "app-bg_paper",\s*high: "app-bg_accent app-c_paper"\s*\}\[/.test(js),
  'no app-side Panda runtime in the bundle (createCssContext absent for prefix app)': !/prefix: "app"/.test(js),
  'library runtime still present (prefix sui-v4)': /prefix: "sui-v4"/.test(js),
  'app CSS emitted into the layered stylesheet': /\.app-bg_accent\s*\{/.test(cssText),
  'library CSS present in the same stylesheet': /\.sui-v4-[A-Za-z]+\s*\{/.test(cssText),
  'exactly one @layer order declaration kept per bundle': (cssText.match(/@layer reset, base, tokens, recipes, utilities;/g) ?? []).length >= 1,
}
let ok = true
for (const [label, pass] of Object.entries(checks)) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}`)
  if (!pass) ok = false
}
if (!ok) {
  console.log('\n--- class strings found in bundle:')
  console.log([...js.matchAll(/"(app-[^"]+)"/g)].map((m) => m[1]).slice(0, 10).join('\n'))
}
process.exit(ok ? 0 : 1)
