import {AnimatePresence, motion} from 'framer-motion'
import {useCallback, useEffect, useMemo, useRef, useState, startTransition} from 'react'
import styled from 'styled-components'
import {useMounted} from '../../hooks/useMounted'
import {Box} from '../../primitives'
import {Layer} from '../../utils'
import {Toast} from './toast'
import {ToastContext} from './toastContext'
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

const Root = styled(Layer)`
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

let toastId = 0

/**
 * @public
 */
export function ToastProvider(props: ToastProviderProps): React.ReactElement {
  const {children, padding = 4, paddingX, paddingY, zOffset} = props
  const [state, _setState] = useState<ToastState>([])

  const toastsRef = useRef<{[key: string]: {timeoutId: NodeJS.Timeout}}>({})

  const push = useCallback((params: ToastParams) => {
    // Wrap setState in startTransition to allow React to give input state updates higher priority
    const setState: typeof _setState = (state) => startTransition(() => _setState(state))

    const id = params.id || String(toastId++)
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

  const value: ToastContextValue = useMemo(() => ({version: 0.0, push}), [push])
  const mounted = useMounted()

  return (
    <ToastContext.Provider value={value}>
      {children}

      {mounted && (
        <Root data-ui="ToastProvider" zOffset={zOffset}>
          <ToastContainer>
            <Box padding={padding} paddingX={paddingX} paddingY={paddingY}>
              <AnimatePresence initial={false}>
                {state.map(({dismiss, id, params}) => (
                  <motion.div
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, scale: 0.5, transition: {duration: 0.2}}}
                    initial={{opacity: 0, y: 32, scale: 0.25}}
                    key={id}
                    layout="position"
                    transition={{type: 'spring', damping: 30, stiffness: 400}}
                  >
                    <Toast
                      closable={params.closable}
                      description={params.description}
                      onClose={dismiss}
                      status={params.status}
                      title={params.title}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          </ToastContainer>
        </Root>
      )}
    </ToastContext.Provider>
  )
}
