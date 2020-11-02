import {useContext} from 'react'
import {StudioContext} from './context'

export function useStudio() {
  const studio = useContext(StudioContext)

  if (!studio) {
    throw new Error('Studio: missing context value')
  }

  return studio
}

export function useCommands() {
  return useStudio().commands
}
