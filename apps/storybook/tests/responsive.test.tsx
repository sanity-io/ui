import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page} from 'vitest/browser'

import * as boxStories from '../stories/primitives/Box.stories'
import * as gridStories from '../stories/primitives/Grid.stories'
import * as layerStories from '../stories/utils/Layer.stories'

const {Responsive: ResponsiveBox} = composeStories(boxStories)
const {Responsive: ResponsiveGrid} = composeStories(gridStories)
const {ResponsiveZOffset} = composeStories(layerStories)

describe('Primitives/Box', () => {
  test('resizing window should hide and show responsive elements', async () => {
    const sizes = [
      {viewport: [320, 600], css: {display: 'none', flex: '1 1 0%', boxSizing: 'content-box'}},
      {viewport: [360, 600], css: {display: 'block', flex: '2 1 0%', boxSizing: 'border-box'}},
      {viewport: [600, 600], css: {display: 'none', flex: '3 1 0%', boxSizing: 'content-box'}},
      {viewport: [900, 600], css: {display: 'block', flex: '4 1 0%', boxSizing: 'border-box'}},
      {viewport: [1200, 600], css: {display: 'none', flex: '5 1 0%', boxSizing: 'content-box'}},
      {viewport: [1800, 600], css: {display: 'block', flex: '6 1 0%', boxSizing: 'border-box'}},
      {viewport: [2400, 600], css: {display: 'none', flex: '7 1 0%', boxSizing: 'content-box'}},
    ]

    await render(<ResponsiveBox />)

    const box = document.getElementById('responsive-box')!

    for (const {css, viewport} of sizes) {
      await page.viewport(viewport[0], viewport[1])

      await expect.poll(() => getComputedStyle(box).display).toBe(css.display)
      expect(getComputedStyle(box).flex).toBe(css.flex)
      expect(getComputedStyle(box).boxSizing).toBe(css.boxSizing)
    }
  })
})

describe('Primitives/Grid', () => {
  test('should have responsive styles', async () => {
    const sizes = [
      {
        viewport: [320, 600],
        css: {
          gap: 'normal',
          gridTemplateColumns: '280px',
          gridTemplateRows: '19px 19px 19px 19px 19px 19px 19px 19px 19px 19px 19px 19px',
        },
      },
      {
        viewport: [360, 375],
        css: {
          gap: '4px',
          gridTemplateColumns: '146px 146px',
          gridTemplateRows: '27px 27px 27px 27px 27px 27px',
        },
      },
      {
        viewport: [600, 768],
        css: {
          gap: '8px',
          gridTemplateColumns: '160px 160px 160px',
          gridTemplateRows: '35px 35px 35px 35px',
        },
      },
      {
        viewport: [900, 1024],
        css: {
          gap: '12px',
          gridTemplateColumns: '190px 190px 190px 190px',
          gridTemplateRows: '35px 35px 35px 35px',
        },
      },
      {
        viewport: [1204, 1600],
        css: {
          gap: '20px',
          gridTemplateColumns: '204px 204px 204px 204px 204px',
          gridTemplateRows: '35px 35px 35px 35px 35px',
        },
      },
      {
        viewport: [1800, 1920],
        css: {
          gap: '32px',
          gridTemplateColumns: '256px 256px 256px 256px 256px 256px',
          gridTemplateRows: '35px 35px 35px 35px 35px 35px',
        },
      },
      {
        viewport: [2404, 3840],
        css: {
          gap: '52px',
          gridTemplateColumns: '284px 284px 284px 284px 284px 284px 284px',
          gridTemplateRows: '35px 35px 35px 35px 35px 35px 35px',
        },
      },
    ]

    await render(<ResponsiveGrid />)

    const grid = document.getElementById('responsive-grid')!

    for (const {css, viewport} of sizes) {
      await page.viewport(viewport[0], viewport[1])

      await expect.poll(() => getComputedStyle(grid).rowGap).toBe(css.gap)
      expect(getComputedStyle(grid).columnGap).toBe(css.gap)
      expect(getComputedStyle(grid).gridTemplateColumns).toBe(css.gridTemplateColumns)
      expect(getComputedStyle(grid).gridTemplateRows).toBe(css.gridTemplateRows)
    }
  })
})

describe('Utils/Layer', () => {
  test('should support responsive z-offset', async () => {
    const sizes = [
      {viewport: [320, 600], css: {zIndex: '1'}},
      {viewport: [360, 600], css: {zIndex: '2'}},
      {viewport: [600, 600], css: {zIndex: '3'}},
      {viewport: [900, 600], css: {zIndex: '4'}},
      {viewport: [1200, 600], css: {zIndex: '5'}},
      {viewport: [1800, 600], css: {zIndex: '6'}},
      {viewport: [2400, 600], css: {zIndex: '7'}},
    ]

    for (const {css, viewport} of sizes) {
      await page.viewport(viewport[0], viewport[1])

      // The z-offset is resolved when the layer mounts, so remount per viewport
      // (the original end-to-end test reloaded the page instead)
      const screen = await render(<ResponsiveZOffset />)

      await expect
        .poll(() => document.getElementById('responsive-layer')?.getAttribute('style'))
        .toBe(`z-index: ${css.zIndex};`)

      await screen.unmount()
    }
  })
})
