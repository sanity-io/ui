import {CloseIcon} from '@sanity/icons'
import {RadiusStyleProps} from '@sanity/ui/css'
import {ThemeColorStateToneKey} from '@sanity/ui/theme'
import {Box, Button, Flex, Stack, Text, Card} from '../../primitives'
import type {ButtonTone} from '../../types'

/**
 * @public
 */
export interface ToastProps extends RadiusStyleProps {
  closable?: boolean
  description?: React.ReactNode
  onClose?: () => void
  title?: React.ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
  duration?: number
}

const STATUS_CARD_TONE: {[key: string]: ThemeColorStateToneKey} = {
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
} satisfies {[key: string]: ButtonTone}

const ROLES = {
  error: 'alert',
  warning: 'alert',
  success: 'alert',
  info: 'alert',
} as const

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
      'as' | 'height' | 'ref' | 'rows' | 'title' | 'width' | 'wrap'
    >,
): React.ReactElement {
  const {
    closable,
    description,
    duration, // eslint-disable-line @typescript-eslint/no-unused-vars
    onClose,
    radius = 3,
    title,
    status,
    ...restProps
  } = props

  const cardTone = status ? STATUS_CARD_TONE[status] : 'default'
  const buttonTone = status ? BUTTON_TONE[status] : 'default'
  const role = status ? ROLES[status] : 'status'

  return (
    <Card
      // root
      data-ui="Toast"
      role={role}
      {...restProps}
      marginTop={3}
      pointerEvents="auto"
      radius={radius}
      shadow={2}
      tone={cardTone}
      // todo
      // $duration={duration}
    >
      <Flex align="flex-start">
        <Box
          // text-box
          flex={1}
          overflowX="auto"
          padding={3}
        >
          <Stack space={3}>
            {title && (
              <Text size={1} weight="medium">
                {title}
              </Text>
            )}
            {description && (
              <Text muted size={1}>
                {description}
              </Text>
            )}
          </Stack>
        </Box>

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
      </Flex>
    </Card>
  )
}

Toast.displayName = 'Toast'
