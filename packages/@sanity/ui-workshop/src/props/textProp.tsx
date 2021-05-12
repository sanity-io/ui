import {Box, Text, TextArea} from '@sanity/ui'
import React from 'react'
import {TextPropSchema} from '../types'
import {useScope} from '../useScope'

export function TextProp(props: {schema: TextPropSchema; value?: string}) {
  const {schema, value} = props
  const {setPropValue} = useScope()

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <TextArea
          onChange={(event) => setPropValue(schema.name, event.currentTarget.value)}
          rows={4}
          value={value || ''}
        />
      </Box>
    </Box>
  )
}
