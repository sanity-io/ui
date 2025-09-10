import {useEffect} from 'react'
import {useEffectEvent} from 'use-effect-event'

/**
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
