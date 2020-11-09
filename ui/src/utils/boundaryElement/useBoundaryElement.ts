import {useContext} from 'react'
import {BoundaryElementContext} from './boundaryElementContext'

export function useBoundaryElement(): HTMLElement | null {
  return useContext(BoundaryElementContext)
}
