import {ContainerWidth} from '@sanity/ui/theme'

import {DEFAULT_POPOVER_PADDING} from './constants'

export function calcCurrentWidth(params: {
  mediaIndex: number
  container: number[]
  width: (ContainerWidth | 'fill' | null | undefined)[]
}): number | undefined {
  const {container, mediaIndex, width} = params

  const w = width[mediaIndex]
  const currentWidth = w === undefined ? width[width.length - 1] : w

  return typeof currentWidth === 'number' ? container[currentWidth] : undefined
}

export function calcMaxWidth(params: {
  boundaryWidth: number | undefined
  currentWidth: number | undefined
}): number | undefined {
  const {boundaryWidth, currentWidth} = params

  if (currentWidth === undefined && boundaryWidth === undefined) {
    return undefined
  }

  return Math.min(
    currentWidth ?? Infinity,
    (boundaryWidth || Infinity) - DEFAULT_POPOVER_PADDING * 2,
  )
}
