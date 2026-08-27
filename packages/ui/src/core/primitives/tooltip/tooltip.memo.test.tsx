/** @vitest-environment jsdom */

import {act, fireEvent, render as renderWithoutWrappers, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'

import {memo, useEffect, useEffectEvent} from 'react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {Tooltip} from './tooltip'

beforeEach(() => {
  vi.useFakeTimers()
})

// Run all pending timers and switch back to real timers
afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
})

/**
 * Closed tooltips are pre-rendered in the DOM inside a hidden `<Activity>` boundary (or not yet
 * rendered at all, since hidden activities render at low priority), so "hidden" means either
 * absent or present-but-invisible.
 */
function expectTooltipHidden(text: string) {
  const element = screen.queryByText(text)

  if (element) {
    expect(element).not.toBeVisible()
  }
}

/**
 * Consumers may wrap `Tooltip` in `memo`. The `useCloseOnMouseLeave` failsafe reads
 * `referenceElement` — state that is only set after the first render — through an effect-event
 * ref, so it must keep seeing fresh values inside a `memo` fiber. React's native
 * `useEffectEvent` fails this on React 19.2 (https://github.com/facebook/react/issues/34818):
 * its handler stays frozen at the first render, where `referenceElement` is `null`, and the
 * tooltip never closes. This test pins the contract against switching `useCloseOnMouseLeave`
 * to the native hook before the upstream fix ships.
 */
describe('memo(Tooltip)', () => {
  const MemoTooltip = memo(Tooltip)

  it('closes when the mouse moves outside the reference element', () => {
    render(
      <MemoTooltip content={<Text size={1}>{'Tooltip content'}</Text>}>
        <Button mode="bleed" text="Hover me" />
      </MemoTooltip>,
    )

    const button = screen.getByText('Hover me')

    fireEvent.mouseEnter(button)
    expect(screen.getByText('Tooltip content')).toBeVisible()

    fireEvent.mouseMove(document.body)
    expectTooltipHidden('Tooltip content')
  })
})

describe('native React.useEffectEvent inside a memo component', () => {
  it('stays frozen at the first render on the installed React (facebook/react#34818)', () => {
    const seen: number[] = []

    const Probe = memo(function Probe({n}: {n: number}) {
      const onProbe = useEffectEvent(() => {
        seen.push(n)
      })

      useEffect(() => {
        const handler = () => onProbe()

        window.addEventListener('test:probe', handler)

        return () => window.removeEventListener('test:probe', handler)
      }, [])

      return null
    })

    const {rerender} = renderWithoutWrappers(<Probe n={0} />)
    rerender(<Probe n={1} />)
    rerender(<Probe n={2} />)

    act(() => {
      window.dispatchEvent(new Event('test:probe'))
    })

    // Frozen at the mount value — not merely one render behind. This is why `Tooltip`,
    // `useGlobalKeyDown` and `useClickOutsideEvent` inline the `use-effect-event` ponyfill
    // instead of using the native hook. When this assertion fails, the installed React contains
    // the fix (https://github.com/facebook/react/pull/34831): revisit the TODOs at those call
    // sites — switching also requires the fix to reach the lowest `react` peer version we
    // support.
    expect(seen).toEqual([0])
  })
})
