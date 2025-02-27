import {AnimatePresence, motion, type Variants} from 'framer-motion'
import {useMemo, useRef, useState, startTransition, useEffect} from 'react'
import {styled} from 'styled-components'
import {POPOVER_MOTION_CONTENT_OPACITY_PROPERTY} from '../../constants'
import {useMounted} from '../../hooks/useMounted'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Box} from '../../primitives'
import {Layer} from '../../utils'
import {Toast} from './toast'
import {ToastContext} from './toastContext'
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
export interface ToastProviderProps {
  children?: React.ReactNode
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  zOffset?: number | number[]
}

const StyledToastProvider = styled(Layer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const ToastContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: 0;
  max-width: 420px;
  width: 100%;
`

/**
 * @public
 */
export function ToastProvider(props: ToastProviderProps): React.JSX.Element {
  const {children, padding = 4, paddingX, paddingY, zOffset} = props
  const [state, _setState] = useState<ToastState>([])
  const toastsRef = useRef<{[key: string]: {timeoutId: NodeJS.Timeout}}>({})
  const mounted = useMounted()
  const prefersReducedMotion = usePrefersReducedMotion()
  const variants = useMemo<Variants>(
    () => ({
      /**
       * These variants makes use of special timing, by using a negative opacity as a starting position,
       * as well as double opacity as the end position.
       * The purpose of this is to make the tooltip/popover container appear before the content, and when exiting
       * we want the content to disappear faster than the container.
       */
      initial: {
        opacity: 0,
        [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY]: -1,
        y: 32,
        scale: 0.25,
        willChange: 'transform',
      },
      animate: {
        opacity: 2,
        [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY]: 1,
        y: 0,
        scale: 1,
      },
      exit: {
        opacity: 0,
        [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY]: -1,
        scale: 0.5,
      },
      transition: {duration: prefersReducedMotion ? 0 : 0.2},
    }),
    [prefersReducedMotion],
  )

  const value: ToastContextValue = useMemo(() => {
    const push = (params: ToastParams) => {
      // Wrap setState in startTransition to allow React to give input state updates higher priority
      const setState: typeof _setState = (state) => startTransition(() => _setState(state))

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
  useEffect(
    () => () => {
      for (const {timeoutId} of Object.values(toastsRef.current)) {
        clearTimeout(timeoutId)
      }

      toastsRef.current = {}
    },
    [],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted && (
        <StyledToastProvider data-ui="ToastProvider" zOffset={zOffset}>
          <ToastContainer>
            <Box padding={padding} paddingX={paddingX} paddingY={paddingY}>
              <AnimatePresence initial={false}>
                {state.map(({dismiss, id, params}) => (
                  <motion.div
                    key={id}
                    layout="position"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={
                      prefersReducedMotion
                        ? {duration: 0}
                        : {type: 'spring', damping: 30, stiffness: 400}
                    }
                  >
                    <Toast
                      closable={params.closable}
                      description={params.description}
                      onClose={dismiss}
                      status={params.status}
                      title={params.title}
                      duration={params.duration}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          </ToastContainer>
        </StyledToastProvider>
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
