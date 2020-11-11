import {ColorSchemeKey} from '../../theme'

export type CardTone = 'default' | 'transparent' | 'positive' | 'caution' | 'critical' | 'brand'

export interface CardColorProps {
  scheme: ColorSchemeKey
  tone: CardTone
}
