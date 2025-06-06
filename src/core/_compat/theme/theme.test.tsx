import {buildTheme} from '@sanity/ui/theme'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {ThemeContext} from './themeContext'
import type {ThemeContextValue} from './types'
import {useRootTheme} from './useRootTheme'

describe('theme', () => {
  describe('useRootTheme', () => {
    it('should get context value', async () => {
      const log = vi.fn()

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
      const log = vi.fn()

      function Debug() {
        try {
          useRootTheme()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        return (
          <ThemeContext.Provider
            // @ts-expect-error - we want to test the error case
            value={undefined}
          >
            <Debug />
          </ThemeContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useRootTheme(): missing context value')
    })
  })
})
