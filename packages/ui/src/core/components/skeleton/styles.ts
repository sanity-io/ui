import {css, keyframes} from 'styled-components'

const keyframe = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`

const animation = css`
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(#fff, #fff);
  mask-image: linear-gradient(#fff, #fff);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      to right,
      transparent,
      var(--card-skeleton-color-to),
      transparent
    );
    pointer-events: none;
    will-change: transform;
    animation-name: ${keyframe};
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 2000ms;
  }
`

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const skeletonStyle = css<{$animated: boolean; $visible: boolean}>`
  background-color: var(--card-skeleton-color-from);
  opacity: ${({$visible}) => ($visible ? 1 : 0)};
  transition: opacity 200ms ease-in;

  @media screen and (prefers-reduced-motion: no-preference) {
    ${({$animated}) => ($animated ? animation : undefined)}
  }
`
