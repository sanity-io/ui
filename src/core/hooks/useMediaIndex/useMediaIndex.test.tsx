/** @jest-environment node */

import {renderToStaticMarkup, renderToString} from 'react-dom/server'

import {useMediaIndex} from './useMediaIndex'

function Log() {
  const mediaIndex = useMediaIndex()

  return <>mediaIndex: {JSON.stringify(mediaIndex)}</>
}

describe('useMediaIndex', () => {
  it(`SSR to static markup returns 0`, () => {
    expect(renderToStaticMarkup(<Log />)).toBe('mediaIndex: 0')
  })
  it(`SSR to markup for hydration doesn't throw`, () => {
    expect(renderToString(<Log />)).toMatchInlineSnapshot(`"mediaIndex: <!-- -->0"`)
  })
})
