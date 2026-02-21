/** @jest-environment node */
import {renderToStaticMarkup, renderToString} from 'react-dom/server'
import {describe, expect, it} from 'vitest'

import {usePrefersDark} from './usePrefersDark'

function Log() {
  const dark = usePrefersDark()

  return <>dark: {JSON.stringify(dark)}</>
}

describe('usePrefersDark', () => {
  it(`SSR to static markup returns false`, () => {
    expect(renderToStaticMarkup(<Log />)).toBe('dark: false')
  })
  it(`SSR to markup for hydration doesn't throw`, () => {
    expect(renderToString(<Log />)).toMatchInlineSnapshot(`"dark: <!-- -->false"`)
  })
})
