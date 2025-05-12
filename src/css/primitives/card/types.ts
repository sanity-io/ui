import {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'

import {ShadowStyleProps} from '../../aspects'
import {BoxStyleProps} from '../box'

export interface CardStyleProps extends BoxStyleProps, ShadowStyleProps {
  checkered?: boolean
  selectable?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorCardToneKey | 'inherit'
}
