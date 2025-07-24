import {fill, root, stroke, strokeMask, svg} from './_arrow.css'

/** @internal */
export function _arrow(): string | undefined {
  return root
}

/** @internal */
export function _arrowSvg(): string | undefined {
  return svg
}

/** @internal */
export function _arrowStroke(): string | undefined {
  return stroke
}

/** @internal */
export function _arrowStrokeMask(): string | undefined {
  return strokeMask
}

/** @internal */
export function _arrowShape(): string | undefined {
  return fill
}
