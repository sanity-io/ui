import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

import type {BrowserContext, Page} from 'playwright'

declare global {
  interface Window {
    __STORYBOOK_PREVIEW__?: {currentRender?: {phase?: string}}
    __STORYBOOK_ADDONS_CHANNEL__?: {
      on: (event: string, listener: (storyId: string) => void) => void
      off: (event: string, listener: (storyId: string) => void) => void
      emit: (event: string, payload: {storyId: string; viewMode?: string}) => void
    }
  }
}

interface IndexEntry {
  id: string
  type: string
  tags?: string[]
}

const CONTENT_TYPES: Record<string, string> = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mjs': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

const CACHE_DIR = path.join(import.meta.dirname, 'out', 'remote-cache')

/** Serves a static Storybook build (`storybook build`) on a free local port. */
export function serveStatic(dir: string): Promise<{url: string; close: () => void}> {
  const root = path.resolve(dir)
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname)
    const file = path.join(root, pathname === '/' ? 'index.html' : pathname)
    const relative = path.relative(root, file)
    if (
      relative.startsWith('..') ||
      path.isAbsolute(relative) ||
      !fs.existsSync(file) ||
      fs.statSync(file).isDirectory()
    ) {
      res.statusCode = 404
      res.end()
      return
    }
    res.setHeader('Content-Type', CONTENT_TYPES[path.extname(file)] ?? 'application/octet-stream')
    fs.createReadStream(file).pipe(res)
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      resolve({url: `http://127.0.0.1:${port}`, close: () => server.close()})
    })
  })
}

/** The stories that run as browser tests (the same opt-out as `pnpm test:browser`). */
export function testedStories(dir: string): string[] {
  const index: unknown = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'), 'utf8'))
  if (!index || typeof index !== 'object' || !('entries' in index)) {
    throw new Error(`${dir} is not a static Storybook build`)
  }
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const entries = Object.values(index.entries as Record<string, IndexEntry>)

  return entries
    .filter((entry) => entry.type === 'story' && entry.tags?.includes('test'))
    .map((entry) => entry.id)
}

/**
 * Serves remote requests (the Inter web fonts of the preview) from a local cache: fonts that
 * arrive at different times between runs change text metrics, and so computed sizes and timings.
 */
export async function cacheRemoteRequests(context: BrowserContext): Promise<void> {
  await context.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, async (route) => {
    const url = route.request().url()
    const file = path.join(CACHE_DIR, encodeURIComponent(url))
    if (!fs.existsSync(file)) {
      const response = await fetch(url)
      if (!response.ok) {
        await route.abort()
        return
      }
      fs.mkdirSync(CACHE_DIR, {recursive: true})
      fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()))
      fs.writeFileSync(`${file}.type`, response.headers.get('content-type') ?? '')
    }
    await route.fulfill({
      body: fs.readFileSync(file),
      contentType: fs.readFileSync(`${file}.type`, 'utf8') || undefined,
      headers: {'access-control-allow-origin': '*'},
    })
  })
}

/** Resolves once the current story, including its `play` function, has finished rendering. */
export async function waitForStory(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const phase = window.__STORYBOOK_PREVIEW__?.currentRender?.phase
      return phase === 'completed' || phase === 'finished' || phase === 'errored'
    },
    undefined,
    {timeout: 120_000},
  )
  const phase = await page.evaluate(() => window.__STORYBOOK_PREVIEW__?.currentRender?.phase)
  if (phase === 'errored') throw new Error('the story errored')
}
