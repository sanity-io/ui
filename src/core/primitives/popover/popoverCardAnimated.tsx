import {motion} from 'motion/react'
import React, {forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'

import {POPOVER_MOTION_PROPS} from '../../constants'
import {Card} from '../card'
import {Flex} from '../flex'
import {PopoverCardLayout, type PopoverCardProps} from './popoverCard'
import {popoverCardStyle, popoverWrapperStyle} from './popoverCardStyles'

// Re-exported so `popover.tsx` can lazily load `AnimatePresence` from the same chunk as this
// module, avoiding both a static `motion/react` import and a second chunk request.
export {AnimatePresence} from 'motion/react'

const MotionCard = /* @__PURE__ */ styled(/* @__PURE__ */ motion.create(Card))`
  ${popoverCardStyle}
`

const MotionFlex = /* @__PURE__ */ styled(/* @__PURE__ */ motion.create(Flex))`
  ${popoverWrapperStyle}
`

/**
 * Motion-wrapped popover card, kept in its own lazily loaded chunk so `motion/react` is only
 * evaluated once an animated popover opens.
 *
 * @internal
 */
export const PopoverCardAnimated = forwardRef(function PopoverCardAnimated(
  props: PopoverCardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
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

  const flexProps = useMemo(
    () => ({
      variants: POPOVER_MOTION_PROPS.children,
      transition: POPOVER_MOTION_PROPS.transition,
    }),
    [],
  )

  return (
    <PopoverCardLayout
      {...props}
      cardComponent={MotionCard}
      cardProps={cardProps}
      flexComponent={MotionFlex}
      flexProps={flexProps}
      ref={ref}
    />
  )
})
PopoverCardAnimated.displayName = 'ForwardRef(PopoverCardAnimated)'
