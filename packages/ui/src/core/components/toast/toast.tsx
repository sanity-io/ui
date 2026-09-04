import {CloseIcon} from '@sanity/icons/Close'
import {clsx} from 'clsx/lite'
import {motion, stagger, type Variant, type Variants} from 'motion/react'

import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Box} from '../../primitives/box/box'
import {Button} from '../../primitives/button/button'
import {Card} from '../../primitives/card/card'
import {Flex} from '../../primitives/flex/flex'
import {Stack} from '../../primitives/stack/stack'
import {Text} from '../../primitives/text/text'
import {useTheme_v2} from '../../theme/useTheme'
import {BUTTON_TONE, STATUS_CARD_TONE} from './styles'

import {loadingBar, loadingBarMask, loadingBarProgress, toast, toastText} from './toast.css'

/**
 * @public
 */
export interface ToastProps {
  closable?: boolean
  description?: React.ReactNode
  onClose: () => void
  radius?: number | number[]
  title?: React.ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
  duration?: number
  updatedAt?: number
}

const ROLES = {
  error: 'alert',
  warning: 'alert',
  success: 'alert',
  info: 'alert',
} as const

// Support pattern used by Sanity Studio, that works around the lack of `duration: Infinity` support in older @sanity/ui versions
// https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
const LONG_ENOUGH_BUT_NOT_TOO_LONG = 1000 * 60 * 60 * 24 * 24

/**
 * The `Toast` component gives feedback to users when an action has taken place.
 *
 * Toasts can be closed with a close button, or auto-dismiss after a certain timeout.
 *
 * @public
 */
export function Toast(
  props: ToastProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      | 'as'
      | 'height'
      | 'ref'
      | 'title'
      | 'onAnimationStart'
      | 'onDragStart'
      | 'onDragEnd'
      | 'onDrag'
    >,
): React.JSX.Element {
  const {
    className,
    closable,
    description,
    duration,
    onClose,
    radius = 3,
    title,
    status,
    updatedAt,
    ...restProps
  } = props
  const cardTone = status ? STATUS_CARD_TONE[status] : 'default'
  const buttonTone = status ? BUTTON_TONE[status] : 'default'
  const role = status ? ROLES[status] : 'status'
  const {color} = useTheme_v2()

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
      className={clsx(toast, className)}
      data-ui="Toast"
      role={role}
      {...restProps}
      data-has-duration={hasDuration ? '' : undefined}
      custom={visualDuration}
      radius={radius}
      shadow={2}
      tone={cardTone}
      as="li"
      layout="position"
      variants={container}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
    >
      <MotionFlex align="flex-start" variants={content} transition={transition}>
        <Flex className={toastText} flex={1} padding={3}>
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
      {hasDuration && (
        <motion.div className={loadingBar} variants={content} transition={transition}>
          <Card className={loadingBarMask} tone={cardTone} radius={radius} />
          <MotionCard
            key={`progress-${updatedAt}`}
            className={loadingBarProgress}
            tone={cardTone}
            style={{
              '--toast-loading-bar-bg': color.button.default[cardTone].enabled.bg,
            }}
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            transition={{delay: visualDuration, duration: duration / 1_000, ease: 'linear'}}
            onAnimationComplete={onClose}
          />
        </motion.div>
      )}
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
        delayChildren: stagger(visualDuration / 3),
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
