import {lazy, startTransition, Suspense, useMemo, useState} from 'react'

import {useMounted} from '../../hooks/useMounted'
import {LayerProvider} from '../../utils'
import {ToastContext} from './toastContext'
import {ToastLayer, type ToastLayerProps} from './toastLayer'
import type {ToastState} from './toastList'
import {generateToastId} from './toastState'
import {ToastContextValue, ToastParams} from './types'

const ToastList = lazy(() =>
  import('./toastList').then((toastListModule) => ({default: toastListModule.ToastList})),
)

/**
 * @public
 */
export interface ToastProviderProps extends Omit<ToastLayerProps, 'children'> {
  children?: React.ReactNode
  zOffset?: number | number[]
}

/**
 * @public
 */
export function ToastProvider(props: ToastProviderProps): React.JSX.Element {
  const {children, padding, paddingX, paddingY, gap, zOffset = 1} = props
  const [state, setState] = useState<ToastState>([])
  // Latches to `true` on the first push, and deliberately never resets, so that the lazily
  // loaded toast list stays mounted and can run exit animations for the last dismissed toast.
  const [hasPushed, setHasPushed] = useState(false)
  const mounted = useMounted()

  const value: ToastContextValue = useMemo(() => {
    const push = (params: ToastParams) => {
      const id = params.id || generateToastId()
      const duration = params.duration || 5000

      /**
       * Backwards compatibility for `sanity` patterns workaround a lack of programatically dismissible toasts.
       * It uses a super short duration that closes the toast immediately in previous versions of `@sanity/ui`.
       * We interpret this as a request to dismiss the toast immediately, and remove it from the state right away.
       * Even once we support programatic dismissal we'll need to keep this for backwards compatibility with v2 and v1.
       */
      const isImmediateDismiss = duration === 0.01

      if (isImmediateDismiss) {
        startTransition(() => {
          setState((prevState) => prevState.filter((toast) => toast.id !== id))
        })

        return id
      }

      // Latch only when a toast is genuinely added, so a programmatic dismiss does not
      // eagerly mount the lazy motion-bearing toast list and defeat the deferred-load goal.
      setHasPushed(true)

      startTransition(() => {
        setState((prevState): ToastState => {
          /**
           * Creates a function to dismiss this specific toast.
           * This function will be passed to the Toast component
           * and called either on close button click or after duration.
           */
          const dismiss = () =>
            startTransition(() =>
              setState((currentState) => currentState.filter((toast) => toast.id !== id)),
            )

          /**
           * Create updated state by:
           * 1. Removing any existing toast with the same ID (prevents duplicates)
           * 2. Adding the new toast with its dismiss handler
           * 3. Updates the `updatedAt` timestamp, which resets progress bar count downs.
           */
          return [
            ...prevState.filter((toast) => toast.id !== id),
            {
              dismiss,
              id,
              updatedAt: Date.now(),
              params: {...params, duration},
            },
          ]
        })
      })

      return id
    }

    return {version: 0.0, push}
  }, [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted && (
        <LayerProvider zOffset={zOffset}>
          <ToastLayer padding={padding} paddingX={paddingX} paddingY={paddingY} gap={gap}>
            {hasPushed && (
              <Suspense fallback={null}>
                <ToastList toasts={state} />
              </Suspense>
            )}
          </ToastLayer>
        </LayerProvider>
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
