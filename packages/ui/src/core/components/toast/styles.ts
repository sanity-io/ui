import {styled} from 'styled-components'

import {ThemeColorStateToneKey} from '../../../theme/system/color/_system'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {Card, type CardProps} from '../../primitives/card/card'
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

type LoadingBarProgressProps = Omit<CardProps, 'tone'> & {
  tone: ThemeColorStateToneKey
}
// Stays on styled-components: the theme-derived `background-color` must beat
// Card's runtime `background-color: var(--card-bg-color)` at equal specificity,
// which needs both rules in the runtime stylesheet.
export const LoadingBarProgress = styled<React.ComponentType<LoadingBarProgressProps>>(Card)`
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: 0% 50%;
  background-color: ${(props) => {
    const {color} = getTheme_v2(props.theme)

    return color.button.default[props.tone].enabled.bg
  }};
`
