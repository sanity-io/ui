import {rules} from '../rules'
import {compileRules} from './compileRules'

/** @public */
export function compileSystem(): string {
  return compileRules(rules)
}
