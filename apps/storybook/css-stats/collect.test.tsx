/// <reference types="vite/client" />
import {composeStories} from '@storybook/react-vite'
import {expect, inject, test} from 'vitest'
import {commands} from 'vitest/browser'

/**
 * Renders every story that runs as a browser test into the same page (both color schemes, `play`
 * functions included), then writes the CSS that styled-components generated, grouped by
 * componentId, with the module and variable name that define each componentId. `analyze.ts`
 * turns the dump into per-component statistics.
 */

declare module 'vitest' {
  export interface ProvidedContext {
    cssStatsOutFile: string
  }
}

const FRAME_RE = /(https?:\/\/[^\s)]+?):(\d+):\d+/
const SOURCE_RE =
  /\/(packages\/ui\/src\/[^?]+|(?:apps\/storybook\/)?(?:stories|\.storybook)\/[^?]+)/
const DECLARATION_RE = /(?:const|let|var)\s+([\w$]+)\s*=/

const storyModules = import.meta.glob<Parameters<typeof composeStories>[0]>(
  '../stories/**/*.stories.tsx',
  {eager: true},
)

interface ComposedStory {
  tags: string[]
  run: (context: {globals: Record<string, string>}) => Promise<void>
}

function isComposedStory(value: unknown): value is ComposedStory {
  return typeof value === 'function' && 'run' in value && 'tags' in value
}

function functionInterpolations(rules: unknown[]): string[] {
  return rules.flatMap((rule) => {
    if (Array.isArray(rule)) return functionInterpolations(rule)
    if (typeof rule !== 'function' || 'styledComponentId' in rule) return []
    return [rule.name || '(anonymous)']
  })
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms)
  })

  try {
    return await Promise.race([promise, timeout])
  } finally {
    clearTimeout(timer)
  }
}

const sources = new Map<string, Promise<string[]>>()

/** The module and the variable a styled component was assigned to, from its creation stack. */
async function resolveOrigin(stack: string): Promise<{source: string; name: string} | null> {
  for (const line of stack.split('\n')) {
    const frame = FRAME_RE.exec(line)
    const source = frame && SOURCE_RE.exec(frame[1])
    if (!frame || !source) continue

    const url = frame[1]
    let lines = sources.get(url)
    if (!lines) {
      lines = fetch(url)
        .then((res) => res.text())
        .then((text) => text.split('\n'))
      sources.set(url, lines)
    }

    const lineNumber = Number(frame[2])
    // oxlint-disable-next-line no-await-in-loop
    const transformed = await lines
    for (let i = lineNumber - 1; i >= 0 && i >= lineNumber - 40; i--) {
      const declaration = DECLARATION_RE.exec(transformed[i] ?? '')
      if (declaration) return {source: source[1], name: declaration[1]}
    }

    return {source: source[1], name: `line ${lineNumber}`}
  }

  return null
}

test('collect the styled-components CSS of every story', async () => {
  const stories: {id: string; theme: string; error?: string}[] = []
  const modules = Object.entries(storyModules).toSorted(([a], [b]) => a.localeCompare(b))

  for (const [path, storyModule] of modules) {
    for (const [exportName, Story] of Object.entries(composeStories(storyModule))) {
      // The same opt-out as the Storybook browser tests (`!test` removes the `test` tag)
      if (!isComposedStory(Story) || !Story.tags.includes('test')) continue

      for (const theme of ['dark', 'light']) {
        const story: {id: string; theme: string; error?: string} = {
          id: `${path}#${exportName}`,
          theme,
        }
        try {
          // oxlint-disable-next-line no-await-in-loop
          await withTimeout(Story.run({globals: {theme}}), 60_000)
          // Let effects, portals and layers render
          // oxlint-disable-next-line no-await-in-loop
          await sleep(150)
        } catch (err) {
          story.error = err instanceof Error ? err.message : String(err)
        }
        stories.push(story)
      }
    }
  }

  const groups = new Map<string, {id: string; names: string[]; rules: string[]}>()
  for (const {id, name, rules} of globalThis.__cssStats.inserted.values()) {
    const group = groups.get(id) ?? {id, names: [], rules: []}
    group.names.push(name)
    group.rules.push(...rules)
    groups.set(id, group)
  }

  const origins: Record<string, {source: string; name: string} | null> = {}
  for (const [id, stack] of globalThis.__cssStats.origins) {
    // oxlint-disable-next-line no-await-in-loop
    origins[id] = await resolveOrigin(stack)
  }

  // A level is static when its rules have no function interpolations (references to other
  // styled components aside): `isStaticRules` in styled-components
  const levels = [...globalThis.__cssStats.styles].map(([style, {calls, selfMs}]) => ({
    id: style.componentId,
    base: style.baseStyle?.componentId ?? null,
    functions: functionInterpolations(style.rules),
    calls,
    selfMs,
  }))

  await commands.writeFile(
    inject('cssStatsOutFile'),
    JSON.stringify({
      stories,
      origins,
      groups: [...groups.values()],
      levels,
      timing: globalThis.__cssStats.timing,
      insertMs: Object.fromEntries(globalThis.__cssStats.insertMsById),
    }),
  )

  expect(groups.size).toBeGreaterThan(0)
  expect(stories.filter((story) => story.error)).toEqual([])
})
