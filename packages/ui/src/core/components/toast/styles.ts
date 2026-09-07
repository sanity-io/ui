import {ThemeColorStateToneKey} from '../../../theme/system/color/_system'
import type {ButtonTone} from '../../types/button'

export const STATUS_CARD_TONE = {
  error: 'critical',
  warning: 'caution',
  success: 'positive',
  info: 'neutral',
} satisfies {[key: string]: ThemeColorStateToneKey}

export const BUTTON_TONE = {
  error: 'critical',
  warning: 'caution',
  success: 'positive',
  info: 'neutral',
} satisfies {[key: string]: ButtonTone}
