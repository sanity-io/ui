import {ThemeColorSchemeKey} from '../../theme'
import {CardTone} from '../../types'

/**
 * @internal
 */
export interface CardStyleProps {
  $checkered: boolean
  $focusRing: boolean
  $tone: CardTone
  $scheme: ThemeColorSchemeKey
}
