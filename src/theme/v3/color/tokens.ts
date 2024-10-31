import type {ThemeColorCardToneKey} from '../../v2'
import type {CardColorTokens} from './card'

/** @public */
export type ColorTokens = Record<'*' | ThemeColorCardToneKey, CardColorTokens>
