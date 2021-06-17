import {Flex, Skeleton, Stack, Text, TextSkeleton} from '@sanity/ui'
import React from 'react'

export function ExamplePreview(props: {loading?: boolean}) {
  const {loading} = props

  return (
    <Flex align="center" gap={2}>
      <Skeleton radius={1} style={{width: 33, height: 33}} />
      <Stack flex={1} space={2}>
        {loading ? (
          <TextSkeleton animated size={1} style={{width: '50%'}} />
        ) : (
          <Text size={1} textOverflow="ellipsis" weight="medium">
            Title
          </Text>
        )}
        {loading ? (
          <TextSkeleton animated size={1} style={{width: '60%'}} />
        ) : (
          <Text muted size={1} textOverflow="ellipsis">
            Subtitle
          </Text>
        )}
      </Stack>
    </Flex>
  )
}
