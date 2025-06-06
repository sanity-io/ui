import type {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'

import type {HeightStyleProps} from '../../props/height/types'

/** @public */
export interface RootStyleProps extends HeightStyleProps {
  className?: string
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorCardToneKey
}
