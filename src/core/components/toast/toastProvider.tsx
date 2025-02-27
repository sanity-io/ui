import {AnimatePresence, motion, type Variants} from 'framer-motion'
import {useMemo, useRef, useState, startTransition, useEffect} from 'react'
import {styled} from 'styled-components'
import {useMounted} from '../../hooks/useMounted'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Box, Grid} from '../../primitives'
import {Layer, LayerProvider} from '../../utils'
import {Toast} from './toast'
import {ToastContext} from './toastContext'
import {ToastLayer, type ToastLayerProps} from './toastLayer'
import {generateToastId} from './toastState'
import {ToastContextValue, ToastParams} from './types'

type ToastState = {
  dismiss: () => void
  id: string
  params: ToastParams
}[]

/**
 * @public
 */
export interface ToastProviderProps extends Omit<ToastLayerProps, 'children'> {
  children?: React.ReactNode
  zOffset?: number | number[]
}

const ToastItem = motion.create(Box)

const ToastsLayout = styled(Layer)``

ToastsLayout.displayName = 'ToastsLayout'

const variants = {
  initial: {
    opacity: 0,
    y: 32,
    scale: 0.25,
    // willChange: 'transform',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    // y: 0
    transition: {duration: 0.2},
  },
} satisfies Variants

/**
 * @public
 */
export function ToastProvider(props: ToastProviderProps): React.JSX.Element {
  const {children, padding, paddingX, paddingY, gap, zOffset} = props
  const [stateIS_IT_SAFE, setState] = useState<ToastState>([])
  const toastsRef = useRef<{[key: string]: {timeoutId: NodeJS.Timeout}}>({})
  const mounted = useMounted()
  const prefersReducedMotion = usePrefersReducedMotion()

  const value: ToastContextValue = useMemo(() => {
    const push = (params: ToastParams) => {
      // Wrap setState in startTransition to allow React to give input state updates higher priority
      // const setState: typeof _setState = (state) => startTransition(() => _setState(state))

      const id = params.id || generateToastId()
      const duration = params.duration || 5000

      const dismiss = () => {
        const timeoutId = toastsRef.current[id]?.timeoutId

        setState((prevState): ToastState => {
          const idx = prevState.findIndex((t) => t.id === id)

          if (idx > -1) {
            const toasts = prevState.slice(0)

            toasts.splice(idx, 1)

            return toasts
          }

          return prevState
        })

        if (timeoutId !== undefined) {
          clearTimeout(timeoutId)
          delete toastsRef.current[id]
        }
      }

      setState((prevState): ToastState => {
        return prevState
          .filter((t) => t.id !== id)
          .concat([
            {
              dismiss,
              id,
              params: {...params, duration},
            },
          ])
      })

      if (toastsRef.current[id]) {
        clearTimeout(toastsRef.current[id].timeoutId)
        delete toastsRef.current[id]
      }

      toastsRef.current[id] = {timeoutId: setTimeout(dismiss, duration)}

      return id
    }

    return {version: 0.0, push}
  }, [])

  // clear timeouts on unmount
  // @TODO move cleanup to child toasts instead of centrally managing them
  useEffect(
    () => () => {
      for (const {timeoutId} of Object.values(toastsRef.current)) {
        clearTimeout(timeoutId)
      }

      toastsRef.current = {}
    },
    [],
  )
  const transition = prefersReducedMotion
    ? {duration: 0}
    : {type: 'spring', damping: 30, stiffness: 400}
  const transitionDebug = {duration: 1}

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted && (
        <LayerProvider zOffset={zOffset}>
          <ToastLayer padding={padding} paddingX={paddingX} paddingY={paddingY} gap={gap}>
            <AnimatePresence initial={false} mode="popLayout">
              {stateIS_IT_SAFE.map(({dismiss, id, params}) => (
                <ToastItem
                  key={id}
                  as="li"
                  layout
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  // transition={transitionDebug}
                  // paddingTop={3}
                >
                  <Toast
                    closable={params.closable}
                    description={params.description}
                    onClose={dismiss}
                    status={params.status}
                    title={params.title}
                    duration={params.duration}
                  />
                </ToastItem>
              ))}
            </AnimatePresence>
          </ToastLayer>
          {/* <ToastsLayout data-ui="ToastProvider">
        <ToastsFixedCanvas data-ui="ToastProvider" layoutRoot zOffset={zOffset}>
          <ToastsAbsoluteLayer as="ul" gapY={3} padding={padding} paddingX={paddingX} paddingY={paddingY}>
              <AnimatePresence initial={false} mode="popLayout">
                {stateIS_IT_SAFE.map(({dismiss, id, params}) => (
                  <ToastItem
                    key={id}
                    as="li"
                    layout
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit='exit'
                    // transition={transition}
                    transition={transitionDebug}
                    // paddingTop={3}
                  >
                    <Toast
                      closable={params.closable}
                      description={params.description}
                      onClose={dismiss}
                      status={params.status}
                      title={params.title}
                      duration={params.duration}
                    />
                  </ToastItem>
                ))}
              </AnimatePresence>
          </ToastsAbsoluteLayer>
        </ToastsFixedCanvas>
        </ToastsLayout> */}
        </LayerProvider>
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
