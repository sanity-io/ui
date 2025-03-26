/** @jest-environment node */
import {renderToStaticMarkup, renderToString} from 'react-dom/server'

import {usePrefersReducedMotion} from './usePrefersReducedMotion'

function Log() {
  const reduceMotion = usePrefersReducedMotion()

  return <>prefers-motion: {JSON.stringify(reduceMotion)}</>
}

describe('usePrefersReducedMotion', () => {
  it(`SSR to static markup returns false`, () => {
    expect(renderToStaticMarkup(<Log />)).toBe('prefers-motion: false')
  })
  it(`SSR to markup for hydration doesn't throw`, () => {
    expect(renderToString(<Log />)).toMatchInlineSnapshot(`"prefers-motion: <!-- -->false"`)
  })
})
