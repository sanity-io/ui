import {CloseIcon} from '@sanity/icons'
import {type RadiusStyleProps, toast} from '@sanity/ui/css'
import {motion, type Variant, type Variants} from 'motion/react'
import {type ReactNode} from 'react'

import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Box} from '../../primitives/box/Box'
import {Button} from '../../primitives/button/Button'
import {Card} from '../../primitives/card/Card'
import {Flex} from '../../primitives/flex/Flex'
import {Stack} from '../../primitives/stack/Stack'
import {Text} from '../../primitives/text/Text'
import type {ComponentType, Props} from '../../types'

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
 * Extends {@link RadiusStyleProps} to provide border radius control alongside
 * toast-specific properties for content, status, dismissibility, and auto-dismiss
 * duration.
 *
 * Inherited from {@link RadiusStyleProps}:
 * - `radius` (`ResponsiveProp<Radius | 'full'>`) – Sets the border radius of the toast card. Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | "full"`. Default: `3`.
 *
 * @internal
 */
export type ToastOwnProps = RadiusStyleProps & {
  /**
   * When `true`, renders a close button inside the toast that allows the
   * user to manually dismiss it.
   *
   * @remarks
   * The close button invokes the {@link ToastOwnProps.onClose | onClose}
   * callback when clicked.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  closable?: boolean

  /**
   * Secondary descriptive text rendered below the title inside the toast.
   *
   * @remarks
   * Rendered inside a muted {@link Text} component with `size={1}`. When
   * omitted, only the title is displayed.
   *
   * @type {ReactNode}
   * @defaultValue undefined
   * @optional
   */
  description?: ReactNode

  /**
   * Callback fired when the toast's close button is clicked.
   *
   * @remarks
   * Only invoked when `closable` is `true` and the user clicks the close
   * button. The toast does not remove itself from the DOM; the consumer
   * (typically {@link ToastProvider}) is responsible for unmounting it.
   *
   * @type {() => void}
   * @defaultValue undefined
   * @optional
   */
  onClose?: () => void

  /**
   * The primary text rendered inside the toast.
   *
   * @remarks
   * Rendered inside a {@link Text} component with `size={1}` and
   * `weight="medium"`. Typically a short, descriptive message summarizing
   * the action that occurred.
   *
   * @type {ReactNode}
   * @defaultValue undefined
   * @optional
   */
  title?: ReactNode

  /**
   * Sets the semantic status of the toast, which determines its color tone
   * and ARIA role.
   *
   * @remarks
   * The status maps to a card tone and button tone from the theme:
   * - `"error"` → `"critical"` tone, `role="alert"`
   * - `"warning"` → `"caution"` tone, `role="alert"`
   * - `"success"` → `"positive"` tone, `role="alert"`
   * - `"info"` → `"neutral"` tone, `role="alert"`
   *
   * When `undefined`, the toast renders with the `"default"` tone and
   * `role="status"`.
   *
   * Accepted values: `"error"` | `"warning"` | `"success"` | `"info"`
   *
   * @type {'error' | 'warning' | 'success' | 'info'}
   * @defaultValue undefined
   * @optional
   */
  status?: 'error' | 'warning' | 'success' | 'info'

  /**
   * The auto-dismiss duration in milliseconds.
   *
   * @remarks
   * When a finite, positive number less than ~24 days is provided, the
   * toast is flagged with `data-has-duration` for the {@link ToastProvider}
   * to schedule automatic removal. When `undefined`, `Infinity`, or an
   * extremely large value, the toast persists until manually dismissed.
   *
   * @type {number}
   * @defaultValue undefined
   * @optional
   */
  duration?: number
}

/**
 * Accepted values for the `as` prop of the {@link Toast} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Toast`.
 *
 * Accepted values: `"li"` | `ComponentType`
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
 * Provides visual feedback to users when an action has taken place.
 *
 * @remarks
 * The `Toast` component renders an animated notification card with an optional
 * title, description, status indicator, and close button. It uses `motion/react`
 * for entrance, exit, and layout animations (automatically disabled when the
 * user prefers reduced motion).
 *
 * The toast's visual appearance (background color, text color, close button tone)
 * is determined by the `status` prop, which maps to semantic card tones from the
 * theme. An appropriate ARIA `role` is also applied based on the status.
 *
 * Toasts are not typically rendered directly by consumers. Instead, use the
 * {@link ToastProvider} and the `useToast` hook to push toast notifications
 * via the {@link ToastContextValue.push} method.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `ToastElementType` | `"li"` | No | The HTML element or component type to render. |
 * | `closable` | `boolean` | `undefined` | No | When `true`, renders a close button to dismiss the toast. |
 * | `description` | `ReactNode` | `undefined` | No | Secondary descriptive text below the title. |
 * | `duration` | `number` | `undefined` | No | Auto-dismiss duration in milliseconds. |
 * | `onClose` | `() => void` | `undefined` | No | Callback fired when the close button is clicked. |
 * | `radius` | `ResponsiveProp<Radius \| 'full'>` | `3` | No | Border radius of the toast card. |
 * | `status` | `'error' \| 'warning' \| 'success' \| 'info'` | `undefined` | No | Semantic status determining color tone and ARIA role. |
 * | `title` | `ReactNode` | `undefined` | No | The primary message text. |
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
