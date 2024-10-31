import {PREFIX} from './prefix'

const p = (PREFIX as string) === '__PREFIX__' ? 's-' : PREFIX

/** @internal */
export function _scopeClassName(className: string | undefined) {
  if (className === undefined) return undefined
  return `${p}${className.trim()}`
}
