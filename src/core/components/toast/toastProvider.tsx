import {AnimatePresence} from 'motion/react'
import {startTransition, useMemo, useState} from 'react'

import {useMounted} from '../../hooks/useMounted'
import {LayerProvider} from '../../utils'
import {Toast} from './toast'
import {ToastContext} from './toastContext'
import {ToastLayer, type ToastLayerProps} from './toastLayer'
import {generateToastId} from './toastState'
import {ToastContextValue, ToastParams} from './types'

type ToastState = {
  dismiss: () => void
  id: string
  updatedAt: number
  params: ToastParams
}[]

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
  const mounted = useMounted()

  const value: ToastContextValue = useMemo(() => {
    const push = (params: ToastParams) => {
      const id = params.id || generateToastId()
      const duration = params.duration || 5000

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
            <AnimatePresence initial={false} mode="popLayout">
              {state.map(({dismiss, id, params, updatedAt}) => (
                <Toast
                  key={id}
                  closable={params.closable}
                  description={params.description}
                  onClose={dismiss}
                  status={params.status}
                  title={params.title}
                  duration={params.duration}
                  updatedAt={updatedAt}
                />
              ))}
            </AnimatePresence>
          </ToastLayer>
        </LayerProvider>
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
