/** @jest-environment jsdom */

import {fireEvent, waitFor, screen} from '@testing-library/react'
import {startTransition, useCallback, useEffect, useMemo, useState} from 'react'
import {render} from '../../../test'
import {PopoverContext} from './popoverContext'
import {PopoverContextValue} from './types'
import {useOnForcedUpdate} from './useOnForcedUpdate'
import {usePopover} from './usePopover'

describe('components/toast', () => {
  describe('usePopover', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const popover = usePopover()

        log(popover)

        return <>debug</>
      }

      function Root() {
        const value: PopoverContextValue = {
          version: 0.0,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          forceUpdate: () => {},
          lastUpdateId: null,
        }

        return (
          <PopoverContext.Provider value={value}>
            <Debug />
          </PopoverContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          usePopover()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          <PopoverContext.Provider value={value as any}>
            <Debug />
          </PopoverContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('usePopover(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          usePopover()
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
          <PopoverContext.Provider value={value as any}>
            <Debug />
          </PopoverContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'usePopover(): the context value is not compatible'
      )
    })

    it('should trigger hook when forceUpdate is called', async () => {
      const log = jest.fn()
      const forcedCallback = jest.fn()

      function Popover() {
        useOnForcedUpdate(forcedCallback)

        return null
      }

      function Debug() {
        const popover = usePopover()

        useEffect(() => {
          log(popover)
        }, [popover])

        const update = useCallback(() => {
          popover.forceUpdate()
        }, [popover])

        return <button onClick={update}>Force position update</button>
      }

      function Root() {
        const [lastUpdateId, setLastUpdateId] = useState<string | null>(null)
        const forceUpdate = useCallback(() => {
          startTransition(() => {
            setLastUpdateId('newid')
          })
        }, [])
        const value: PopoverContextValue = useMemo(() => {
          return {
            version: 0.0,
            forceUpdate,
            lastUpdateId,
          }
        }, [forceUpdate, lastUpdateId])

        return (
          <PopoverContext.Provider value={value}>
            <Debug />
            <Popover />
          </PopoverContext.Provider>
        )
      }

      render(<Root />)

      fireEvent.click(screen.getByText('Force position update'))

      await waitFor(() => {
        expect(log).toHaveBeenCalledTimes(3)
        expect(log.mock.calls[0][0].lastUpdateId).toBeNull()
        expect(log.mock.calls[2][0].lastUpdateId).not.toBeNull()
        expect(forcedCallback).toHaveBeenCalledTimes(1)
      })
    })
  })
})
