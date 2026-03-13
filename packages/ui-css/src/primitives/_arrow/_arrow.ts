import {fill, root, stroke, strokeMask, svg} from './_arrow.css'

export {_arrowVars} from './_arrow.css'

/** @internal */
export function _arrow(): string | undefined {
  return root
}

/** @internal */
export function _arrow_svg(): string | undefined {
  return svg
}

/** @internal */
export function _arrow_stroke(): string | undefined {
  return stroke
}

/** @internal */
export function _arrow_strokeMask(): string | undefined {
  return strokeMask
}

/** @internal */
export function _arrow_shape(): string | undefined {
  return fill
}
