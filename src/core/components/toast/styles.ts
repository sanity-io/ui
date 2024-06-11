import {styled, keyframes, css} from 'styled-components'
import {getTheme_v2} from '../../../theme'
import {POPOVER_MOTION_CONTENT_OPACITY_PROPERTY} from '../../constants'
import {Flex} from '../../primitives'
import {ThemeProps} from '../../styles'

export const TextBox = styled(Flex)`
  overflow-x: auto;
`

const loadingAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  } 
`

export function rootStyles(
  props: {$duration?: number; tone: string} & ThemeProps,
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
    padding-bottom: 0px;
    padding-left: 0.5px;
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      border-bottom-left-radius: var(--card-border-radius, 6px);
      border-bottom-right-radius: var(--card-border-radius, 6px);
      width: 100%;
      height: 3px;
      background-image: linear-gradient(
        to right,
        ${loadingBarColor} 50%,
        var(--loading-bar-color-to, transparent) 50%
      );
      background-position: 100% 0;
      background-size: 200% 100%;
      animation-name: ${loadingAnimation};
      background-attachment: fixed;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-duration: ${props.$duration}ms;
    }

    & > * {
      opacity: var(${POPOVER_MOTION_CONTENT_OPACITY_PROPERTY}, 1);
      will-change: opacity;
    }
  `
}
