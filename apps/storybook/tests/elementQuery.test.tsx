import {composeStories} from '@storybook/react-vite'
import {flushSync} from 'react-dom'
import {createRoot, type Root} from 'react-dom/client'
import {afterEach, describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page} from 'vitest/browser'

import * as elementQueryStories from '../stories/utils/ElementQuery.stories'

const {NarrowContainer} = composeStories(elementQueryStories)

const POLL = {timeout: 5000}

// The story colours its card through `[data-eq-min~='0'] > &` / `[data-eq-min~='1'] > &`
const ORANGE = 'rgb(255, 165, 0)' // narrower than the first breakpoint (100px)
const GREEN = 'rgb(0, 128, 0)' // at least 100px
const BLUE = 'rgb(0, 0, 255)' // at least 200px

interface Attributes {
  min: string | null
  max: string | null
}

interface Snapshot {
  attributes: Attributes
  color: string
}

function elementQuery(): HTMLElement {
  return document.getElementById('element-query')!
}

function container(): HTMLElement {
  return document.getElementById('element-query-container')!
}

function attributes(): Attributes {
  const element = elementQuery()

  return {min: element.getAttribute('data-eq-min'), max: element.getAttribute('data-eq-max')}
}

function cardColor(): string {
  return getComputedStyle(elementQuery().firstElementChild!).color
}

function snapshot(): Snapshot {
  return {attributes: attributes(), color: cardColor()}
}

/** Runs `callback` inside the animation frame callbacks of the next frame */
function inAnimationFrame<T>(callback: () => T): Promise<T> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(callback())
    })
  })
}

/**
 * Resolves inside the animation frame callbacks of the next frame, which run after the current
 * frame has painted.
 */
function nextFrame(): Promise<void> {
  return inAnimationFrame(() => undefined)
}

/**
 * Observes the element with a second `ResizeObserver`, created after the component's own one. A
 * frame's ResizeObserver steps notify observers in creation order, so this one reads the element
 * right after the component's callback ran — after layout, before the frame paints.
 */
function snapshotBeforePaint(): Promise<Snapshot> {
  return new Promise((resolve) => {
    const probe = new ResizeObserver(() => {
      probe.disconnect()
      resolve(snapshot())
    })

    probe.observe(elementQuery())
  })
}

// `ElementQuery` writes `data-eq-min` / `data-eq-max` from a `ResizeObserver` it starts in a
// layout effect, so the browser delivers the initial entry after layout and before the first
// paint; there is no render-time fallback to the viewport width. jsdom has neither layout nor a
// real observer, so the timing can only be checked here.
describe('Utils/ElementQuery', () => {
  let root: Root | undefined
  let host: HTMLElement | undefined

  afterEach(() => {
    root?.unmount()
    host?.remove()
    root = undefined
    host = undefined
  })

  test('the first paint already has the attributes of the element width, not the viewport width', async () => {
    // Much wider than the 150px container: a viewport-derived value would be `0 1 2` / none
    await page.viewport(1200, 600)

    host = document.createElement('div')
    document.body.appendChild(host)
    const mountedRoot = createRoot(host)

    root = mountedRoot

    // Mounting inside an animation frame callback puts the commit (which starts observing from
    // the layout effect), the observer's initial entry and the element's first paint in the same
    // frame. Nothing is derived during render, so right after the commit the attributes are
    // still missing: only the observer writes them.
    const {atCommit, beforePaint} = await inAnimationFrame(() => {
      flushSync(() => {
        mountedRoot.render(<NarrowContainer />)
      })

      return {atCommit: attributes(), beforePaint: snapshotBeforePaint()}
    })

    expect(atCommit).toEqual({min: null, max: null})
    expect(await beforePaint).toEqual({attributes: {min: '0', max: '1 2'}, color: GREEN})

    // ...and that is what stays on screen
    await nextFrame()

    expect(snapshot()).toEqual({attributes: {min: '0', max: '1 2'}, color: GREEN})
  })

  test('the attributes follow the element width, not the viewport width', async () => {
    await page.viewport(1200, 600)
    await render(<NarrowContainer />)

    await expect.poll(attributes, POLL).toEqual({min: '0', max: '1 2'})
    expect(cardColor()).toBe(GREEN)

    container().style.width = '250px'

    await expect.poll(attributes, POLL).toEqual({min: '0 1', max: '2'})
    expect(cardColor()).toBe(BLUE)

    // Narrower than every breakpoint: the `min` attribute is removed rather than left empty
    container().style.width = '50px'

    await expect.poll(attributes, POLL).toEqual({min: null, max: '0 1 2'})
    expect(cardColor()).toBe(ORANGE)

    // Wider than every breakpoint: the `max` attribute goes away
    container().style.width = '350px'

    await expect.poll(attributes, POLL).toEqual({min: '0 1 2', max: null})
    expect(cardColor()).toBe(BLUE)

    // Resizing the viewport changes nothing while the element keeps its width
    await page.viewport(400, 600)
    await nextFrame()
    await nextFrame()

    expect(attributes()).toEqual({min: '0 1 2', max: null})
  })

  test('a hidden element gets its attributes in the frame that shows it, before it paints', async () => {
    const style = document.createElement('style')

    style.textContent = '#element-query-container { display: none }'
    document.head.appendChild(style)

    try {
      await render(<NarrowContainer />)

      // Browsers disagree about an element without a box: Chromium delivers an initial entry
      // with a width of 0 (every breakpoint is a `max`), the specification makes it inactive
      // until it has a size (no attributes). Neither state selects a `min` breakpoint, and
      // nothing is painted either way.
      await nextFrame()
      await nextFrame()

      expect(attributes().min).toBeNull()
      expect([null, '0 1 2']).toContain(attributes().max)

      // Revealed from an animation frame callback, the frame's layout gives the element a size
      // and its ResizeObserver steps deliver the width before the frame paints
      const {beforePaint} = await inAnimationFrame(() => {
        style.remove()

        return {beforePaint: snapshotBeforePaint()}
      })

      expect(await beforePaint).toEqual({attributes: {min: '0', max: '1 2'}, color: GREEN})
    } finally {
      style.remove()
    }
  })
})
