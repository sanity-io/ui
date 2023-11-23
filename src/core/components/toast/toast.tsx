import {CloseIcon} from '@sanity/icons'
import {ThemeColorToneKey} from '@sanity/ui/theme'
import styled from 'styled-components'
import {Box, Button, Card, Flex, Stack, Text} from '../../primitives'

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
}

const STATUS_CARD_TONE: {[key: string]: ThemeColorToneKey} = {
  error: 'critical',
  warning: 'caution',
  success: 'positive',
  info: 'primary',
}

const ROLES = {
  error: 'alert',
  warning: 'alert',
  success: 'alert',
  info: 'alert',
}

const Root = styled(Card)`
  pointer-events: all;
`

const TextBox = styled(Flex)`
  overflow-x: auto;
`

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
  const {closable, description, onClose, radius = 3, title, status, ...restProps} = props
  const cardTone = status ? STATUS_CARD_TONE[status] : 'default'
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
              onClick={onClose}
              style={{verticalAlign: 'top'}}
            />
          </Box>
        )}
      </Flex>
    </Root>
  )
}
