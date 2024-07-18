import {styled, keyframes, css} from 'styled-components'
import {ThemeColorStateToneKey, getTheme_v2} from '../../../theme'
import {POPOVER_MOTION_CONTENT_OPACITY_PROPERTY} from '../../constants'
import {Flex} from '../../primitives'
import {ThemeProps} from '../../styles'

export const TextBox = styled(Flex)`
  overflow-x: auto;
`

const loadingAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`

const LOADING_BAR_HEIGHT = 2

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
    padding-bottom: ${LOADING_BAR_HEIGHT}px;
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      height: ${LOADING_BAR_HEIGHT}px;
      background: ${loadingBarColor};
      animation-name: ${loadingAnimation};
      animation-duration: ${props.$duration}ms;
      animation-fill-mode: both;
    }

    & > * {
      opacity: var(${POPOVER_MOTION_CONTENT_OPACITY_PROPERTY}, 1);
      will-change: opacity;
    }
  `
}
