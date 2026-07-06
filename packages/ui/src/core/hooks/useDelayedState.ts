import {SetStateAction, useCallback, useRef, useState} from 'react'

/**
 * @beta
 */
export function useDelayedState<S>(
  initialState: S | (() => S),
): [S, (nextState: SetStateAction<S>, delay?: number) => void] {
  const [state, setState] = useState(initialState)
  const delayedAction = useRef<NodeJS.Timeout | undefined>(undefined)

  const onStateChange = useCallback((nextState: SetStateAction<S>, delay?: number) => {
    const action = () => {
      setState(nextState)
    }

    // A new state change has been initiated, cancel the previous one.
    if (delayedAction.current) {
      clearTimeout(delayedAction.current)
      delayedAction.current = undefined
    }

    if (!delay) return action()
    delayedAction.current = setTimeout(action, delay)
  }, [])

  return [state, onStateChange]
}
