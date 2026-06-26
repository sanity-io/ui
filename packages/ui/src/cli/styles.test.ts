import {mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {hasStylesImport, inspectStylesheet, wireStylesheet} from './styles.js'

describe('hasStylesImport', () => {
  it('matches single and double quoted imports', () => {
    expect(hasStylesImport(`import '@sanity-labs/ui-poc/styles.css'`)).toBe(true)
    expect(hasStylesImport(`import "@sanity-labs/ui-poc/styles.css"`)).toBe(true)
    expect(hasStylesImport(`import './app.css'`)).toBe(false)
  })

  it('matches a require of the stylesheet', () => {
    expect(hasStylesImport(`require('@sanity-labs/ui-poc/styles.css')`)).toBe(true)
  })

  it('ignores a commented-out or string mention of the path', () => {
    expect(hasStylesImport(`// import '@sanity-labs/ui-poc/styles.css'`)).toBe(false)
    expect(hasStylesImport(`const note = 'see @sanity-labs/ui-poc/styles.css'`)).toBe(false)
  })
})

describe('wireStylesheet', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-styles-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  function write(rel: string, content: string): string {
    const full = join(dir, rel)
    mkdirSync(join(full, '..'), {recursive: true})
    writeFileSync(full, content)
    return full
  }

  it('inserts after the leading import block', () => {
    write(
      'src/main.tsx',
      `import {createRoot} from 'react-dom/client'\nimport App from './App'\n\ncreateRoot()\n`,
    )
    const result = wireStylesheet(dir, 'src/main.tsx')
    expect(result.wrote).toBe(true)
    const lines = readFileSync(join(dir, 'src/main.tsx'), 'utf8').split('\n')
    expect(lines[2]).toBe(`import '@sanity-labs/ui-poc/styles.css'`)
  })

  it('inserts after a multiline import without splitting it', () => {
    write(
      'src/main.tsx',
      `import {\n  StrictMode,\n  useState,\n} from 'react'\nimport App from './App'\n\ncreateRoot()\n`,
    )
    wireStylesheet(dir, 'src/main.tsx')
    const content = readFileSync(join(dir, 'src/main.tsx'), 'utf8')
    // The import must land after the whole react import, not between its lines.
    expect(content).toContain(`} from 'react'\nimport App from './App'\nimport '@sanity-labs/ui-poc/styles.css'`)
    expect(content).not.toMatch(/import \{\nimport '@sanity-labs/)
  })

  it('keeps a leading use-client directive first', () => {
    write('app/layout.tsx', `'use client'\nimport {x} from 'y'\n`)
    wireStylesheet(dir, 'app/layout.tsx')
    const lines = readFileSync(join(dir, 'app/layout.tsx'), 'utf8').split('\n')
    expect(lines[0]).toBe(`'use client'`)
    expect(lines.includes(`import '@sanity-labs/ui-poc/styles.css'`)).toBe(true)
  })

  it('injects into astro frontmatter', () => {
    write('src/layouts/Layout.astro', `---\nconst {title} = Astro.props\n---\n<html></html>\n`)
    wireStylesheet(dir, 'src/layouts/Layout.astro')
    const content = readFileSync(join(dir, 'src/layouts/Layout.astro'), 'utf8')
    expect(content).toContain(`import '@sanity-labs/ui-poc/styles.css'`)
    expect(content.indexOf(`import '@sanity-labs/ui-poc/styles.css'`)).toBeLessThan(content.indexOf('<html>'))
  })

  it('is idempotent', () => {
    write('src/main.tsx', `import App from './App'\n`)
    wireStylesheet(dir, 'src/main.tsx')
    const second = wireStylesheet(dir, 'src/main.tsx')
    expect(second.already).toBe(true)
    expect(second.wrote).toBe(false)
  })

  it('reports a missing entry instead of throwing', () => {
    const result = wireStylesheet(dir, 'src/main.tsx')
    expect(result.missing).toBe(true)
  })
})

describe('inspectStylesheet', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-inspect-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  it('finds the import in a sibling file when not in the entry', () => {
    mkdirSync(join(dir, 'src'), {recursive: true})
    writeFileSync(join(dir, 'src/main.tsx'), `import App from './App'\n`)
    writeFileSync(join(dir, 'src/App.tsx'), `import '@sanity-labs/ui-poc/styles.css'\n`)
    const result = inspectStylesheet(dir, 'src/main.tsx')
    expect(result.imported).toBe(true)
    expect(result.importedIn).toBe(join('src', 'App.tsx'))
  })

  it('finds the import in a nested route file', () => {
    mkdirSync(join(dir, 'app/routes'), {recursive: true})
    writeFileSync(join(dir, 'app/root.tsx'), `export default function Root() {}\n`)
    writeFileSync(join(dir, 'app/routes/home.tsx'), `import '@sanity-labs/ui-poc/styles.css'\n`)
    const result = inspectStylesheet(dir, 'app/root.tsx')
    expect(result.imported).toBe(true)
  })

  it('reports missing when absent everywhere', () => {
    mkdirSync(join(dir, 'src'), {recursive: true})
    writeFileSync(join(dir, 'src/main.tsx'), `import App from './App'\n`)
    expect(inspectStylesheet(dir, 'src/main.tsx').imported).toBe(false)
  })
})
