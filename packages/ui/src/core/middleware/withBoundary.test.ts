/** @vitest-environment jsdom */

import {
  type Derivable,
  detectOverflow,
  type Middleware,
  type MiddlewareState,
  platform,
} from '@floating-ui/react-dom'
import {describe, expect, it, vi} from 'vitest'

import {withBoundary} from './withBoundary'

interface FakeOptions {
  boundary?: HTMLElement | 'clippingAncestors'
  fallbackPlacements?: string[]
  padding?: number
}

/** A middleware factory that keeps the options it was created with, like Floating UI's do */
function createFake(options: Derivable<FakeOptions>): Middleware {
  return {
    name: 'fake',
    options,
    fn(state) {
      return {data: options(state)}
    },
  }
}

/** The state a pass hands to a middleware; the fake's options do not read it */
const rect = {x: 0, y: 0, width: 0, height: 0}
const state: MiddlewareState = {
  elements: {floating: document.createElement('div'), reference: document.createElement('div')},
  initialPlacement: 'bottom',
  middlewareData: {},
  placement: 'bottom',
  platform: {...platform, detectOverflow},
  rects: {floating: rect, reference: rect},
  strategy: 'absolute',
  x: 0,
  y: 0,
}

describe('withBoundary', () => {
  it('has the middleware read the boundary from the ref when it runs, not when it is created', () => {
    const boundaryRef = {current: null as HTMLElement | null}
    const middleware = withBoundary(createFake, boundaryRef, {padding: 4})

    // No element yet: no boundary, so Floating UI falls back to the clipping ancestors
    expect(middleware.fn(state)).toEqual({data: {boundary: undefined, padding: 4}})

    const element = document.createElement('div')

    boundaryRef.current = element

    expect(middleware.fn(state)).toEqual({data: {boundary: element, padding: 4}})
  })

  it('exposes the plain options plus the ref as the middleware options `useFloating` compares', () => {
    const boundaryRef = {current: document.createElement('div')}
    const create = vi.fn(createFake)
    const middleware = withBoundary(create, boundaryRef, {fallbackPlacements: ['top'], padding: 4})

    // The middleware itself was given derivable options
    expect(create).toHaveBeenCalledWith(expect.any(Function))
    expect(middleware.name).toBe('fake')
    // What is compared: the values that must count as a change, and the ref (whose identity is
    // stable) in place of the element (whose identity must not count)
    expect(middleware.options).toEqual({boundaryRef, fallbackPlacements: ['top'], padding: 4})
    expect(middleware.options.boundaryRef).toBe(boundaryRef)
    expect(middleware.options).not.toHaveProperty('boundary')
  })
})
