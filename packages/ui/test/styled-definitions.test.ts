/**
 * Every styled component of @sanity/ui writes its rules inside `@layer u-styled { … }`, so that
 * apps can order them through cascade layers, and `StyledLayerOrder` (`core/styles/helpers.ts`)
 * declares that layer's place before any of those blocks reaches the sheet. styled-components is
 * replaced with a pass-through that records each template a styled component or a `css` helper is
 * defined with.
 */
import fs from 'node:fs'
import path from 'node:path'

import {beforeEach, expect, test, vi} from 'vitest'

const STATEMENT = '@layer u-tokens, u-utilities, u-styled;'

const recorded = vi.hoisted(() => ({
  css: [] as unknown[][],
  styled: [] as unknown[][],
}))

vi.mock('styled-components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('styled-components')>()

  function record<T extends (...args: never[]) => unknown>(template: T): T {
    return new Proxy(template, {
      apply(target, thisArg, args: unknown[]) {
        recorded.styled.push(args)

        return Reflect.apply(target, thisArg, args)
      },
      get(target, key, receiver) {
        const value: unknown = Reflect.get(target, key, receiver)

        return (key === 'attrs' || key === 'withConfig') && typeof value === 'function'
          ? (options: unknown) => record(Reflect.apply(value, target, [options]))
          : value
      },
    })
  }

  const styled = new Proxy(actual.styled, {
    apply: (target, thisArg, args: unknown[]) => record(Reflect.apply(target, thisArg, args)),
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)

      return typeof value === 'function' ? record(value) : value
    },
  })

  const css = (...args: unknown[]) => {
    recorded.css.push(args)

    return Reflect.apply(actual.css, undefined, args)
  }

  return {...actual, css, default: styled, styled}
})

const SRC_DIR = path.resolve(import.meta.dirname, '../src')

const sources = Object.fromEntries(
  fs
    .readdirSync(SRC_DIR, {recursive: true, encoding: 'utf8'})
    .filter((file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file))
    .map((file) => [path.join(SRC_DIR, file), fs.readFileSync(path.join(SRC_DIR, file), 'utf8')]),
)

const modules = Object.keys(sources).filter(
  (file) =>
    /from 'styled-components'/.test(sources[file]) &&
    /\bstyled[.(]/.test(sources[file]) &&
    !sources[file].includes(STATEMENT),
)

function templateText(args: unknown[]): string | null {
  const [strings] = args

  return Array.isArray(strings) && 'raw' in strings ? strings.join('${…}').trim() : null
}

/** Whether the text is one `@layer u-styled { … }` block and nothing else. */
function isLayeredBlock(text: string): boolean {
  const open = /^@layer u-styled\s*\{/.exec(text)
  if (!open) return false

  let depth = 0

  for (let index = open[0].length - 1; index < text.length; index += 1) {
    if (text[index] === '{') depth += 1
    if (text[index] === '}') depth -= 1
    if (depth === 0) return index === text.length - 1
  }

  return false
}

beforeEach(() => {
  vi.resetModules()
  recorded.css.length = 0
  recorded.styled.length = 0
})

test('finds the modules that define styled components', () => {
  expect(modules.length).toBeGreaterThan(30)
})

test.each(modules.map((file) => path.relative(SRC_DIR, file)))(
  '%s declares the layer order first, then layered rules',
  async (file) => {
    await import(/* @vite-ignore */ path.join(SRC_DIR, file))

    const [order, ...definitions] = recorded.styled.map(templateText)

    expect(order).toBe(STATEMENT)
    expect(definitions.length).toBeGreaterThan(0)

    for (const text of definitions) {
      expect(text, 'define styled components with a tagged template').not.toBeNull()
      expect(isLayeredBlock(text!), `rules outside \`@layer u-styled\`:\n${text}`).toBe(true)
    }

    for (const args of recorded.css) {
      expect(templateText(args) ?? '').not.toMatch(/@layer\b/)
    }
  },
)
