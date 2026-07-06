import {useEffect} from 'react'
import {useEffectEvent} from 'use-effect-event'

/**
 * @beta
 */
export function useGlobalKeyDown(onKeyDown: (event: KeyboardEvent) => void): void {
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => onKeyDown(event))

  useEffect(() => {
    const handler = (event: KeyboardEvent) => handleKeyDown(event)

    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [])
}
