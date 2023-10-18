import {css, keyframes} from 'styled-components'
import {cssVars} from '../../theme'

const keyframe = keyframes`
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
`

const animation = css`
  background-image: linear-gradient(
    to right,
    ${cssVars.default['skeleton-from']},
    ${cssVars.default['skeleton-to']},
    ${cssVars.default['skeleton-from']},
    ${cssVars.default['skeleton-from']},
    ${cssVars.default['skeleton-from']}
  );
  background-position: 100%;
  background-size: 200% 100%;
  background-attachment: fixed;
  animation-name: ${keyframe};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 2000ms;
`

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const skeletonStyle = css<{$animated: boolean; $visible: boolean}>`
  opacity: ${({$visible}) => ($visible ? 1 : 0)};
  transition: opacity 200ms ease-in;

  @media screen and (prefers-reduced-motion: no-preference) {
    ${({$animated}) =>
      $animated
        ? animation
        : css`
            background-color: ${cssVars.default['skeleton-from']};
          `}
  }

  @media screen and (prefers-reduced-motion: reduce) {
    background-color: ${cssVars.default['skeleton-from']};
  }
`
