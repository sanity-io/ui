import {getTheme_v2, ThemeColorStateToneKey} from '@sanity/ui/theme'
import {styled} from 'styled-components'

import {Card, Flex} from '../../primitives'
import type {ButtonTone} from '../../types'

const LOADING_BAR_HEIGHT = 2

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

export const TextBox = styled(Flex)`
  overflow-x: auto;
`

export const StyledToast = styled(Card)`
  pointer-events: all;
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow: clip;

  &[data-has-duration] {
    padding-bottom: calc(${LOADING_BAR_HEIGHT}px / 2);
  }
`

export const LoadingBar = styled.div`
  display: flex;
  position: absolute;
  bottom: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  overflow: clip;
  background: transparent;
  align-items: flex-end;
  will-change: opacity;
`

export const LoadingBarMask = styled(Card)`
  position: absolute;
  top: 0;
  left: -${LOADING_BAR_HEIGHT}px;
  right: -${LOADING_BAR_HEIGHT}px;
  bottom: ${LOADING_BAR_HEIGHT}px;
  z-index: 1;
`

type LoadingBarProgressProps = Omit<React.ComponentProps<typeof Card>, 'tone'> & {
  tone: ThemeColorStateToneKey
}
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
