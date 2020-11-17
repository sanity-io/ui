import {AnimatePresence, motion} from 'framer-motion'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Box, Container} from '../../atoms'
import {Layer} from '../../utils'
import {Toast} from './toast'
import {ToastContext} from './toastContext'
import {ToastParams} from './types'

interface ToastState {
  toasts: {
    dismiss: () => void
    id: string
    params: ToastParams
  }[]
}

const Root = styled(Layer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const ToastContainer = styled(Container)`
  pointer-events: all;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: 0;
`

let toastId = 0

export function ToastProvider({children}: {children?: React.ReactNode}) {
  const [state, setState] = useState<ToastState>({toasts: []})
  const toastsRef = useRef<{[key: string]: {timeoutId: number}}>({})

  const push = useCallback((params: ToastParams) => {
    const id = String(toastId++)
    const duration = params.duration || 5000

    const dismiss = () => {
      const timeoutId = toastsRef.current[id]?.timeoutId

      setState((prevState) => {
        const idx = prevState.toasts.findIndex((t) => t.id === id)

        if (idx > -1) {
          const toasts = prevState.toasts.slice(0)

          toasts.splice(idx, 1)

          return {...prevState, toasts}
        }

        return prevState
      })

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
        delete toastsRef.current[id]
      }
    }

    setState((prevState) => ({
      ...prevState,
      toasts: prevState.toasts.concat([
        {
          dismiss,
          id,
          params: {
            ...params,
            duration,
          },
        },
      ]),
    }))

    toastsRef.current[id] = {timeoutId: setTimeout(dismiss, duration)}
  }, [])

  // clear timeouts on unmount
  useEffect(
    () => () => {
      for (const {timeoutId} of Object.values(toastsRef.current)) {
        clearTimeout(timeoutId)
      }

      toastsRef.current = {}
    },
    []
  )

  return (
    <ToastContext.Provider value={{push}}>
      {children}

      <Root>
        <ToastContainer width={1}>
          <Box padding={4}>
            <AnimatePresence initial={false}>
              {state.toasts.map(({dismiss, id, params}) => (
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
    </ToastContext.Provider>
  )
}
