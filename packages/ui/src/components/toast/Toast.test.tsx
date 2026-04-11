import {describe, expect, it, vi} from 'vitest'

import {render} from '$test/utils'

import {ToastContext} from './ToastContext'
import type {ToastContextValue} from './types'
import {useToast} from './useToast'

describe('components/toast', () => {
  describe('useToast', () => {
    it('should get context value', async () => {
      const log = vi.fn()

      function Debug() {
        const rootToast = useToast()

        log(rootToast)

        return <>debug</>
      }

      function Root() {
        const value: ToastContextValue = {
          version: 0.0,
          push: () => '',
        }

        return (
          <ToastContext value={value}>
            <Debug />
          </ToastContext>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(typeof log.mock.calls[0][0].push).toBe('function')
    })

    it('should fail when no context value is provided', async () => {
      const log = vi.fn()

      function Debug() {
        try {
          useToast()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        return (
          <ToastContext
            // @ts-expect-error - we want to test the error case
            value={undefined}
          >
            <Debug />
          </ToastContext>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useToast(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = vi.fn()

      function Debug() {
        try {
          useToast()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future

        return (
          <ToastContext
            // @ts-expect-error - we want to test the error case
            value={() => ({version: 1})}
          >
            <Debug />
          </ToastContext>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useToast(): the context value is not compatible',
      )
    })
  })
})
