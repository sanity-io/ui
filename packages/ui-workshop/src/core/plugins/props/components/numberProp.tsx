import {Stack, Text, TextInput} from '@sanity/ui'
import {useState} from 'react'

import type {NumberPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function NumberProp(props: {schema: NumberPropSchema; value?: number}) {
  const {schema, value} = props
  const {setPropValue} = useProps()

  const [tempValue, setTempValue] = useState<string | undefined>(String(value))
  const parsedValue = Number(tempValue)

  return (
    <Stack gap={3}>
      <Text size={1} weight="medium">
        {schema.name}
      </Text>

      <TextInput
        customValidity={isNaN(parsedValue) ? 'Not a number' : undefined}
        fontSize={[2, 2, 1]}
        padding={2}
        value={tempValue ?? (typeof value === 'number' ? String(value) : '')}
        onChange={(event) => {
          const valueString = event.currentTarget.value

          setTempValue(valueString)

          const valueNumber = Number(valueString)

          if (isNaN(valueNumber)) {
            return
          }

          setPropValue(schema.name, valueNumber)
        }}
      />
    </Stack>
  )
}
