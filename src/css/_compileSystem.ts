import {_compileStyle} from './_compileStyle'
import {_systemStyle} from './_system.style'

/** @internal */
export function _compileSystem(): string {
  return _compileStyle(_systemStyle)
}
