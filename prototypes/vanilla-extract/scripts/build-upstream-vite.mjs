#!/usr/bin/env node
// Builds both releases with the UPSTREAM @vanilla-extract/vite-plugin (Vite library mode) using
// the very same `identifiers` function, into `<lib>/dist-upstream-vite/<mode>/`, then compares
// the generated identifiers with the tsdown (@sanity/vanilla-extract-* fork) build of the same
// mode. Shows that the naming fix is toolchain-independent: no fork is involved on this path.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {pathToFileURL} from 'node:url'

import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import {build} from 'vite'

import {collectIdentifiers} from './lib/cssIdentifiers.mjs'
import {LIBS, MODES, RESULTS_DIR, distDir, libDir} from './lib/paths.mjs'

// The helper is TypeScript; run with `node --experimental-strip-types` (unflagged in Node ≥ 22.18).
const {identifiersForMode, readPackageIdentity} = await import(
  pathToFileURL(resolve(libDir('lib-v1'), '../identifiers/versionedIdentifiers.ts')).href
)

async function buildWithUpstreamVite(lib, mode) {
  const root = libDir(lib)
  const outDir = resolve(root, 'dist-upstream-vite', mode)
  const identity = readPackageIdentity(resolve(root, 'package.json'))
  const started = performance.now()
  await build({
    root,
    configFile: false,
    logLevel: 'warn',
    plugins: [vanillaExtractPlugin({identifiers: identifiersForMode(mode, identity, root)})],
    esbuild: {jsx: 'automatic'},
    build: {
      outDir,
      emptyOutDir: true,
      minify: false,
      cssMinify: false,
      lib: {entry: resolve(root, 'src/index.ts'), formats: ['es'], fileName: 'index', cssFileName: 'styles'},
      rolldownOptions: {
        external: [/^react(\/|$)/, /^@vanilla-extract\//],
      },
    },
  })
  return {outDir, ms: performance.now() - started}
}

const rows = []
for (const mode of MODES) {
  for (const lib of LIBS) {
    const {outDir, ms} = await buildWithUpstreamVite(lib, mode)
    const upstreamCss = readFileSync(resolve(outDir, 'styles.css'), 'utf8')
    const tsdownCssPath = resolve(distDir(lib, mode), 'styles.css')
    if (!existsSync(tsdownCssPath)) throw new Error(`Run scripts/build.mjs first (missing ${tsdownCssPath})`)
    const upstream = [...collectIdentifiers(upstreamCss).keys()].sort()
    const fork = [...collectIdentifiers(readFileSync(tsdownCssPath, 'utf8')).keys()].sort()
    const same = upstream.length === fork.length && upstream.every((id, i) => id === fork[i])
    rows.push({lib, mode, ms: Math.round(ms), identifiers: upstream.length, identicalToTsdown: same})
    console.log(
      `${lib} ${mode.padEnd(15)} upstream vite-plugin: ${upstream.length} identifiers in ${Math.round(ms)} ms — ${same ? 'IDENTICAL names to the tsdown/fork build' : 'names differ from the tsdown/fork build'}`,
    )
  }
}

mkdirSync(RESULTS_DIR, {recursive: true})
writeFileSync(resolve(RESULTS_DIR, 'upstream-vite.json'), JSON.stringify(rows, null, 2))
