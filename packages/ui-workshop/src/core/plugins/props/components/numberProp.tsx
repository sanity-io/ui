import {Box, Text, TextInput} from '@sanity/ui'
import {useState} from 'react'

import type {NumberPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function NumberProp(props: {schema: NumberPropSchema; value?: number}) {
  const {schema, value} = props
  const {setPropValue} = useProps()

  const [tempValue, setTempValue] = useState<string | undefined>(
    typeof value === 'number' ? String(value) : undefined,
  )

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <TextInput
          customValidity={tempValue === undefined ? undefined : 'Not a number'}
          fontSize={[2, 2, 1]}
          padding={2}
          value={tempValue ?? (typeof value === 'number' ? String(value) : '')}
          onChange={(event) => {
            const valueString = event.currentTarget.value

            const valueNumber = Number(valueString)

            if (isNaN(valueNumber)) {
              setPropValue(schema.name, undefined)
              setTempValue(valueString)
              return
            }

            setPropValue(schema.name, valueNumber)
            setTempValue(undefined)
          }}
        />
      </Box>
    </Box>
  )
}
