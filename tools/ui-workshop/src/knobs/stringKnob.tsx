import {Box, Text, TextInput} from '@sanity/ui'
import React from 'react'
import {StringKnobSchema} from '../types'
import {useScope} from '../useScope'

export function StringKnob(props: {schema: StringKnobSchema; value?: string}) {
  const {schema, value} = props
  const {setKnobValue} = useScope()

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <TextInput
          fontSize={1}
          onChange={(event) => setKnobValue(schema.name, event.currentTarget.value)}
          padding={2}
          value={value || ''}
        />
      </Box>
    </Box>
  )
}
