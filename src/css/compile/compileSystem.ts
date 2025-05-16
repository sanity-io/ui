import {systemStyle} from '../system.style'
import {compileStyle} from './compileStyle'

/** @public */
export function compileSystem(): string {
  return compileStyle(systemStyle)
}
