import {DEFAULT_POPOVER_PADDING} from './constants'
import {PopoverWidth} from './types'

export function calcCurrentWidth(params: {
  mediaIndex: number
  container: number[]
  width: PopoverWidth[]
}): number | undefined {
  const {container, mediaIndex, width} = params

  const w = width[mediaIndex]
  const currentWidth: PopoverWidth | undefined = w === undefined ? width[width.length - 1] : w

  return typeof currentWidth === 'number' ? container[currentWidth] : undefined
}

/**
 * The width cap from the resolved `width` property and the boundary width, or `undefined` when
 * neither caps the popover — also for a boundary without a width (collapsed or `display: none`
 * while the popover is open), which must not become a `max-width` of `Infinity`
 */
export function calcMaxWidth(params: {
  boundaryWidth: number | undefined
  currentWidth: number | undefined
}): number | undefined {
  const {boundaryWidth, currentWidth} = params

  const maxWidth = Math.min(
    currentWidth ?? Infinity,
    (boundaryWidth || Infinity) - DEFAULT_POPOVER_PADDING * 2,
  )

  return Number.isFinite(maxWidth) ? maxWidth : undefined
}
