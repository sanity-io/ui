/** @jest-environment jsdom */

import '../../../../test/mocks/resizeObserver.mock'
import '../../../../test/mocks/matchMedia.mock'

import {fireEvent, screen} from '@testing-library/react'

import {render} from '../../../../test'
import {ToastContext} from './toastContext'
import {ToastProvider} from './toastProvider'
import {ToastContextValue} from './types'
import {useToast} from './useToast'

describe('components/toast', () => {
  describe('ToastProvider', () => {
    it('should render a pushed toast (the toast stack is lazy loaded on first push)', async () => {
      function PushButton() {
        const {push} = useToast()

        return (
          <button onClick={() => push({title: 'Toast title', status: 'info'})} type="button">
            push
          </button>
        )
      }

      render(
        <ToastProvider>
          <PushButton />
        </ToastProvider>,
      )

      // Validate no toast is rendered before pushing
      expect(screen.queryByText('Toast title')).not.toBeInTheDocument()

      fireEvent.click(screen.getByText('push'))

      // Validate the pushed toast is rendered
      await screen.findByText('Toast title')
    })
  })

  describe('useToast', () => {
    it('should get context value', async () => {
      const log = jest.fn()

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
          <ToastContext.Provider value={value}>
            <Debug />
          </ToastContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(typeof log.mock.calls[0][0].push).toBe('function')
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useToast()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          <ToastContext.Provider value={value as any}>
            <Debug />
          </ToastContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useToast(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

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
        const value = () => {
          return {version: 1}
        }

        return (
          <ToastContext.Provider value={value as any}>
            <Debug />
          </ToastContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useToast(): the context value is not compatible',
      )
    })
  })
})
