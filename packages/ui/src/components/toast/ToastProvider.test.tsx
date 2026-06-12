import {act, screen} from '@testing-library/react'
import {useEffect} from 'react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '$test/utils'

import {ToastProvider} from './ToastProvider'
import {useToast} from './useToast'

// Records whether the motion-bearing toast list chunk has been evaluated. `ToastProvider` lazily
// imports it via `React.lazy(() => import('./ToastList'))`, so the factory only runs once the
// `hasPushed` latch mounts the list. A programmatic dismiss (duration 0.01) must never reach it.
const {toastListChunkState} = vi.hoisted(() => ({toastListChunkState: {evaluated: false}}))

vi.mock('./ToastList', async (importOriginal) => {
  toastListChunkState.evaluated = true
  return importOriginal<typeof import('./ToastList')>()
})

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  if (vi.isFakeTimers()) {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  }
})

function PushOnMount({duration, title}: {duration?: number; title: string}) {
  const {push} = useToast()

  useEffect(() => {
    push({duration, title})
  }, [duration, push, title])

  return null
}

describe('ToastProvider', () => {
  it('does not load the motion-bearing toast list chunk for a programmatic dismiss (duration 0.01)', async () => {
    // Guard: only meaningful before any genuine push in this file has mounted the list.
    expect(toastListChunkState.evaluated).toBe(false)

    render(
      <ToastProvider>
        <PushOnMount duration={0.01} title="Dismiss ping" />
      </ToastProvider>,
    )

    await act(async () => {
      await vi.runAllTimersAsync()
    })

    // A dismiss/ping renders nothing and must keep the motion chunk out of the graph.
    expect(toastListChunkState.evaluated).toBe(false)
    expect(screen.queryByText('Dismiss ping')).not.toBeInTheDocument()
  })

  it('loads the toast list chunk and renders the toast when one is genuinely pushed', async () => {
    // Real timers so React Testing Library's `findBy*` polling can advance while the lazy chunk
    // resolves. An `Infinity` duration keeps the toast from auto-dismissing during the test.
    vi.useRealTimers()

    render(
      <ToastProvider>
        <PushOnMount duration={Infinity} title="Real toast" />
      </ToastProvider>,
    )

    expect(await screen.findByText('Real toast')).toBeInTheDocument()
    expect(toastListChunkState.evaluated).toBe(true)
  })
})
