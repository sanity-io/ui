import {Card, Container, Flex, Stack, Text} from '@sanity/ui'
import React from 'react'
import {CARD_TONE_OPTIONS} from './constants'

export function AllTonesStory() {
  const tones = Object.entries(CARD_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={5}>
          {tones.map(([title, tone]) => (
            <Card
              key={tone}
              padding={4}
              radius={2}
              shadow={4}
              style={{textAlign: 'center'}}
              tone={tone}
            >
              <Text>{title}</Text>
            </Card>
          ))}
        </Stack>
      </Container>
    </Flex>
  )
}
