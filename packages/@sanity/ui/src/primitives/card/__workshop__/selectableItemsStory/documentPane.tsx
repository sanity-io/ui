import {Card, CardTone, Flex, Layer, Stack, Text, TextInput} from '@sanity/ui'
import React, {useEffect, useRef} from 'react'

export function DocumentPane(props: {id: string | null; tone?: CardTone}) {
  const {id, tone} = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [id])

  return (
    <Card borderLeft flex={1.5} height="fill" overflow="hidden" tone={tone}>
      <Flex direction="column" height="fill">
        <Layer zOffset={1000}>
          <Card padding={4} shadow={1} tone="inherit">
            <Text weight="semibold">Document ({id})</Text>
          </Card>
        </Layer>

        <Stack
          as="form"
          flex={1}
          overflow="auto"
          paddingX={4}
          paddingTop={5}
          paddingBottom={9}
          space={5}
        >
          <Stack space={3}>
            <Text size={1} weight="medium">
              Title
            </Text>
            <TextInput ref={inputRef} />
          </Stack>
        </Stack>
      </Flex>
    </Card>
  )
}
