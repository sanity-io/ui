import type {Hue} from '../../../v3'

export interface ColorTokenContext {
  hue: Hue
  scheme: 'light' | 'dark'
}
