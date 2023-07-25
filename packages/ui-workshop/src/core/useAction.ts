import {useCallback} from 'react'
import {useWorkshop} from './useWorkshop'

/** @public */
export function useAction(
  name: string,
  options?: {preventDefault?: boolean},
): (...args: unknown[]) => void {
  const {preventDefault = false} = options || {}
  const {scope, story} = useWorkshop()

  return useCallback(
    (...args: unknown[]) => {
      if (!scope || !story) return

      const ev: any = args[0]

      if (preventDefault && 'preventDefault' in ev && typeof ev.preventDefault === 'function') {
        ev.preventDefault()
      }

      // eslint-disable-next-line no-console
      console.log(`[${scope.name}/${story.name}]`, name, ...args)
    },
    [preventDefault, scope, story, name],
  )
}
