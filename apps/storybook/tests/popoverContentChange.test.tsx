import {Button, Text, ThemeProvider} from '@sanity/ui'
import {Popover} from '@sanity/ui/popover'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

import * as popoverStories from '../stories/primitives/Popover.stories'

const {ContentChange} = composeStories(popoverStories)

const POLL = {timeout: 5000}

const theme = buildTheme()

const LONG_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20)

function WrappingContent() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{position: 'fixed', left: 40, bottom: 160}}>
        <Popover
          constrainSize
          content={<Text size={1}>{LONG_TEXT}</Text>}
          fallbackPlacements={['top']}
          open
          padding={3}
          placement="bottom"
          portal
        >
          <Button text="Reference" />
        </Popover>
      </div>
    </ThemeProvider>
  )
}

function popoverElement(): HTMLElement {
  return document.querySelector<HTMLElement>('[data-ui="Popover"]')!
}

function itemsElement(): HTMLElement {
  return document.querySelector<HTMLElement>('[data-testid="popover-items"]')!
}

function placement(): string | null {
  return popoverElement().getAttribute('data-placement')
}

async function updatePosition(): Promise<void> {
  window.dispatchEvent(new Event('resize'))
  await new Promise((resolve) => requestAnimationFrame(resolve))
}

describe('constrained popover with changing content', () => {
  test('moves back above its reference when its content grows again', async () => {
    await page.viewport(800, 600)
    const screen = await render(<ContentChange />)

    await expect.poll(placement, POLL).toBe('top')

    await userEvent.click(screen.getByRole('button', {name: 'Intro'}))
    await expect.poll(placement, POLL).toBe('bottom')

    await userEvent.click(screen.getByRole('button', {name: 'All'}))
    await expect.poll(placement, POLL).toBe('top')
    expect(itemsElement().scrollHeight).toBeLessThanOrEqual(itemsElement().clientHeight)
  })

  test('keeps its side and max height across repeated updates', async () => {
    await page.viewport(800, 600)
    const screen = await render(<ContentChange />)

    await userEvent.click(screen.getByRole('button', {name: 'Intro'}))
    await expect.poll(placement, POLL).toBe('bottom')
    await userEvent.click(screen.getByRole('button', {name: 'All'}))
    await expect.poll(placement, POLL).toBe('top')

    const {maxHeight} = popoverElement().style

    await updatePosition()
    await updatePosition()
    await updatePosition()

    expect(placement()).toBe('top')
    expect(popoverElement().style.maxHeight).toBe(maxHeight)
  })

  test('keeps the scroll position of its content when it updates while capped', async () => {
    await page.viewport(800, 420)
    await render(<ContentChange />)

    await expect
      .poll(() => itemsElement().scrollHeight > itemsElement().clientHeight, POLL)
      .toBe(true)

    itemsElement().scrollTop = 40
    await updatePosition()

    expect(itemsElement().scrollTop).toBe(40)
  })

  test('measures wrapping content at the width it wraps to', async () => {
    await page.viewport(800, 600)
    await render(<WrappingContent />)

    await expect.poll(placement, POLL).toBe('top')
    await updatePosition()
    expect(placement()).toBe('top')
  })
})
