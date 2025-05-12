// import {rules} from '../rules'
import {systemStyle} from '../system.style'
import {compileStyle} from './compileStyle'
// import {compileRules} from './compileRules'

/** @public */
export function compileSystem(): string {
  // return compileRules(rules)
  return compileStyle(systemStyle)
}
