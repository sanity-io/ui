import {Icon, IconSymbol} from '@sanity/icons'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card, Text} from '@sanity/ui'
import {CardTone} from '@sanity/ui/tokens'

import {CalloutData} from '@/lib/data'

import {PlainContent} from '../PlainContent'

export function Callout(props: {data: WrappedValue<CalloutData>}) {
  const {content, icon, tone} = props.data

  return (
    <Card
      display="flex"
      gap={3}
      marginY={[4, 4, 5]}
      padding={4}
      radius={4}
      tone={(tone?.value || 'transparent') as CardTone}
    >
      {/* <Flex> */}
      {icon?.value && (
        // <Box padding={3}>
        <Text flex="none" muted size={1}>
          <Icon symbol={icon.value as IconSymbol} />
        </Text>
        // </Box>
      )}

      {content && (
        <Box flex={1}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <PlainContent blocks={content as any} />
        </Box>
      )}
      {/* </Flex> */}
    </Card>
  )
}
