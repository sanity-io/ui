import {Box, Text} from '@sanity/ui'
import React from 'react'
import {PropSchema} from '../types'
import {BooleanProp} from './booleanProp'
import {NumberProp} from './numberProp'
import {SelectProp} from './selectProp'
import {StringProp} from './stringProp'
import {TextProp} from './textProp'

export function Prop(props: {schema: PropSchema; value: any}) {
  const {schema, value} = props

  if (schema.type === 'boolean') {
    return <BooleanProp schema={schema} value={value} />
  }

  if (schema.type === 'number') {
    return <NumberProp schema={schema} value={value} />
  }

  if (schema.type === 'select') {
    return <SelectProp schema={schema} value={value} />
  }

  if (schema.type === 'string') {
    return <StringProp schema={schema} value={value} />
  }

  if (schema.type === 'text') {
    return <TextProp schema={schema} value={value} />
  }

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        Unknown Prop type:{' '}
        <code>
          {(schema as any).name}: {(schema as any).type}
        </code>
      </Text>
    </Box>
  )
}
