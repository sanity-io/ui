import {spawnSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tsdownBin = path.join(root, 'node_modules', '.bin', 'tsdown')

export const LIB_DIRS = ['packages/button-v1', 'packages/button-v2'].map((dir) =>
  path.join(root, dir),
)

/** Runs the `tsdown` CLI in a library directory; returns wall time in ms. */
export function buildLib(libDir, {silent = false} = {}) {
  const started = performance.now()
  const result = spawnSync(tsdownBin, [], {
    cwd: libDir,
    stdio: silent ? 'pipe' : 'inherit',
    env: {...process.env, NODE_ENV: 'production'},
  })
  if (result.status !== 0) {
    if (silent) process.stderr.write(String(result.stdout) + String(result.stderr))
    throw new Error(`tsdown failed in ${libDir}`)
  }
  return performance.now() - started
}

/**
 * Copies each published stylesheet into `app/public/`, resolved through the
 * package `exports` map exactly like `import 'stylex-button-v1/styles.css'`
 * would. The app loads them with plain `<link>` tags — the way the Studio
 * module CDN serves a bundle's `index.css` — instead of bundling them.
 */
export function publishLibCss() {
  const publicDir = path.join(root, 'app', 'public')
  fs.mkdirSync(publicDir, {recursive: true})
  for (const alias of ['stylex-button-v1', 'stylex-button-v2']) {
    const resolved = fileURLToPath(import.meta.resolve(`${alias}/styles.css`))
    fs.copyFileSync(resolved, path.join(publicDir, `${alias}.css`))
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  for (const libDir of LIB_DIRS) {
    const ms = buildLib(libDir)
    const css = path.join(libDir, 'dist', 'stylex.css')
    const size = fs.existsSync(css) ? fs.statSync(css).size : 0
    console.log(`\n✔ ${path.basename(libDir)} built in ${ms.toFixed(0)} ms — dist/stylex.css ${size} B`)
  }
  publishLibCss()
  console.log('✔ copied published stylesheets to app/public/')
}
