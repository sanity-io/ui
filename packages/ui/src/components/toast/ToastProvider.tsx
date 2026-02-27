import type {ResponsiveProp} from '@sanity/ui/css'
import {useMounted} from '@sanity/ui/hooks'
import {LayerProvider} from '@sanity/ui/primitives/layer'
import {AnimatePresence} from 'motion/react'
import {startTransition, useMemo, useRef, useState} from 'react'

import {Toast} from './Toast'
import {ToastContext} from './ToastContext'
import {ToastLayer, type ToastLayerProps} from './ToastLayer'
import {generateToastId} from './toastState'
import type {ToastContextValue, ToastParams} from './types'

type ToastState = {
  dismiss: () => void
  id: string
  params: ToastParams
}[]

/**
 * Props for the {@link ToastProvider} component.
 *
 * @remarks
 * Extends {@link ToastLayerProps} (with `children` omitted) to provide
 * layout and spacing configuration for the toast container.
 *
 * @public
 */
export interface ToastProviderProps extends Omit<ToastLayerProps, 'children'> {
  /**
   * The application content to wrap with the toast context.
   */
  children?: React.ReactNode

  /**
   * Controls the z-index offset of the toast layer relative to its parent layer.
   * Supports responsive values.
   */
  zOffset?: ResponsiveProp<number>
}

/**
 * The `ToastProvider` component establishes a context for displaying toast
 * notifications and renders the toast container layer.
 *
 * @remarks
 * Wrap your application with `ToastProvider` to enable the {@link useToast}
 * hook. Toasts are managed via the `push` method on the context value,
 * which supports configurable duration, status, and dismissal behavior.
 *
 * @public
 */
export function ToastProvider(props: ToastProviderProps): React.JSX.Element {
  const {children, padding, paddingX, paddingY, gap, zOffset = 1} = props
  const [state, setState] = useState<ToastState>([])
  const mounted = useMounted()

  const timeoutIdsRef = useRef<Record<string, NodeJS.Timeout | undefined>>({})

  const value: ToastContextValue = useMemo(() => {
    const push = (params: ToastParams) => {
      const id = params.id ?? generateToastId()
      const duration = params.duration ?? 5000

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
            <AnimatePresence initial={false} mode="popLayout">
              {state.map(({dismiss, id, params}) => (
                <Toast
                  key={id}
                  closable={params.closable}
                  description={params.description}
                  duration={params.duration}
                  status={params.status}
                  title={params.title}
                  onClose={dismiss}
                />
              ))}
            </AnimatePresence>
          </ToastLayer>
        </LayerProvider>
      )}
    </ToastContext>
  )
}
