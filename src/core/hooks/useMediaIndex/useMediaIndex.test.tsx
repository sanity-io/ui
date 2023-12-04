/** @jest-environment node */
import {defaultTheme} from '@sanity/ui/theme'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import {ThemeProvider} from '../../theme'
import {useMediaIndex} from './useMediaIndex'

function Log() {
  const mediaIndex = useMediaIndex()

  return <>mediaIndex: {JSON.stringify(mediaIndex)}</>
}

describe('useMediaIndex', () => {
  it(`SSR to static markup returns 0`, () => {
    expect(
      renderToStaticMarkup(
        <ThemeProvider theme={defaultTheme}>
          <Log />
        </ThemeProvider>,
      ),
    ).toBe('mediaIndex: 0')
  })
  it(`SSR to markup for hydration doesn't throw`, () => {
    expect(
      renderToString(
        <ThemeProvider theme={defaultTheme}>
          <Log />
        </ThemeProvider>,
      ),
    ).toMatchInlineSnapshot(`"mediaIndex: <!-- -->0"`)
  })
})
