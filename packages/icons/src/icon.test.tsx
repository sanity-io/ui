import {render, waitFor} from '@testing-library/react'
import {createRef} from 'react'
import {isForwardRef} from 'react-is'
import {expect, test} from 'vitest'

import {RocketIcon} from './exports/Rocket'
import {Icon} from './icon'

// Lazy icon chunks are transformed on demand by vite, which can be slow when the whole
// suite runs in parallel workers – wait generously for them.
const LOAD_TIMEOUT = {timeout: 10_000}
const TEST_TIMEOUT = 15_000

test(
  'should render the fallback svg while loading, then the icon itself',
  async () => {
    const {container} = render(<Icon symbol="rocket" />)

    // The Suspense fallback mirrors the generated icons' svg shell, so the slot reserves its
    // final size (and responds to `[data-sanity-icon]` styling) while the chunk loads – it
    // just has no drawing content yet, like an `<img>` before its `src` has arrived.
    const fallback = container.querySelector('svg[data-sanity-icon="rocket"]')
    expect(fallback).toBeInTheDocument()
    expect(fallback).toHaveAttribute('width', '1em')
    expect(fallback).toHaveAttribute('height', '1em')
    expect(fallback).toHaveAttribute('viewBox', '0 0 25 25')
    expect(fallback).toHaveAttribute('fill', 'none')
    expect(fallback).toBeEmptyDOMElement()

    // Once the lazy import resolves, the real icon replaces the fallback with the same shell.
    await waitFor(() => {
      expect(container.querySelector('svg[data-sanity-icon="rocket"]')).not.toBeEmptyDOMElement()
    }, LOAD_TIMEOUT)

    const icon = container.querySelector('svg[data-sanity-icon="rocket"]')
    expect(icon).toHaveAttribute('width', '1em')
    expect(icon).toHaveAttribute('height', '1em')
    expect(icon).toHaveAttribute('viewBox', '0 0 25 25')
    expect(icon).toHaveAttribute('fill', 'none')
  },
  TEST_TIMEOUT,
)

test(
  'should spread props onto the fallback svg as well as the loaded icon',
  async () => {
    const {container} = render(<Icon symbol="bolt" aria-label="bolt icon" className="my-icon" />)

    const fallback = container.querySelector('svg[data-sanity-icon="bolt"]')
    expect(fallback).toBeEmptyDOMElement()
    expect(fallback).toHaveAttribute('aria-label', 'bolt icon')
    expect(fallback).toHaveClass('my-icon')

    await waitFor(() => {
      expect(container.querySelector('svg[data-sanity-icon="bolt"]')).not.toBeEmptyDOMElement()
    }, LOAD_TIMEOUT)

    const icon = container.querySelector('svg[data-sanity-icon="bolt"]')
    expect(icon).toHaveAttribute('aria-label', 'bolt icon')
    expect(icon).toHaveClass('my-icon')
  },
  TEST_TIMEOUT,
)

test('should forward a ref to the underlying svg element', () => {
  const ref = createRef<SVGSVGElement>()

  render(<RocketIcon ref={ref} />)

  expect(ref.current).toBeInstanceOf(SVGSVGElement)
  expect(ref.current).toHaveAttribute('data-sanity-icon', 'rocket')
})

test('Icon and the generated icons are `React.forwardRef` components', () => {
  // `forwardRef` (rather than React 19's ref-as-prop model) is what makes refs attach on
  // React 18 as well – the `react` peer dependency range spans both majors.
  expect(isForwardRef(<Icon symbol="rocket" />)).toBe(true)
  expect(isForwardRef(<RocketIcon />)).toBe(true)
})

test(
  'should forward a ref through the Icon wrapper',
  async () => {
    const ref = createRef<SVGSVGElement>()

    render(<Icon symbol="add" ref={ref} />)

    // While the chunk loads the ref points at the fallback svg …
    expect(ref.current).toBeInstanceOf(SVGSVGElement)
    expect(ref.current).toHaveAttribute('data-sanity-icon', 'add')
    expect(ref.current?.hasChildNodes()).toBe(false)

    // … and moves over to the real svg element once it renders.
    await waitFor(() => {
      expect(ref.current?.hasChildNodes()).toBe(true)
    }, LOAD_TIMEOUT)
    expect(ref.current).toBeInstanceOf(SVGSVGElement)
    expect(ref.current).toHaveAttribute('data-sanity-icon', 'add')
  },
  TEST_TIMEOUT,
)

test(
  'should render an already-loaded icon synchronously on subsequent mounts',
  async () => {
    const first = render(<Icon symbol="sun" />)
    await waitFor(() => {
      expect(first.container.querySelector('svg[data-sanity-icon="sun"]')).not.toBeEmptyDOMElement()
    }, LOAD_TIMEOUT)
    first.unmount()

    // The lazy component has resolved, so a re-mount renders the icon without a fallback pass.
    const {container} = render(<Icon symbol="sun" />)
    expect(container.querySelector('svg[data-sanity-icon="sun"]')).not.toBeEmptyDOMElement()
  },
  TEST_TIMEOUT,
)
