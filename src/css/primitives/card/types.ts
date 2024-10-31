import type {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'

import type {ShadowStyleProps} from '../../aspects'

/** @public */
export interface CardStyleProps extends ShadowStyleProps {
  checkered?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorCardToneKey | 'inherit'
}
