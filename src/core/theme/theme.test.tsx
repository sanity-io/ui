/** @jest-environment jsdom */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {buildTheme} from '@sanity/ui/theme'
import {render} from '../../../test'
import {ThemeContext} from './themeContext'
import {ThemeContextValue} from './types'
import {useRootTheme} from './useRootTheme'

describe('theme', () => {
  let consoleErrorSpy: any

  beforeEach(() => {
    // Silence console.error
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore console.error
    consoleErrorSpy.mockRestore()
  })

  describe('useRootTheme', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootTheme = useRootTheme()

        log(rootTheme)

        return <>debug</>
      }

      function Root() {
        const value: ThemeContextValue = {
          version: 0.0,
          scheme: 'light',
          theme: buildTheme(),
          tone: 'default',
        }

        return (
          <ThemeContext.Provider value={value}>
            <Debug />
          </ThemeContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].scheme).toBe('light')
      expect(log.mock.calls[0][0].tone).toBe('default')
    })

    it('should fail when no context value is provided', async () => {
      function Debug() {
        useRootTheme()

        return null
      }

      function Root() {
        const value = undefined

        return (
          <ThemeContext.Provider value={value as any}>
            <Debug />
          </ThemeContext.Provider>
        )
      }

      expect(() => render(<Root />)).toThrow('useRootTheme(): missing context value')
    })
  })
})
