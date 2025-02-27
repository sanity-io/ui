import {styled, keyframes, css} from 'styled-components'
import {ThemeColorStateToneKey, getTheme_v2} from '../../../theme'
import {POPOVER_MOTION_CONTENT_OPACITY_PROPERTY} from '../../constants'
import {Card, Flex} from '../../primitives'
import {_responsive, ThemeProps} from '../../styles'
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

export function rootStyles(
  props: {$duration?: number; tone: ThemeColorStateToneKey} & ThemeProps,
): ReturnType<typeof css> {
  const {color} = getTheme_v2(props.theme)
  const loadingBarColor = color.button.default[props.tone].enabled.bg

  if (!props.$duration)
    return css`
      pointer-events: all;
      & > * {
        opacity: var(${POPOVER_MOTION_CONTENT_OPACITY_PROPERTY}, 1);
        will-change: opacity;
      }
    `

  return css`
    pointer-events: all;
    width: 100%;
    position: relative;
    overflow: hidden;
    overflow: clip;
    will-change: opacity, transform;
    --toast-loading-bar-bg: ${loadingBarColor};

    padding-bottom: calc(${LOADING_BAR_HEIGHT}px / 2);
  `
}

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
