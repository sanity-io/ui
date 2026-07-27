import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'

import * as toastStories from '../stories/components/Toast.stories'

const {Default} = composeStories(toastStories)

interface Sample {
  container: number
  content: number
  loadingBar: number
}

function opacityOf(element: Element): number {
  return Number.parseFloat(getComputedStyle(element).opacity)
}

/**
 * Samples the opacity of the toast and of its two animated children on every frame, until they are
 * all fully visible
 */
async function sampleOpacities(): Promise<Sample[]> {
  const container = document.querySelector('[data-ui="Toast"]')!
  const content = container.querySelector(':scope > [data-ui="Flex"]')!
  const loadingBar = container.querySelector(':scope > div:not([data-ui])')!
  const samples: Sample[] = []
  const deadline = performance.now() + 2_000

  do {
    samples.push({
      container: opacityOf(container),
      content: opacityOf(content),
      loadingBar: opacityOf(loadingBar),
    })

    // oxlint-disable-next-line no-await-in-loop
    await new Promise(requestAnimationFrame)
  } while (
    performance.now() < deadline &&
    (samples.at(-1)!.content < 1 || samples.at(-1)!.loadingBar < 1)
  )

  return samples
}

describe('Components/Toast', () => {
  test('should stagger the content in after the container', async () => {
    expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(false)

    await render(<Default duration={10_000} onClose={() => {}} />)

    const samples = await sampleOpacities()

    // The container fades in before its children (`when: 'beforeChildren'`)
    expect(samples.some(({container, content}) => container === 1 && content < 1)).toBe(true)
    // The loading bar is the second child, so the stagger delays it behind the content
    expect(samples.some(({content, loadingBar}) => content === 1 && loadingBar < 1)).toBe(true)
    // And everything ends up fully visible
    expect(samples.at(-1)).toEqual({container: 1, content: 1, loadingBar: 1})
  })
})
