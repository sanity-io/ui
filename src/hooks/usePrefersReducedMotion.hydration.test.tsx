/** @jest-environment jsdom */
/**
 * As this hook is used for top-level theming it's likely to be called while server-rendering
 * and that's why it's worth it to have a testing suite for hydration
 */
import {waitFor} from '@testing-library/dom'
import {hydrateRoot} from 'react-dom/client'

import {usePrefersReducedMotion} from './usePrefersReducedMotion'

function Log() {
  const reduceMotion = usePrefersReducedMotion()

  return <>prefers-motion: {JSON.stringify(reduceMotion)}</>
}

const originalMatchMedia = window.matchMedia

describe('usePrefersReducedMotion SSR hydration', () => {
  beforeAll(() => {
    window.matchMedia = () =>
      ({
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        matches: true,
      } as any)
  })

  afterAll(() => {
    window.matchMedia = originalMatchMedia
  })

  it(`hydrates without any warnings`, async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    const node = document.createElement('div')

    document.body.appendChild(node)

    node.innerHTML = `prefers-motion: <!-- -->false`

    hydrateRoot(node, <Log />)

    // It's false initially
    await waitFor(() => expect(node.innerHTML).toBe('prefers-motion: <!-- -->false'))

    // After hydration it should switch to true
    await waitFor(() => expect(node.innerHTML).toBe('prefers-motion: <!-- -->true'))

    // eslint-disable-next-line no-console
    expect(console.error).not.toHaveBeenCalled()

    spy.mockReset()
    spy.mockRestore()
  })
})
