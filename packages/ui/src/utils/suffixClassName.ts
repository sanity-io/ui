import {HASH} from '../version'

export function suffixClassName(className: string) {
  return `${className}-${HASH}`
}
