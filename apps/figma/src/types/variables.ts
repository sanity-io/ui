import type {SanityFigmaColor, SanityFigmaColorAlias} from './color'
import type {SanityFigmaNumber, SanityFigmaNumberAlias} from './number'
import type {SanityFigmaString, SanityFigmaStringAlias} from './string'

export interface SanityFigmaVar {
  name: string
  scopes: VariableScope[]
  value:
    | SanityFigmaColor
    | SanityFigmaColorAlias
    | SanityFigmaNumber
    | SanityFigmaNumberAlias
    | SanityFigmaString
    | SanityFigmaStringAlias
}

export interface Alias {
  variable: Variable
  modeId: string
  target: string
}
