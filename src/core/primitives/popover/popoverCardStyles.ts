import {css} from 'styled-components'

/**
 * Shared between the static root in `popoverCard.tsx` and the motion-wrapped root in
 * `popoverCardAnimated.tsx`, so both render identically.
 *
 * @internal
 */
export const popoverCardStyle = css`
  &:not([hidden]) {
    display: flex;
  }
  flex-direction: column;
  width: max-content;
  min-width: min-content;
  will-change: transform;
`

/** @internal */
export const popoverWrapperStyle = css`
  will-change: opacity;
`
