import {useEffect} from 'react'
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
