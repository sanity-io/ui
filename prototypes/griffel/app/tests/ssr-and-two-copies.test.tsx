import {createDOMRenderer, RendererProvider, renderToStyleElements} from '@griffel/react'
import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, test} from 'vitest'

import * as v1 from 'griffel-button-v1'
import * as v2 from 'griffel-button-v2'

const GRIFFEL_CLASS = /^[fr][0-9a-z]+$/

function griffelClassesOf(html: string): string[] {
  const match = /<button[^>]*class="([^"]+)"/.exec(html)
  if (!match) throw new Error(`no button in ${html}`)
  return match[1]!.split(' ').filter((c) => GRIFFEL_CLASS.test(c))
}

describe('server-side rendering (Node, no DOM)', () => {
  test('renderToStyleElements() returns the precompiled CSS of everything that rendered', () => {
    const renderer = createDOMRenderer()
    const html = renderToStaticMarkup(
      <RendererProvider renderer={renderer}>
        <v1.ThemeProvider theme={v1.defaultTheme}>
          <v1.Button tone="primary" mode="ghost" text="ssr" width={120} />
        </v1.ThemeProvider>
      </RendererProvider>,
    )
    const css = renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>)

    expect(html).toContain('data-version="1.0.0"')
    expect(html).toContain('style="--sui-font-family:')
    expect(html).toContain('--btn-width:120px')
    expect(css).toContain('data-make-styles-rehydration="true"')
    expect(css).toContain('data-make-styles-bucket="r"')
    expect(css).toContain('data-make-styles-bucket="d"')
    expect(css).toContain('data-make-styles-bucket="m"')

    // Every Griffel class on the button has a rule in the SSR stylesheet
    for (const className of griffelClassesOf(html)) {
      expect(css, className).toContain(`.${className}`)
    }
  })

  test('a library that bundles its own Griffel copy ignores the app renderer (known two-copies limit)', () => {
    const renderer = createDOMRenderer()
    const html = renderToStaticMarkup(
      <RendererProvider renderer={renderer}>
        <v2.Button tone="primary" text="ssr" />
      </RendererProvider>,
    )
    const css = renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>)

    expect(html).toContain('data-version="2.0.0"')
    // v2's RendererProvider is a different React context, so its CSS went to v2's own default renderer
    expect(css).toBe('')
  })
})

describe('two Griffel runtime copies on one page', () => {
  test('the copies are distinct modules', () => {
    expect(v1.mergeClasses).not.toBe(v2.mergeClasses)
  })

  test('mergeClasses() of one copy resolves classes produced by the other copy (lookup table shared via Symbol.for)', () => {
    const v1Html = renderToStaticMarkup(<v1.Button tone="primary" text="a" />)
    const v2Html = renderToStaticMarkup(<v2.Button tone="primary" text="b" />)
    const v1Classes = /<button[^>]*class="([^"]+)"/.exec(v1Html)![1]!
    const v2Classes = /<button[^>]*class="([^"]+)"/.exec(v2Html)![1]!

    const v1Radius = 'f18vnl5v' // border-radius: var(--sui-radius-2) — only v1
    const anyAtomicClass = /\bf[0-9a-z]+\b/
    expect(v1Classes).toContain(v1Radius)
    expect(v2Classes).not.toContain(v1Radius)

    // Merging with the *app's* copy: v2's border-radius must win and v1's must be dropped
    const merged = v1.mergeClasses(v1Classes, v2Classes)
    expect(merged).not.toContain(v1Radius)
    expect(merged.split(' ').filter((c) => GRIFFEL_CLASS.test(c)).length).toBeLessThan(
      griffelClassesOf(v1Html).length + griffelClassesOf(v2Html).length,
    )
    expect(merged).toMatch(anyAtomicClass)

    // ...and the other way round, with the copy bundled inside v2
    const mergedByV2 = v2.mergeClasses(v2Classes, v1Classes)
    expect(mergedByV2).toContain(v1Radius)
  })

  test('identical declarations produce identical class names in both copies (content hashing)', () => {
    const v1Html = renderToStaticMarkup(<v1.Button tone="critical" mode="bleed" text="a" />)
    const v2Html = renderToStaticMarkup(<v2.Button tone="critical" mode="bleed" text="a" />)
    const shared = griffelClassesOf(v1Html).filter((c) => griffelClassesOf(v2Html).includes(c))

    // the structural reset, the tone/mode variables, hover/active/focus rules…
    expect(shared.length).toBeGreaterThan(20)
    expect(shared).toContain('rjb6s26')
  })
})
