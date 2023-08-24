import {useRef} from 'react'
import {useState, useCallback, SetStateAction} from 'react'

/**
 * @beta
 */
export function useDelayedState<S>(
  initialState: S | (() => S),
): [S, (nextState: SetStateAction<S>, delay?: number) => void] {
  const [state, setState] = useState(initialState)
  const delayedAction = useRef<NodeJS.Timeout | undefined>()

  const onStateChange = useCallback((nextState: SetStateAction<S>, delay?: number) => {
    const action = () => {
      setState((prev) => {
        if (typeof nextState === 'function') {
          const callback = nextState as (prevState: S) => S
          return callback(prev)
        }
        return nextState
      })
    }
    // A new state change has been initiated, cancel the previous one.
    if (delayedAction.current) clearTimeout(delayedAction.current)
    if (!delay) return action()
    delayedAction.current = setTimeout(action, delay)
  }, [])

  return [state, onStateChange]
}
