import {existsSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

import type {Framework} from './types.js'

export const CONFIG_FILE = 'sanity-ui.json'

export interface SanityUiConfig {
  $schema: string
  framework: Framework
  entry: string
  css: {theme: string; scheme: string}
}

/**
 * Builds the sanity-ui.json contents: a small record of the detected setup
 * (framework, entry, css) written to the project root for tooling to read.
 */
export function buildConfig({framework, entry}: {framework: Framework; entry: string}): SanityUiConfig {
  const dir = dirname(entry)
  const themePath = dir === '.' ? 'sanity-ui.css' : `${dir}/sanity-ui.css`
  return {
    $schema: 'https://sanity-ui.sanity.dev/schema.json',
    framework,
    entry,
    css: {theme: themePath, scheme: 'system'},
  }
}

export function configExists(cwd: string): boolean {
  return existsSync(join(cwd, CONFIG_FILE))
}

export function writeConfig(cwd: string, config: SanityUiConfig, {dryRun = false} = {}): {file: string; wrote: boolean} {
  const file = join(cwd, CONFIG_FILE)
  if (!dryRun) writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`)
  return {file, wrote: !dryRun}
}
