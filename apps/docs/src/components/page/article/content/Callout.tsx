import {Icon} from '@sanity/icons'
import {Box, Card, Flex, Text} from '@sanity/ui'
import {stegaClean} from 'next-sanity'

import {CalloutData} from '@/lib/data'

import {PlainContent} from '../PlainContent'

export function Callout(props: {data: CalloutData}) {
  const {content, icon, tone} = props.data

  return (
    <Card marginY={[4, 4, 5]} padding={2} radius={2} tone={stegaClean(tone) || 'transparent'}>
      <Flex>
        {icon && (
          <Box padding={3}>
            <Text muted>
              <Icon symbol={stegaClean(icon)} />
            </Text>
          </Box>
        )}

        {content && (
          <Box flex={1} padding={3} paddingLeft={2}>
            <PlainContent blocks={content} />
          </Box>
        )}
      </Flex>
    </Card>
  )
}
