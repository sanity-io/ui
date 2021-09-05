/* eslint-disable no-console */

import React from 'react'
import {render} from '../../../test'
import {MenuContext, MenuContextValue} from './menuContext'
import {useMenu} from './useMenu'

describe('components/menu', () => {
  describe('useMenu', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootMenu = useMenu()

        log(rootMenu)

        return <>debug</>
      }

      function Root() {
        const value: MenuContextValue = {
          version: 0.0,
          activeElement: null,
          activeIndex: 0,
          mount: (element: HTMLElement | null) => () => console.log(element),
          onItemClick: () => undefined,
          onMouseEnter: (event: React.MouseEvent<HTMLElement>) => console.log(event),
          onMouseLeave: (event: React.MouseEvent<HTMLElement>) => console.log(event),
        }

        return (
          <MenuContext.Provider value={value}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].activeIndex).toBe(0)
      expect(typeof log.mock.calls[0][0].mount).toBe('function')
      expect(typeof log.mock.calls[0][0].onItemClick).toBe('function')
      expect(typeof log.mock.calls[0][0].onMouseEnter).toBe('function')
      expect(typeof log.mock.calls[0][0].onMouseLeave).toBe('function')
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useMenu()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          <MenuContext.Provider value={value as any}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useMenu(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useMenu()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future
        const value = () => {
          return {version: 1}
        }

        return (
          <MenuContext.Provider value={value as any}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useMenu(): the context value is not compatible')
    })
  })
})
