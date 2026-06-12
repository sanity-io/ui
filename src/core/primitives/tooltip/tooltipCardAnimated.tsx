import {motion} from 'motion/react'
import React, {forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'

import {POPOVER_MOTION_PROPS} from '../../constants'
import {Card} from '../card'
import {TooltipCardLayout, type TooltipCardProps} from './tooltipCard'
import {tooltipCardStyle} from './tooltipCardStyles'

// Re-exported so `tooltip.tsx` can lazily load `AnimatePresence` from the same chunk as this
// module, avoiding both a static `motion/react` import and a second chunk request.
export {AnimatePresence} from 'motion/react'

const MotionCard = /* @__PURE__ */ styled(/* @__PURE__ */ motion.create(Card))`
  ${tooltipCardStyle}
`

/**
 * Motion-wrapped tooltip card, kept in its own lazily loaded chunk so `motion/react` is only
 * evaluated once an animated tooltip shows.
 *
 * @internal
 */
export const TooltipCardAnimated = forwardRef(function TooltipCardAnimated(
  props: TooltipCardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {animate} = props

  const cardProps = useMemo(
    () => ({
      variants: POPOVER_MOTION_PROPS.card,
      transition: POPOVER_MOTION_PROPS.transition,
      initial: animate ? ['hidden', 'initial'] : undefined,
      animate: animate ? ['visible', 'scaleIn'] : undefined,
      exit: animate ? ['hidden', 'scaleOut'] : undefined,
    }),
    [animate],
  )

  return <TooltipCardLayout {...props} cardComponent={MotionCard} cardProps={cardProps} ref={ref} />
})
TooltipCardAnimated.displayName = 'ForwardRef(TooltipCardAnimated)'
