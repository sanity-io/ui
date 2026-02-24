import {Text} from '@sanity/ui'

import type {PropSchema} from '../types'
import {BooleanProp} from './booleanProp'
import {NumberProp} from './numberProp'
import {SelectProp} from './selectProp'
import {StringProp} from './stringProp'
import {TextProp} from './textProp'

/** @internal */
export function Prop(props: {schema: PropSchema; value: unknown}) {
  const {schema, value} = props

  if (schema.type === 'boolean') {
    if (typeof value !== 'boolean' && typeof value !== 'undefined') {
      return null
    }

    return <BooleanProp schema={schema} value={value} />
  }

  if (schema.type === 'number') {
    if (typeof value !== 'number' && typeof value !== 'undefined') {
      return null
    }

    return <NumberProp schema={schema} value={value} />
  }

  if (schema.type === 'select') {
    if (
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'boolean' &&
      typeof value !== 'undefined'
    ) {
      return null
    }

    return <SelectProp schema={schema} value={value} />
  }

  if (schema.type === 'string') {
    if (typeof value !== 'string' && typeof value !== 'undefined') {
      return null
    }

    return <StringProp schema={schema} value={value} />
  }

  if (schema.type === 'text') {
    if (typeof value !== 'string' && typeof value !== 'undefined') {
      return null
    }

    return <TextProp schema={schema} value={value} />
  }

  return (
    <Text size={1} weight="semibold">
      Unknown property type:{' '}
      <code>
        {(schema as PropSchema).name}: {(schema as PropSchema).type}
      </code>
    </Text>
  )
}
