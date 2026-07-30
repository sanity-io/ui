import {useEffect} from 'react'
// TODO: switch to `useEffectEvent` from `react` once
// https://github.com/facebook/react/issues/34818 is fixed in the lowest React
// version we support: on React 19.2 the native hook never sees values past
// the first render when the calling component is wrapped in `forwardRef` or
// `memo`. This public hook runs in the fiber of whatever component calls it
// (all internal callers are `forwardRef` components).
import {useEffectEvent} from 'use-effect-event'

/**
 * Adds global keydown event listener to the window.
 *
 * @param onKeyDown - The function to call when a keydown event is triggered.
 * @param options - The options to pass to the addEventListener function (example, capture: true)
 * @beta
 */
export function useGlobalKeyDown(
  onKeyDown: (event: KeyboardEvent) => void,
  options?: AddEventListenerOptions,
): void {
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => onKeyDown(event))

  useEffect(() => {
    const handler = (event: KeyboardEvent) => handleKeyDown(event)

    window.addEventListener('keydown', handler, options)

    return () => window.removeEventListener('keydown', handler, options)
  }, [options])
}
