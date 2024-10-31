import {Properties} from '../types'

export interface CompileRulesContext {
  keyframes: Record<string, Record<string, Properties>>
  media: Record<string, Record<string, Properties>>
}
