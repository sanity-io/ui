import {RGB} from '../../types'

/** @internal */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    throw new Error('input is not valid hex')
  }

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}
