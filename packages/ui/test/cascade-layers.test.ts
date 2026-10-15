/**
 * `@sanity/ui/styles.css` ships without cascade layers (`cascadeLayers: false`
 * in `tsdown.config.mts`). Unlayered CSS beats every layered rule whatever its
 * specificity, so in a layered stylesheet a consumer's reset or `styled()` base
 * style also overrode the library's `:hover`, focus and selected states.
 * Without layers, the stylesheet cascades by specificity and then source order,
 * which is why it has to load before styled-components' `<style data-styled>`
 * (see the README).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {build} from 'tsdown'
import {expect, test} from 'vitest'

const UI_DIR = path.resolve(import.meta.dirname, '..')

test('@sanity/ui/styles.css has no cascade layers', {timeout: 60_000}, async () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sanity-ui-styles-'))

  try {
    await build({
      config: path.join(UI_DIR, 'tsdown.config.mts'),
      cwd: UI_DIR,
      outDir,
      dts: false,
      exports: false,
      logLevel: 'silent',
      publint: false,
    })

    const css = fs.readFileSync(path.join(outDir, 'styles.css'), 'utf8')

    expect(css).toMatch(/\.u-[\w-]+ \{/)
    expect(css).not.toMatch(/@layer\b/)
  } finally {
    fs.rmSync(outDir, {recursive: true, force: true})
  }
})
