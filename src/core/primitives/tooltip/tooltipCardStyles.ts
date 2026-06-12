import {css} from 'styled-components'

/**
 * Shared between the static root in `tooltipCard.tsx` and the motion-wrapped root in
 * `tooltipCardAnimated.tsx`, so both render identically.
 *
 * @internal
 */
export const tooltipCardStyle = css`
  will-change: transform;
`
