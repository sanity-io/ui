import {CloseIcon} from '@sanity/icons'
import React from 'react'
import {Box, Card, Flex, Stack, Text} from '../../atoms'
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

export function Toast(
  props: ToastProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'title'>
) {
  const {closable, description, onClose, title, status, ...restProps} = props
  const cardTone = status ? STATUS_CARD_TONE[status] : 'default'

  return (
    <Card {...restProps} marginTop={3} padding={1} radius={2} shadow={2} tone={cardTone}>
      <Flex>
        <Box flex={1} padding={2}>
          <Stack space={3}>
            {title && <Text weight="semibold">{title}</Text>}
            {description && (
              <Text muted size={1}>
                {description}
              </Text>
            )}
          </Stack>
        </Box>

        {closable && (
          <Box marginLeft={2}>
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
    </Card>
  )
}
