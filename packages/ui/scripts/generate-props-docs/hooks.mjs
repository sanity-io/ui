// Lets Node import the Sanity UI source directly, on any Node that can run the
// build (the package's engines allow 20.19, which has no TypeScript support).
//
// Two jobs:
//   resolve — the v5 source uses extensionless relative imports, which Node's
//             ESM resolver rejects. This maps them onto the real file. The
//             check is "does this path exist as a file", not "does it look
//             like it has an extension": `../button/button.props` ends in
//             something that looks like an extension but isn't one.
//   load    — transpiles .ts with the TypeScript compiler the package already
//             builds with, so no Node version is needed to strip types.
import {existsSync, readFileSync, statSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, resolve as resolvePath} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const require = createRequire(import.meta.url)
let ts

const isFile = (p) => existsSync(p) && statSync(p).isFile()

export async function resolve(spec, ctx, next) {
  if (spec.startsWith('.') && ctx.parentURL?.startsWith('file:')) {
    const base = dirname(fileURLToPath(ctx.parentURL))
    const asWritten = resolvePath(base, spec)
    if (!isFile(asWritten)) {
      for (const ext of ['.ts', '.tsx', '.mts', '/index.ts']) {
        const candidate = asWritten + ext
        if (isFile(candidate)) {
          return {url: pathToFileURL(candidate).href, shortCircuit: true}
        }
      }
    }
  }
  return next(spec, ctx)
}

export async function load(url, ctx, next) {
  if (url.startsWith('file:') && url.endsWith('.ts')) {
    ts ??= require('typescript')
    const source = readFileSync(fileURLToPath(url), 'utf8')
    const {outputText} = ts.transpileModule(source, {
      fileName: fileURLToPath(url),
      compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
    })
    return {format: 'module', source: outputText, shortCircuit: true}
  }
  return next(url, ctx)
}
