import {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {ResponsiveProp} from '../../types'
import {BoxStyleProps} from '../box'

export interface CardStyleProps extends BoxStyleProps {
  checkered?: boolean
  selectable?: boolean
  scheme?: ThemeColorSchemeKey
  shadow?: ResponsiveProp<number>
  tone?: ThemeColorCardToneKey | 'inherit'
}
