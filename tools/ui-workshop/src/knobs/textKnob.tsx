import {Box, Text, TextArea} from '@sanity/ui'
import React from 'react'
import {TextKnobSchema} from '../types'
import {useScope} from '../useScope'

export function TextKnob(props: {schema: TextKnobSchema; value?: string}) {
  const {schema, value} = props
  const {setKnobValue} = useScope()

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <TextArea
          onChange={(event) => setKnobValue(schema.name, event.currentTarget.value)}
          rows={4}
          value={value || ''}
        />
      </Box>
    </Box>
  )
}
