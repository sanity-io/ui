import {Box, Card, Container, Flex, Skeleton, Stack} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('components/skeleton', 'Skeleton', [
  {name: 'example', title: 'Example', component: ExampleStory},
])

function ExampleStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Container width={0}>
        <Card marginY={4} radius={2} shadow={1} tone="caution">
          <Stack padding={4} space={4}>
            <Skeleton style={{height: 100}} radius={2} />
            <Stack space={3}>
              <Skeleton style={{height: 11, width: '50%'}} />
              <Skeleton style={{height: 9, width: '60%'}} />
            </Stack>
          </Stack>
        </Card>

        <Card marginY={4} radius={2} shadow={1}>
          <Flex align="center" padding={3} gap={3}>
            <Skeleton style={{height: 35, width: 35}} />
            <Stack flex={1} space={2}>
              <Skeleton style={{height: 11, width: '50%'}} />
              <Skeleton style={{height: 9, width: '60%'}} />
            </Stack>
          </Flex>
        </Card>
      </Container>
    </Box>
  )
}
