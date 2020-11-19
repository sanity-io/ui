import {ThemeColorSchemeKey} from '../../theme'

export type CardTone = 'default' | 'transparent' | 'positive' | 'caution' | 'critical' | 'brand'

export interface CardColorProps {
  scheme: ThemeColorSchemeKey
  tone: CardTone
}
