/** @jest-environment node */

import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import {buildTheme} from '../../../theme'
import {ThemeProvider} from '../../theme'
import {useMediaIndex} from './useMediaIndex'

const theme = buildTheme()

function Log() {
  const mediaIndex = useMediaIndex()

  return <>mediaIndex: {JSON.stringify(mediaIndex)}</>
}

describe('useMediaIndex', () => {
  it(`SSR to static markup returns 0`, () => {
    expect(
      renderToStaticMarkup(
        <ThemeProvider theme={theme}>
          <Log />
        </ThemeProvider>,
      ),
    ).toBe('mediaIndex: 0')
  })
  it(`SSR to markup for hydration doesn't throw`, () => {
    expect(
      renderToString(
        <ThemeProvider theme={theme}>
          <Log />
        </ThemeProvider>,
      ),
    ).toMatchInlineSnapshot(`"mediaIndex: <!-- -->0"`)
  })
})
