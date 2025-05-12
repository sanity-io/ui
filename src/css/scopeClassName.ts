import {PREFIX} from './constants'

export function scopeClassName(className: string | undefined) {
  if (className === undefined) return undefined
  return `${PREFIX}${className.trim()}`
}
