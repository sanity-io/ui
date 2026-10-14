/**
 * Panda emits each static style of `@sanity/ui` as `u-` plus a 32-bit hash of
 * its readable key (`display_flex` → `u-HgOzd`, see `panda.config.ts`). Two
 * copies of `@sanity/ui` on one page (a Studio and a plugin that bundles its
 * own) share that namespace. A style added in a later release must therefore
 * never hash to the name of a *different* style shipped earlier: every element
 * of either style would get both rules, which is how vanilla-extract's
 * position-based names broke Buttons in #3193.
 *
 * `manifest.json` records every name ever emitted with the key it stands for
 * and is append-only. This test fails when a name stands for two keys, in this
 * build or against the manifest, and when the manifest misses a name; add new
 * names with `pnpm --filter @sanity/ui exec vitest run test/class-names -u`.
 *
 * The 4.x releases before Panda used vanilla-extract names (`_2mi48t0`): base-36
 * digits and a leading underscore, never a hyphen, so they cannot coincide with
 * `u-…` names.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {createNodeDriver} from '@pandacss/dev/node'
import {transformSource} from '@pandacss/transformer'
import {expect, test} from 'vitest'

import manifest from './manifest.json'

const UI_DIR = path.resolve(import.meta.dirname, '../..')

/**
 * `<file>#<export>` → class list of every `.css.ts` export, compiled through the
 * same pipeline as `tsdown.config.mts`: with the package config, or with `hash`
 * and `prefix` turned off for the readable keys.
 */
async function compile(readable: boolean): Promise<Map<string, string[]>> {
  const dir = readable
    ? fs.mkdtempSync(path.join(os.tmpdir(), 'sanity-ui-class-names-'))
    : undefined
  const configPath = dir && path.join(dir, 'panda.config.ts')

  if (configPath) {
    fs.writeFileSync(
      configPath,
      `import config from ${JSON.stringify(path.join(UI_DIR, 'panda.config.ts'))}\n` +
        'const {prefix, ...rest} = config\nexport default {...rest, hash: false}\n',
    )
  }

  try {
    const driver = await createNodeDriver({cwd: UI_DIR, configPath})
    const classes = new Map<string, string[]>()

    driver.parseFiles()

    for (const entry of fs.readdirSync(path.join(UI_DIR, 'src'), {
      recursive: true,
      withFileTypes: true,
    })) {
      if (!entry.isFile() || !entry.name.endsWith('.css.ts')) continue

      const file = path.join(entry.parentPath, entry.name)
      const source = fs.readFileSync(file, 'utf8')

      driver.compiler.parseFileSource(file, source)

      const result = transformSource({compiler: driver.compiler, path: file, source, mode: 'build'})

      if (!result.changed || result.bailed)
        throw new Error(`Panda could not statically transform ${file}`)

      // Readable keys can contain quotes (`[&[data-as=\"button\"]]:margin_0`),
      // escaped inside the JSON-compatible string literal
      for (const [, name, literal] of result.code.matchAll(
        /^export const (\w+) = ("(?:[^"\\]|\\.)*")$/gm,
      )) {
        const value: unknown = JSON.parse(literal)

        if (typeof value !== 'string') throw new Error(`Unexpected ${literal} in ${file}`)

        classes.set(`${path.relative(UI_DIR, file)}#${name}`, value.split(' '))
      }
    }

    return classes
  } finally {
    if (dir) fs.rmSync(dir, {recursive: true, force: true})
  }
}

test('every class name stands for one style key, in this build and in every release so far', async () => {
  const readable = await compile(true)
  const hashed = await compile(false)
  const names = new Map<string, string>(Object.entries(manifest.names))
  const collisions = new Set<string>()

  for (const [id, keys] of readable) {
    const emitted = hashed.get(id)

    if (!emitted || emitted.length !== keys.length)
      throw new Error(`The two builds disagree on ${id}`)

    keys.forEach((key, index) => {
      const name = emitted[index]
      const known = names.get(name)

      if (known === undefined) names.set(name, key)
      else if (known !== key) collisions.add(`${name}: "${known}" and "${key}"`)
    })
  }

  expect(
    [...collisions],
    'A class name would stand for two different styles, so elements of either would get both rules ' +
      '(two @sanity/ui releases on one page share class names). Spell the new style differently, e.g. ' +
      'an equivalent value, so it hashes to another name.',
  ).toEqual([])

  for (const name of names.keys()) expect(name).toMatch(/^u-[a-zA-Z]{1,6}$/)

  // Append-only: the manifest plus this build's names. `vitest -u` writes it.
  const entries = [...names].sort(([a], [b]) => (a < b ? -1 : 1))

  await expect(
    `${JSON.stringify({$comment: manifest.$comment, names: Object.fromEntries(entries)}, null, 2)}\n`,
  ).toMatchFileSnapshot('./manifest.json')
})
