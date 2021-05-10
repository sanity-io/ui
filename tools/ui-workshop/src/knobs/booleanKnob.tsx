import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import React from 'react'
import {BooleanKnobSchema} from '../types'
import {useScope} from '../useScope'

export function BooleanKnob(props: {schema: BooleanKnobSchema; value?: boolean}) {
  const {schema, value} = props
  const {setKnobValue} = useScope()

  return (
    <Flex as="label" padding={3}>
      <Box marginRight={2} style={{lineHeight: 0}}>
        <Checkbox
          checked={value || false}
          onChange={(event) => setKnobValue(schema.name, event.currentTarget.checked)}
        />
      </Box>
      <Box paddingY={1}>
        <Text size={1} weight="semibold">
          {schema.name}
        </Text>
      </Box>
    </Flex>
  )
}
