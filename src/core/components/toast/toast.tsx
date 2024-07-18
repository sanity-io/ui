import {CloseIcon} from '@sanity/icons'
import {ThemeColorStateToneKey} from '@sanity/ui/theme'
import {styled} from 'styled-components'
import {Box, Button, Flex, Stack, Text, Card} from '../../primitives'
import {ThemeProps} from '../../styles'
import type {ButtonTone} from '../../types'
import {rootStyles, TextBox} from './styles'

/**
 * @public
 */
export interface ToastProps {
  closable?: boolean
  description?: React.ReactNode
  onClose?: () => void
  radius?: number | number[]
  title?: React.ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
  duration?: number
}

const STATUS_CARD_TONE: {[key: string]: ThemeColorStateToneKey} = {
  error: 'critical',
  warning: 'caution',
  success: 'positive',
  info: 'primary',
} as const

const BUTTON_TONE = {
  error: 'critical',
  warning: 'caution',
  success: 'positive',
  info: 'primary',
} satisfies {[key: string]: ButtonTone}

const ROLES = {
  error: 'alert',
  warning: 'alert',
  success: 'alert',
  info: 'alert',
} as const

const Root = styled(Card)<{$duration?: number; tone: ThemeColorStateToneKey} & ThemeProps>(
  rootStyles,
)

/**
 * The `Toast` component gives feedback to users when an action has taken place.
 *
 * Toasts can be closed with a close button, or auto-dismiss after a certain timeout.
 *
 * @public
 */
export function Toast(
  props: ToastProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'title'>,
): React.ReactElement {
  const {closable, description, duration, onClose, radius = 3, title, status, ...restProps} = props
  const cardTone = status ? STATUS_CARD_TONE[status] : 'default'
  const buttonTone = status ? BUTTON_TONE[status] : 'default'
  const role = status ? ROLES[status] : 'status'

  return (
    <Root
      data-ui="Toast"
      role={role}
      {...restProps}
      marginTop={3}
      radius={radius}
      shadow={2}
      tone={cardTone}
      $duration={duration}
    >
      <Flex align="flex-start">
        <TextBox flex={1} padding={3}>
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
            />
          </Box>
        )}
      </Flex>
    </Root>
  )
}

Toast.displayName = 'Toast'
