import type {CardTone, ColorScheme} from '@sanity/ui/theme'

import type {HeightStyleProps} from '../../props/height/types'

/** @public */
export interface RootStyleProps extends HeightStyleProps {
  className?: string
  scheme?: ColorScheme
  tone?: CardTone
}
