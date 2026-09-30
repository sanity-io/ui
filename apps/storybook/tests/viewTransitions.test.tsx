import {Layer, LayerProvider, Text, ThemeProvider, useLayer} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {startTransition, useLayoutEffect, useState, ViewTransition} from 'react'
import {flushSync} from 'react-dom'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

import {
  clearViewTransitionRecords,
  getViewTransitionRecords,
  waitForViewTransitionsToSettle,
  type ViewTransitionRecord,
} from '../stories/tests/viewTransitionMonitor'
import {VIEW_TRANSITION_SCENARIOS} from '../stories/tests/ViewTransitions'
import * as stories from '../stories/tests/ViewTransitions.stories'

const {Default} = composeStories(stories)

const DURATION = 300
const POLL = {timeout: 5000}

function isVisible(selector: string): boolean {
  return document.querySelector(selector)?.checkVisibility() ?? false
}

function getButton(name: string): HTMLButtonElement | undefined {
  return [...document.querySelectorAll('button')].find((element) => element.textContent === name)
}

async function openTooltip(name: string) {
  await userEvent.hover(getButton(name)!)
  await expect.poll(() => isVisible('[data-ui="Tooltip"]'), POLL).toBe(true)
}

async function openAutocomplete() {
  await userEvent.click(document.querySelector('input[role="combobox"]')!)
  await userEvent.keyboard('a')
  await expect.poll(() => isVisible('[role="listbox"]'), POLL).toBe(true)
}

/** Opens the overlays that only open on interaction, before they are moved */
const OPEN: Record<string, () => Promise<void>> = {
  'tooltip': () => openTooltip('Hover me'),
  'tooltip-flip': () => openTooltip('Hover me'),
  'tooltip-animated-portal': () => openTooltip('Hover me'),
  'tooltip-delay-group': () => openTooltip('One'),
  'menu-button': async () => {
    await userEvent.click(document.querySelector('button[aria-haspopup]')!)
    await expect.poll(() => isVisible('[role="menu"]'), POLL).toBe(true)
  },
  'autocomplete': openAutocomplete,
  'autocomplete-portal': openAutocomplete,
}

/** The overlays whose placement changes to `top` on Move */
const FLIPPED: Record<string, string> = {
  'popover-flip': '[data-ui="Popover"]',
  'tooltip-flip': '[data-ui="Tooltip__card"]',
}

/** Scenarios that start a second transition of their own, which React runs after the first */
const EXTRA_TRANSITION: Record<string, string> = {
  code: '`Code` loads its highlighter behind `<Suspense>`, and the reveal animates',
  toast: '`useToast().push()` updates the toasts in a transition',
}

/** The transitions that got cancelled, or that ended before their animations ran to the end */
function interrupted(records: readonly ViewTransitionRecord[]) {
  return records
    .filter(
      ({error, finishedAt, readyAt, skippedBy}) =>
        error !== null ||
        skippedBy !== null ||
        readyAt === null ||
        finishedAt === null ||
        finishedAt - readyAt < DURATION * 0.9,
    )
    .map(({error, finishedAt, readyAt, skippedBy}) => ({
      error,
      skippedBy,
      ranFor: readyAt === null || finishedAt === null ? null : Math.round(finishedAt - readyAt),
    }))
}

/**
 * Clicks one of the rig's buttons through the DOM, so the pointer stays on hovered tooltips, and
 * waits for the view transitions it starts to finish
 */
async function runTransition(name: string) {
  const button = getButton(name)

  expect(button, `the "${name}" button`).toBeDefined()
  clearViewTransitionRecords()
  button!.click()
  await expect.poll(() => getViewTransitionRecords().length, POLL).toBeGreaterThan(0)
  await waitForViewTransitionsToSettle()

  return getViewTransitionRecords()
}

describe('<ViewTransition> render rig', () => {
  test.each(VIEW_TRANSITION_SCENARIOS)('$title', async ({id}) => {
    const maxTransitions = EXTRA_TRANSITION[id] ? 2 : 1

    await render(<Default duration={DURATION} scenarios={[id]} />)

    const mount = await runTransition('Mount')
    expect.soft(interrupted(mount), 'mount').toEqual([])
    expect.soft(mount.length, 'transitions on mount').toBeLessThanOrEqual(maxTransitions)

    await OPEN[id]?.()

    const move = await runTransition('Move')
    expect.soft(interrupted(move), 'move').toEqual([])
    expect.soft(move.length, 'transitions on move').toBeLessThanOrEqual(maxTransitions)

    if (FLIPPED[id]) {
      expect
        .soft(document.querySelector(FLIPPED[id])?.getAttribute('data-placement'), 'placement')
        .toBe('top')
    }

    const unmount = await runTransition('Unmount')
    expect.soft(interrupted(unmount), 'unmount').toEqual([])
    expect.soft(unmount.length, 'transitions on unmount').toBeLessThanOrEqual(maxTransitions)
  })
})

const theme = buildTheme()

function Harness(props: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <style>{`
        ::view-transition-group(*),
        ::view-transition-old(*),
        ::view-transition-new(*) {
          animation-duration: ${DURATION}ms;
        }
      `}</style>
      <button onClick={() => startTransition(() => setMounted(true))} type="button">
        Mount
      </button>
      {mounted && (
        <ViewTransition>
          <div>{props.children}</div>
        </ViewTransition>
      )}
    </ThemeProvider>
  )
}

function FlushSyncAfterLayoutEffect() {
  const [flushed, setFlushed] = useState(false)

  useLayoutEffect(() => {
    queueMicrotask(() => flushSync(() => setFlushed(true)))
  }, [])

  return <p>{String(flushed)}</p>
}

function SetStateInLayoutEffect() {
  const [updated, setUpdated] = useState(false)

  useLayoutEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setUpdated(true)
  }, [])

  return <p>{String(updated)}</p>
}

describe('view transition monitor', () => {
  test('reports the transition that a `flushSync()` skips while it is preparing', async () => {
    await render(
      <Harness>
        <FlushSyncAfterLayoutEffect />
      </Harness>,
    )

    const [record] = await runTransition('Mount')

    expect(record.skippedBy).toContain('flushSync')
    expect(record.error).toContain('AbortError')
  })

  test('a synchronous `setState` in a layout effect does not skip the transition', async () => {
    await render(
      <Harness>
        <SetStateInLayoutEffect />
      </Harness>,
    )

    expect(interrupted(await runTransition('Mount'))).toEqual([])
  })
})

const layerSizes: {size: number; at: number}[] = []

function RecordLayerSize() {
  const {size} = useLayer()

  useLayoutEffect(() => {
    layerSizes.push({size, at: performance.now()})
  }, [size])

  return null
}

describe('Utils/Layer', () => {
  // React holds back passive effects until a view transition's animation has finished
  test('a layer that mounts in a view transition registers with its parent as it animates', async () => {
    layerSizes.length = 0

    await render(
      <Harness>
        <LayerProvider>
          <RecordLayerSize />
          <Layer>
            <Text>Child layer</Text>
          </Layer>
        </LayerProvider>
      </Harness>,
    )

    const [record] = await runTransition('Mount')
    const registeredAt = layerSizes.find(({size}) => size === 1)?.at

    expect(interrupted([record])).toEqual([])
    expect(registeredAt).toBeDefined()
    expect(registeredAt).toBeLessThan(record.finishedAt!)
  })
})
