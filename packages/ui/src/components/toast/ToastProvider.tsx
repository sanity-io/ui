import type {ResponsiveProp} from '@sanity/ui-css'
import {lazy, startTransition, Suspense, useMemo, useRef, useState} from 'react'

import {useMounted} from '../../hooks/useMounted'
import {LayerProvider} from '../../primitives/layer/LayerProvider'
import {ToastContext} from './ToastContext'
import {ToastLayer, type ToastLayerProps} from './ToastLayer'
import type {ToastState} from './ToastList'
import {generateToastId} from './toastState'
import type {ToastContextValue, ToastParams} from './types'

const ToastList = lazy(() =>
  import('./ToastList').then((toastListModule) => ({default: toastListModule.ToastList})),
)

/** @public */
export interface ToastProviderProps extends Omit<ToastLayerProps, 'children'> {
  children?: React.ReactNode
  zOffset?: ResponsiveProp<number>
}

/** @public */
export function ToastProvider(props: ToastProviderProps): React.JSX.Element {
  const {children, padding, paddingX, paddingY, gap, zOffset = 1} = props
  const [state, setState] = useState<ToastState>([])
  // Latches to `true` on the first push, and deliberately never resets, so that the lazily loaded
  // toast list stays mounted and can run exit animations for the last dismissed toast.
  const [hasPushed, setHasPushed] = useState(false)
  const mounted = useMounted()

  const timeoutIdsRef = useRef<Record<string, NodeJS.Timeout | undefined>>({})

  const value: ToastContextValue = useMemo(() => {
    const push = (params: ToastParams) => {
      const id = params.id ?? generateToastId()
      const duration = params.duration ?? 5000

      setHasPushed(true)

      // If the `id` is reused, clear the previous timeout
      const existingTimeoutId = timeoutIdsRef.current[id]
      if (existingTimeoutId) {
        clearTimeout(existingTimeoutId)
        timeoutIdsRef.current[id] = undefined
      }

      startTransition(() => {
        setState((prevState): ToastState => {
          /**
           * Backwards compatibility for `sanity` patterns workaround a lack of programatically dismissible toasts.
           * It uses a super short duration that closes the toast immediately in previous versions of `@sanity/ui`.
           * We interpret this as a request to dismiss the toast immediately, and remove it from the state right away.
           * Even once we support programatic dismissal we'll need to keep this for backwards compatibility with v2 and v1.
           */
          if (duration === 0.01) {
            return prevState.filter((toast) => toast.id !== id)
          }

          /**
           * Creates a function to dismiss this specific toast.
           * This function will be passed to the Toast component
           * and called either on close button click or after duration.
           */
          function dismiss() {
            startTransition(() => {
              if (timeoutId) {
                clearTimeout(timeoutId)
              }

              setState((currentState) => currentState.filter((toast) => toast.id !== id))

              // Clear the timeout id from the ref to prevent memory leaks
              timeoutIdsRef.current[id] = undefined
            })
          }

          const timeoutId = duration === Infinity ? undefined : setTimeout(dismiss, duration)

          // Set the timeout id in the ref
          timeoutIdsRef.current[id] = timeoutId

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
    <ToastContext value={value}>
      {children}
      {mounted && (
        <LayerProvider zOffset={zOffset}>
          <ToastLayer gap={gap} padding={padding} paddingX={paddingX} paddingY={paddingY}>
            {hasPushed && (
              <Suspense fallback={null}>
                <ToastList toasts={state} />
              </Suspense>
            )}
          </ToastLayer>
        </LayerProvider>
      )}
    </ToastContext>
  )
}
