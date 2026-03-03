import {Icon, IconSymbol} from '@sanity/icons'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card, Flex, Text} from '@sanity/ui'
import {CardTone} from '@sanity/ui/theme'

import {CalloutData} from '@/lib/data'

import {PlainContent} from '../PlainContent'

export function Callout(props: {data: WrappedValue<CalloutData>}) {
  const {content, icon, tone} = props.data

  return (
    <Card
      marginY={[4, 4, 5]}
      padding={2}
      radius={2}
      tone={(tone?.value || 'transparent') as CardTone}
    >
      <Flex>
        {icon?.value && (
          <Box padding={3}>
            <Text muted>
              <Icon symbol={icon.value as IconSymbol} />
            </Text>
          </Box>
        )}

        {content && (
          <Box flex={1} padding={3} paddingLeft={2}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <PlainContent blocks={content as any} />
          </Box>
        )}
      </Flex>
    </Card>
  )
}
