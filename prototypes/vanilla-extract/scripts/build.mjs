#!/usr/bin/env node
// Builds lib-v1 and lib-v2 with tsdown (+ @sanity/tsdown-config) in every naming mode, into
// `<lib>/dist/<mode>/`. Usage: `node scripts/build.mjs [mode ...]`.
import {spawnSync} from 'node:child_process'
import {rmSync} from 'node:fs'

import {LIBS, MODES, TSDOWN_BIN, distDir, libDir} from './lib/paths.mjs'

export function buildLib(lib, mode, {quiet = true} = {}) {
  rmSync(distDir(lib, mode), {recursive: true, force: true})
  const started = performance.now()
  const result = spawnSync(TSDOWN_BIN, [], {
    cwd: libDir(lib),
    env: {...process.env, VE_IDENTIFIERS: mode},
    encoding: 'utf8',
    stdio: quiet ? 'pipe' : 'inherit',
  })
  const ms = performance.now() - started
  if (result.status !== 0) {
    throw new Error(`${lib} [${mode}] failed:\n${result.stdout}\n${result.stderr}`)
  }
  return {lib, mode, ms}
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href
if (isMain) {
  const modes = process.argv.slice(2).length ? process.argv.slice(2) : MODES
  for (const mode of modes) {
    if (!MODES.includes(mode)) throw new Error(`Unknown mode "${mode}". Use: ${MODES.join(', ')}`)
    for (const lib of LIBS) {
      const {ms} = buildLib(lib, mode)
      console.log(`${lib.padEnd(7)} ${mode.padEnd(15)} ${ms.toFixed(0).padStart(5)} ms  → ${distDir(lib, mode)}`)
    }
  }
}
