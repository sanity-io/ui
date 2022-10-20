import {useCallback} from 'react'
import {useWorkshop} from './useWorkshop'

/** @public */
export function useAction(name: string): (...args: unknown[]) => void {
  const {scope, story} = useWorkshop()

  return useCallback(
    (...args: unknown[]) => {
      if (!scope || !story) return

      // eslint-disable-next-line no-console
      console.log(`[${scope.name}/${story.name}]`, name, ...args)
    },
    [scope, story, name]
  )
}
