import {CloseIcon} from '@sanity/icons'
import {type RadiusStyleProps, toast} from '@sanity/ui/css'
import {motion, type Variant, type Variants} from 'framer-motion'
import {type ReactNode} from 'react'

import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Box} from '../../primitives/box/box'
import {Button} from '../../primitives/button/button'
import {Card} from '../../primitives/card/card'
import {Flex} from '../../primitives/flex/flex'
import {Stack} from '../../primitives/stack/stack'
import {Text} from '../../primitives/text/text'
import type {ComponentType, Props} from '../../types/props'

/** @internal */
export const DEFAULT_TOAST_ELEMENT = 'li'

/** @internal */
export type ToastOwnProps = RadiusStyleProps & {
  closable?: boolean
  description?: ReactNode
  onClose?: () => void
  title?: ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
  duration?: number
}

/** @internal */
export type ToastElementType = 'li' | ComponentType

/** @internal */
export type ToastProps<E extends ToastElementType = ToastElementType> = Props<ToastOwnProps, E>

// Support pattern used by Sanity Studio, that works around the lack of `duration: Infinity` support in older @sanity/ui versions
// https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
const LONG_ENOUGH_BUT_NOT_TOO_LONG = 1000 * 60 * 60 * 24 * 24

const ROLES = {
  error: 'alert',
  warning: 'alert',
  success: 'alert',
  info: 'alert',
} as const

const STATUS_CARD_TONE = {
  error: 'critical',
  warning: 'caution',
  success: 'positive',
  info: 'neutral',
} as const

const BUTTON_TONE = {
  error: 'critical',
  warning: 'caution',
  success: 'positive',
  info: 'neutral',
} as const

/**
 * The `Toast` component gives feedback to users when an action has taken place.
 *
 * Toasts can be closed with a close button, or auto-dismiss when the duration expires.
 *
 * @internal
 */
export function Toast<E extends ToastElementType = typeof DEFAULT_TOAST_ELEMENT>(
  props: ToastProps<E>,
) {
  const {
    as = DEFAULT_TOAST_ELEMENT,
    closable,
    description,
    duration,
    onClose,
    radius = 3,
    title,
    status,
    ...rest
  } = props as ToastProps<typeof DEFAULT_TOAST_ELEMENT>

  const cardTone = status ? STATUS_CARD_TONE[status] : 'default'
  const buttonTone = status ? BUTTON_TONE[status] : 'default'
  const role = status ? ROLES[status] : 'status'

  const prefersReducedMotion = usePrefersReducedMotion()

  const visualDuration: number = prefersReducedMotion ? 0 : 0.26
  const transition = visualDuration ? {type: 'spring', visualDuration, bounce: 0.25} : {duration: 0}

  const hasDuration = duration && isFinite(duration) && duration < LONG_ENOUGH_BUT_NOT_TOO_LONG
  const initial: ContainerVariants[] = ['hidden', 'initial']
  const animate: ContainerVariants[] = ['visible', 'slideIn']
  const exit: ContainerVariants[] = ['hidden', 'slideOut']

  return (
    <MotionCard
      as={as}
      className={toast()}
      data-ui="Toast"
      role={role}
      {...rest}
      custom={visualDuration}
      data-has-duration={hasDuration ? '' : undefined}
      radius={radius}
      shadow={2}
      tone={cardTone}
      layout="position"
      variants={container}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      position="relative"
    >
      <MotionFlex align="flex-start" variants={content} transition={transition}>
        <Flex flex={1} overflowX="auto" padding={3}>
          <Stack gap={3}>
            {title && (
              <Text size={1} weight="medium">
                {title}
              </Text>
            )}
            {description && (
              <MotionText muted size={1} variants={content} transition={transition}>
                {description}
              </MotionText>
            )}
          </Stack>
        </Flex>

        {closable && (
          <Box padding={1}>
            <Button
              as="button"
              icon={CloseIcon}
              mode="bleed"
              padding={2}
              tone={buttonTone}
              onClick={onClose}
              style={{verticalAlign: 'top'}}
            />
          </Box>
        )}
      </MotionFlex>
    </MotionCard>
  )
}

const container = {
  initial: {y: 32, scale: 0.5, zIndex: 1},
  hidden: {opacity: 0},
  visible: (visualDuration: number) => {
    if (!visualDuration) return {opacity: 1}

    return {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: visualDuration / 3,
        duration: visualDuration / 3,
      },
    }
  },
  slideIn: {
    y: 0,
    scale: 1,
  },
  slideOut: {
    zIndex: 0,
    scale: 0.75,
  },
} satisfies Variants
type ContainerVariants = keyof typeof container

const content = {
  initial: {
    willChange: 'transform',
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
} satisfies Partial<Record<ContainerVariants, Variant>>

const MotionCard = motion.create(Card)
const MotionFlex = motion.create(Flex)
const MotionText = motion.create(Text)
