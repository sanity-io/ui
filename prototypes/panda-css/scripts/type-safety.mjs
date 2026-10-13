#!/usr/bin/env node
/**
 * Type-safety proof: runs `tsc` over packages/button-v1/type-tests and checks
 * that every line marked `// EXPECT-ERROR` in wrong.tsx is rejected, and that
 * right.tsx (and everything else) compiles clean. Records the diagnostics so the
 * quality of the error messages can be judged, and times the type-check.
 */
import {execFileSync} from 'node:child_process'
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {performance} from 'node:perf_hooks'
import {fileURLToPath} from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = join(root, 'packages/button-v1')

const expected = new Set()
readFileSync(join(pkg, 'type-tests/wrong.tsx'), 'utf8')
  .split('\n')
  .forEach((line, i) => line.trimEnd().endsWith('// EXPECT-ERROR') && !line.trim().startsWith('*') && expected.add(i + 1))

let output = ''
const started = performance.now()
try {
  output = execFileSync('pnpm', ['exec', 'tsc', '-p', 'tsconfig.typetest.json', '--pretty', 'false'], {
    cwd: pkg,
    encoding: 'utf8',
    stdio: 'pipe',
  })
} catch (error) {
  output = `${error.stdout ?? ''}${error.stderr ?? ''}`
}
const elapsed = performance.now() - started
const version = execFileSync('pnpm', ['exec', 'tsc', '--version'], {cwd: pkg, encoding: 'utf8'}).trim()

const diagnostics = []
for (const line of output.split('\n')) {
  const m = line.match(/^(.+?)\((\d+),(\d+)\): error (TS\d+): (.*)$/)
  if (m) diagnostics.push({file: m[1].replace(/\\/g, '/'), line: Number(m[2]), code: m[4], message: m[5]})
  // tsc prints elaboration lines indented under the error they belong to.
  else if (/^\s+\S/.test(line) && diagnostics.length > 0) diagnostics[diagnostics.length - 1].message += ` ${line.trim()}`
}

const inWrong = diagnostics.filter((d) => d.file.endsWith('type-tests/wrong.tsx'))
const elsewhere = diagnostics.filter((d) => !d.file.endsWith('type-tests/wrong.tsx'))
const erroredLines = new Set(inWrong.map((d) => d.line))
const missed = [...expected].filter((l) => !erroredLines.has(l))
const unexpectedInWrong = [...erroredLines].filter((l) => !expected.has(l))

const report = {
  typescript: version,
  tscMs: Math.round(elapsed),
  expectedErrorLines: expected.size,
  caught: expected.size - missed.length,
  missedLines: missed,
  unexpectedErrorLinesInWrong: unexpectedInWrong,
  errorsOutsideWrong: elsewhere,
  diagnostics: inWrong.map((d) => ({line: d.line, code: d.code, message: d.message.slice(0, 400)})),
}
mkdirSync(join(root, 'results'), {recursive: true})
writeFileSync(join(root, 'results/type-safety.json'), JSON.stringify(report, null, 2) + '\n')

console.log(`${version}, tsc over src + styled-system + type-tests: ${report.tscMs} ms`)
console.log(`EXPECT-ERROR lines caught: ${report.caught}/${expected.size}${missed.length ? ` (missed: ${missed.join(', ')})` : ''}`)
console.log(`errors outside wrong.tsx: ${elsewhere.length}`)
for (const d of elsewhere) console.log(`  ${d.file}:${d.line} ${d.code} ${d.message}`)
console.log('diagnostics on the wrong lines:')
const src = readFileSync(join(pkg, 'type-tests/wrong.tsx'), 'utf8').split('\n')
for (const line of [...expected].sort((a, b) => a - b)) {
  const ds = inWrong.filter((d) => d.line === line)
  console.log(`  L${line}: ${src[line - 1].trim().replace(' // EXPECT-ERROR', '')}`)
  for (const d of ds) console.log(`       ${d.code}: ${d.message.slice(0, 220)}`)
}
const ok = missed.length === 0 && elsewhere.length === 0 && unexpectedInWrong.length === 0
console.log(ok ? '\nRESULT: PASS' : '\nRESULT: FAIL')
process.exit(ok ? 0 : 1)
