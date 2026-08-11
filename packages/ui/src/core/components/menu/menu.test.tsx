/** @vitest-environment jsdom */

import React, {act, Activity, useCallback, useMemo} from 'react'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Menu} from './menu'
import {MenuContext, MenuContextValue} from './menuContext'
import {useMenu} from './useMenu'

describe('components/menu', () => {
  it('preserves element registration across Activity hide and reveal', async () => {
    const unregisterElement = vi.fn()
    const registerElement = vi.fn(() => unregisterElement)
    const renderMenu = (mode: 'hidden' | 'visible') => (
      <Activity mode={mode}>
        <Menu registerElement={registerElement}>Item</Menu>
      </Activity>
    )
    const {rerender, unmount} = render(renderMenu('visible'))

    expect(registerElement).toHaveBeenCalledOnce()

    rerender(renderMenu('hidden'))
    await act(async () => undefined)

    expect(unregisterElement).not.toHaveBeenCalled()

    rerender(renderMenu('visible'))
    expect(registerElement).toHaveBeenCalledOnce()

    unmount()
    await act(async () => undefined)

    expect(unregisterElement).toHaveBeenCalledOnce()
  })

  describe('useMenu', () => {
    it('should get context value', async () => {
      const log = vi.fn()

      function Debug() {
        const rootMenu = useMenu()

        log(rootMenu)

        return <>debug</>
      }

      function Root() {
        const handleItemMouseEnter = useCallback(
          // oxlint-disable-next-line no-console
          (event: React.MouseEvent<HTMLElement>) => console.log(event),
          [],
        )

        const handleItemMouseLeave = useCallback(
          // oxlint-disable-next-line no-console
          (event: React.MouseEvent<HTMLElement>) => console.log(event),
          [],
        )

        const value = useMemo(
          () =>
            ({
              version: 2,
              activeElement: null,
              // oxlint-disable-next-line no-console
              mount: (element: HTMLElement | null) => () => console.log(element),
              onItemClick: () => undefined,
              onItemMouseEnter: handleItemMouseEnter,
              onItemMouseLeave: handleItemMouseLeave,
            }) satisfies MenuContextValue,
          [handleItemMouseEnter, handleItemMouseLeave],
        )

        return (
          <MenuContext.Provider value={value}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      const contextValue = log.mock.calls[0][0]

      expect(contextValue.version).toBe(2)
      expect(typeof contextValue.mount).toBe('function')
      expect(typeof contextValue.onItemClick).toBe('function')
      expect(typeof contextValue.onItemMouseEnter).toBe('function')
      expect(typeof contextValue.onItemMouseEnter).toBe('function')
    })

    it('should fail when no context value is provided', async () => {
      const log = vi.fn()

      function Debug() {
        try {
          // oxlint-disable-next-line react-compiler
          useMenu()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value: any = undefined

        return (
          <MenuContext.Provider value={value}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useMenu(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = vi.fn()

      function Debug() {
        try {
          // oxlint-disable-next-line react-compiler
          useMenu()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future
        const value: any = () => {
          return {version: 1}
        }

        return (
          // oxlint-disable-next-line jsx-no-constructed-context-values
          <MenuContext.Provider value={value}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useMenu(): the context value is not compatible')
    })
  })
})
