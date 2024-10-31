import {PREFIX} from './constants'

/** @public */
export function scopeClassName(className: string | undefined) {
  if (className === undefined) return undefined
  return `${PREFIX}${className.trim()}`
}
