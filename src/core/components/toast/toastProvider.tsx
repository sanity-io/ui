import {AnimatePresence} from 'framer-motion'
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
          const dismiss = () => {
            startTransition(() => {
              setState((prevState): ToastState => {
                const idx = prevState.findIndex((t) => t.id === id)

                if (idx > -1) {
                  const toasts = prevState.slice(0)

                  toasts.splice(idx, 1)

                  return toasts
                }

                return prevState
              })
            })
          }

          // BC legacy support
          if (duration === 0.01) {
            return prevState.filter((t) => t.id !== id)
          }

          return prevState
            .filter((t) => t.id !== id)
            .concat([
              {
                dismiss,
                id,
                updatedAt: Date.now(),
                params: {...params, duration},
              },
            ])
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
