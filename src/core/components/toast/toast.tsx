import {CloseIcon} from '@sanity/icons'
import {ThemeColorStateToneKey} from '@sanity/ui/theme'
import {motion, type Variants} from 'framer-motion'
import {styled} from 'styled-components'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Box, Button, Flex, Stack, Text, Card} from '../../primitives'
import {ThemeProps} from '../../styles'

import {
  LoadingBar,
  LoadingBarProgress,
  BUTTON_TONE,
  rootStyles,
  STATUS_CARD_TONE,
  TextBox,
} from './styles'

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

const StyledToast = motion.create(
  styled(Card)<{$duration?: number; tone: ThemeColorStateToneKey} & ThemeProps>(rootStyles),
)

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

  const prefersReducedMotion = usePrefersReducedMotion()

  let visualDuration = prefersReducedMotion ? 0 : 0.26
  visualDuration = 5
  const transition = visualDuration ? {type: 'spring', visualDuration, bounce: 0.25} : {duration: 0}

  console.log({visualDuration, transition})

  return (
    <StyledToast
      data-ui="Toast"
      role={role}
      {...restProps}
      custom={visualDuration satisfies number}
      radius={radius}
      shadow={2}
      tone={cardTone}
      $duration={duration && isFinite(duration) ? duration : undefined}
      forwardedAs="li"
      layout="position"
      variants={container}
      initial={['hidden', 'initial'] satisfies ContainerVariants[]}
      animate={['visible', 'slideIn'] satisfies ContainerVariants[]}
      exit={['hidden', 'slideOut'] satisfies ContainerVariants[]}
      transition={transition}
    >
      <MotionFlex align="flex-start" variants={content} transition={transition}>
        <TextBox flex={1} padding={3}>
          <Stack space={3}>
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
        </TextBox>

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
              // variants={content}
              // transition={transition}
            />
          </Box>
        )}
      </MotionFlex>
      {duration && isFinite(duration) && (
        <MotionLoadiongBar variants={content} transition={transition}>
          <Card
            tone={cardTone}
            radius={radius}
            style={{
              position: 'absolute',
              right: -2,
              left: -2,
              top: 0,
              bottom: 2,
              zIndex: 1,
            }}
          />
          <MotionLoadiongBarProgress
            key={`${duration}-${updatedAt}`}
            tone={cardTone}
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            transition={{delay: visualDuration, duration: duration / 1_000, ease: 'linear'}}
            onAnimationComplete={onClose}
          />
        </MotionLoadiongBar>
      )}
    </StyledToast>
  )
}

Toast.displayName = 'Toast'

// hidden, visible, slideIn, slideOut
const container = {
  initial: {y: 32, scale: 0.25, zIndex: 1},
  hidden: {opacity: 0},
  visible: (visualDuration: number, ...rest) => {
    console.log({visualDuration}, ...rest)
    if (!visualDuration) return {opacity: 1}

    return {
      opacity: 1,
      // transition: {
      // when: 'beforeChildren',
      // delayChildren: visualDuration / 3,
      // staggerChildren: visualDuration / 3,
      // duration: visualDuration - visualDuration / 3,
      // },
    }
  },
  slideIn: {
    y: 0,
    scale: 1,
  },
  slideOut: (visualDuration: number) => ({
    zIndex: 0,
    scale: 0.5,
    transition: visualDuration ? {duration: visualDuration - visualDuration / 3} : undefined,
  }),
} satisfies Variants
type ContainerVariants = keyof typeof container

const content = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
} satisfies Variants

const MotionFlex = motion.create(Flex)

const MotionText = motion.create(Text)

const MotionLoadiongBar = motion.create(LoadingBar)
const MotionLoadiongBarProgress = motion.create(LoadingBarProgress)
