import {CloseIcon} from '@sanity/icons'
import type {ComponentType, Props} from '@sanity/ui/core'
import {type RadiusStyleProps, toast} from '@sanity/ui/css'
import {usePrefersReducedMotion} from '@sanity/ui/hooks'
import {Box} from '@sanity/ui/primitives/box'
import {Button} from '@sanity/ui/primitives/button'
import {Card} from '@sanity/ui/primitives/card'
import {Flex} from '@sanity/ui/primitives/flex'
import {Stack} from '@sanity/ui/primitives/stack'
import {Text} from '@sanity/ui/primitives/text'
import {motion, type Variant, type Variants} from 'motion/react'
import {type ReactNode} from 'react'

/**
 * The default HTML element type rendered by the {@link Toast} component.
 *
 * @internal
 */
export const DEFAULT_TOAST_ELEMENT = 'li'

/**
 * Own props for the {@link Toast} component.
 *
 * @remarks
 * Extends {@link RadiusStyleProps} to provide border radius styling
 * for the toast card.
 *
 * @internal
 */
export type ToastOwnProps = RadiusStyleProps & {
  /**
   * When `true`, renders a close button that allows the user to
   * dismiss the toast manually.
   */
  closable?: boolean

  /**
   * Secondary descriptive content displayed below the title.
   */
  description?: ReactNode

  /**
   * A callback that fires when the toast is dismissed, either by
   * the close button or when the duration expires.
   */
  onClose?: () => void

  /**
   * The primary text content displayed in the toast.
   */
  title?: ReactNode

  /**
   * The semantic status of the toast, which determines the color
   * tone and ARIA role applied.
   */
  status?: 'error' | 'warning' | 'success' | 'info'

  /**
   * The duration in milliseconds before the toast auto-dismisses.
   *
   * @remarks
   * When set to `Infinity`, the toast will not auto-dismiss and must
   * be closed manually via the close button.
   */
  duration?: number
}

/**
 * Accepted values for the `as` prop of the {@link Toast} component.
 *
 * @internal
 */
export type ToastElementType = 'li' | ComponentType

/**
 * Props for the {@link Toast} component.
 *
 * @remarks
 * Combines {@link ToastOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<li>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link ToastElementType}.
 *
 * @internal
 */
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
 * @remarks
 * Toasts can be closed with a close button or auto-dismiss when the duration
 * expires. They support semantic statuses (`error`, `warning`, `success`, `info`)
 * which determine the card tone and ARIA role. Toasts animate in and out
 * using motion transitions.
 *
 * @internal
 */
export function Toast<E extends ToastElementType = typeof DEFAULT_TOAST_ELEMENT>(
  props: ToastProps<E>,
): React.JSX.Element {
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
  const transition = visualDuration
    ? {type: 'spring' as const, visualDuration, bounce: 0.25}
    : {duration: 0}

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
      animate={animate}
      custom={visualDuration}
      data-has-duration={hasDuration ? '' : undefined}
      exit={exit}
      initial={initial}
      layout="position"
      position="relative"
      radius={radius}
      shadow={2}
      tone={cardTone}
      transition={transition}
      variants={container}
    >
      <MotionFlex align="flex-start" transition={transition} variants={content}>
        <Flex flex={1} overflowX="auto" padding={3}>
          <Stack gap={3}>
            {title && (
              <Text size={1} weight="medium">
                {title}
              </Text>
            )}
            {description && (
              <MotionText muted size={1} transition={transition} variants={content}>
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
              style={{verticalAlign: 'top'}}
              tone={buttonTone}
              onClick={onClose}
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
