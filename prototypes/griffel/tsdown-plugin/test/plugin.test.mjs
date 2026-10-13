import assert from 'node:assert/strict'
import {mkdtempSync, readFileSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {test} from 'node:test'

import {build} from 'rolldown'

import {assertOneMeaningPerClass, griffelTsdownPlugin} from '../dist/index.mjs'

test('assertOneMeaningPerClass: identical rules may repeat, different rules per class throw', () => {
  assertOneMeaningPerClass([{d: ['.fabc123{color:red;}']}, {d: ['.fabc123{color:red;}']}])
  // one reset class spans several selectors
  assertOneMeaningPerClass([{r: ['.rxyz{margin:0;}', '.rxyz>span{display:block;}']}])
  assert.throws(
    () => assertOneMeaningPerClass([{d: ['.fabc123{color:red;}']}, {h: ['.fabc123:hover{color:blue;}']}]),
    /two meanings/,
  )
})

async function bundle(source, options) {
  const dir = mkdtempSync(join(tmpdir(), 'griffel-plugin-'))
  const file = join(dir, 'styles.ts')
  writeFileSync(file, source)
  const result = await build({
    input: file,
    platform: 'browser',
    external: [/^@griffel\//],
    plugins: [griffelTsdownPlugin(options)],
    output: {format: 'esm'},
    write: false,
    logLevel: 'silent',
  })
  const code = result.output.find((o) => o.type === 'chunk').code
  const css = result.output.find((o) => o.type === 'asset')?.source
  return {code, css: css ? String(css) : undefined}
}

const SOURCE = `
import {makeStyles, makeResetStyles, makeStaticStyles} from '@griffel/react'
export const useReset = makeResetStyles({margin: 0, '& > span': {display: 'block'}})
export const useStyles = makeStyles({root: {color: 'red', ':hover': {color: 'blue'}}, other: {paddingTop: '4px'}})
export const useStatic = makeStaticStyles({body: {margin: 0}})
`

test('inject mode: __styles/__resetStyles/__staticStyles with the CSS rules attached, plus a styles.css asset', async () => {
  const {code, css} = await bundle(SOURCE, {mode: 'inject'})
  assert.match(code, /import \{ __resetStyles, __staticStyles, __styles \} from "@griffel\/react"/)
  assert.match(code, /const __griffelCssRules = \{/)
  assert.match(code, /__resetStyles\("r[0-9a-z]+", null, __griffelCssRules\)/)
  assert.match(code, /__styles\(\{[\s\S]*?\}, __griffelCssRules\)/)
  assert.match(code, /__staticStyles\(\{ "d": \["body\{margin:0;\}"\] \}\)/)
  assert.doesNotMatch(code, /makeStyles|makeResetStyles|makeStaticStyles/)
  assert.ok(css.includes('color:red'), 'extracted copy of the CSS is still emitted for metrics')
})

test('extract mode: __css/__resetCSS/__staticCSS without CSS in the JS, CSS in the asset', async () => {
  const {code, css} = await bundle(SOURCE, {mode: 'extract', fileName: 'out.css'})
  assert.match(code, /import \{ __css, __resetCSS, __staticCSS \} from "@griffel\/react"/)
  assert.doesNotMatch(code, /color:red/)
  assert.ok(css.includes('.f') && css.includes('color:red') && css.includes(':hover{color:blue;}'))
  // bucket order: reset → default → hover
  assert.ok(css.indexOf('margin:0') < css.indexOf('color:red') && css.indexOf('color:red') < css.indexOf(':hover'))
})

test('classNameHashSalt changes every class name', async () => {
  const a = await bundle(SOURCE, {mode: 'extract'})
  const b = await bundle(SOURCE, {mode: 'extract', classNameHashSalt: 'sanity'})
  const classes = (css) => css.match(/\.[fr][0-9a-z]+/g)
  assert.deepEqual(
    classes(a.css).filter((c) => classes(b.css).includes(c)),
    [],
  )
})

test('the committed build of button v1 passes the one-meaning check', () => {
  const dist = readFileSync(new URL('../../button/dist/index.js', import.meta.url), 'utf8')
  const rules = [...dist.matchAll(/const __griffelCssRules\$?\d* = (\{[\s\S]*?\});\n/g)].map((m) => JSON.parse(m[1]))
  assert.ok(rules.length >= 2)
  assertOneMeaningPerClass(rules)
})
