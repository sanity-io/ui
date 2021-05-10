import {Box, Text} from '@sanity/ui'
import React from 'react'
import {KnobSchema} from '../types'
import {BooleanKnob} from './booleanKnob'
import {SelectKnob} from './selectKnob'
import {StringKnob} from './stringKnob'
import {TextKnob} from './textKnob'

export function Knob(props: {schema: KnobSchema; value: any}) {
  const {schema, value} = props

  if (schema.type === 'boolean') {
    return <BooleanKnob schema={schema} value={value} />
  }

  if (schema.type === 'select') {
    return <SelectKnob schema={schema} value={value} />
  }

  if (schema.type === 'string') {
    return <StringKnob schema={schema} value={value} />
  }

  if (schema.type === 'text') {
    return <TextKnob schema={schema} value={value} />
  }

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        Unknown knob type:{' '}
        <code>
          {schema.name}: {schema.type}
        </code>
      </Text>
    </Box>
  )
}
