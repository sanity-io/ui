import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

import * as avatarStories from '../stories/primitives/Avatar.stories'

const {WithViewTransition} = composeStories(avatarStories)

// Served by the `slowImage` plugin in vitest.config.ts once the delay has passed
const SLOW_IMAGE_DELAY = 300
const SLOW_IMAGE_SRC = `/__slow-image?delay=${SLOW_IMAGE_DELAY}`

interface Sample {
  hidden: boolean
  imageLoaded: boolean | null
  time: number
}

function avatarRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-ui="Avatar"]')
}

/**
 * Samples the avatar on every frame until the `Activity` that hides it is revealed
 */
async function sampleUntilRevealed(): Promise<Sample[]> {
  const samples: Sample[] = []
  const deadline = performance.now() + 3_000

  do {
    const root = avatarRoot()
    const img = root?.querySelector('img')

    samples.push({
      hidden: root?.style.display === 'none',
      imageLoaded: img ? img.complete && img.naturalWidth > 0 : null,
      time: performance.now(),
    })

    // oxlint-disable-next-line no-await-in-loop
    await new Promise(requestAnimationFrame)
  } while (performance.now() < deadline && samples.at(-1)!.hidden)

  return samples
}

// React only waits for images that render as a native <img> (with no `onLoad`
// handler and no `loading="lazy"`), so this guards the markup the Avatar
// image is rendered with.
describe('Primitives/Avatar', () => {
  test('a <ViewTransition> reveals the avatar only once its image has loaded', async () => {
    const screen = await render(<WithViewTransition src={SLOW_IMAGE_SRC} />)

    // The hidden `Activity` keeps the avatar mounted but hidden, without an image yet
    expect(avatarRoot()?.style.display).toBe('none')
    expect(avatarRoot()?.querySelector('img')).toBeNull()

    const clickedAt = performance.now()
    await userEvent.click(screen.getByRole('button', {name: 'Show avatar'}))
    const samples = await sampleUntilRevealed()
    const revealed = samples.at(-1)!

    expect(revealed.hidden).toBe(false)
    // The very first frame that shows the avatar already has the loaded image
    expect(revealed.imageLoaded).toBe(true)
    // ...because the transition was held back for it instead of committing right away
    expect(revealed.time - clickedAt).toBeGreaterThanOrEqual(SLOW_IMAGE_DELAY - 50)
  })
})
