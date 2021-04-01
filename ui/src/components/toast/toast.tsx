import {CloseIcon} from '@sanity/icons'
import React from 'react'
import styled from 'styled-components'
import {Box, Card, Flex, Stack, Text} from '../../primitives'
import {ThemeColorToneKey} from '../../theme'

interface ToastProps {
  closable?: boolean
  description?: React.ReactNode
  onClose?: () => void
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
  success: 'status',
  info: 'status',
}

const Root = styled(Card)`
  pointer-events: all;
`

const TextBox = styled(Flex)`
  overflow-x: auto;
`

export function Toast(
  props: ToastProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'title'>
) {
  const {closable, description, onClose, title, status, ...restProps} = props
  const cardTone = status ? STATUS_CARD_TONE[status] : 'default'
  const role = status ? ROLES[status] : 'status'

  return (
    <Root
      data-ui="Toast"
      role={role}
      {...restProps}
      marginTop={3}
      radius={2}
      shadow={2}
      tone={cardTone}
    >
      <Flex align="flex-start">
        <TextBox flex={1} padding={3}>
          <Stack space={3}>
            {title && <Text weight="semibold">{title}</Text>}
            {description && (
              <Text muted size={1}>
                {description}
              </Text>
            )}
          </Stack>
        </TextBox>

        {closable && (
          <Box padding={1}>
            <Card
              as="button"
              padding={2}
              onClick={onClose}
              radius={2}
              tone={cardTone}
              style={{verticalAlign: 'top'}}
            >
              <Text>
                <CloseIcon />
              </Text>
            </Card>
          </Box>
        )}
      </Flex>
    </Root>
  )
}
