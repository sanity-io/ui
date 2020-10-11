import {useContext} from 'react'
import {LayerContext} from './context'

export function useLayer() {
  const layer = useContext(LayerContext)

  if (!layer) {
    throw new Error('Layer: missing context value')
  }

  return layer
}
