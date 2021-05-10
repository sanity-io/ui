import {useCallback} from 'react'
import {useScope} from './useScope'

export function useAction(name: string) {
  const {scope, story} = useScope()

  return useCallback(
    (...args: any[]) => {
      if (!scope || !story) return
      console.log(`[${scope.name}/${story.name}]`, name, ...args)
    },
    [scope, story, name]
  )
}
