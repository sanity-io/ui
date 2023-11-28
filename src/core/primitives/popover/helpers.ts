import {Theme} from '@sanity/ui/theme'
import {DEFAULT_POPOVER_PADDING} from './constants'
import {PopoverWidth} from './types'

export function calcCurrentWidth(params: {
  mediaIndex: number
  theme: Theme
  width: PopoverWidth[]
}): number | undefined {
  const {mediaIndex, theme, width} = params

  const w = width[mediaIndex]
  const currentWidth: PopoverWidth | undefined = w === undefined ? width[width.length - 1] : w

  return typeof currentWidth === 'number' ? theme.sanity.container[currentWidth] : undefined
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
