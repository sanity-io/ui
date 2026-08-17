import {Icon, type IconSymbol} from '@sanity/icons'
import {Box, Card, type CardTone, Flex, Text} from '@sanity/ui'
import type React from 'react'

import {PlainContent} from '../PlainContent'

export function Callout(props: {
  children?: React.ReactNode
  icon?: IconSymbol
  tone?: CardTone
}): React.JSX.Element {
  const {children, icon, tone} = props

  return (
    <Card marginY={[4, 4, 5]} padding={2} radius={2} tone={tone || 'transparent'}>
      <Flex>
        {icon && (
          <Box padding={3}>
            <Text muted>
              <Icon symbol={icon} />
            </Text>
          </Box>
        )}

        {children && (
          <Box flex={1} padding={3} paddingLeft={2}>
            <PlainContent>{children}</PlainContent>
          </Box>
        )}
      </Flex>
    </Card>
  )
}
