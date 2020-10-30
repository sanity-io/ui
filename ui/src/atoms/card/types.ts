import {ColorSchemeKey} from '../../theme'

export type CardTone = 'default' | 'transparent'

export interface CardColorProps {
  scheme: ColorSchemeKey
  tone: CardTone
}
