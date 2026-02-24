import {Box, Select, Text} from '@sanity/ui'
import {useMemo} from 'react'

import type {SelectPropSchema, SelectPropValue} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function SelectProp(props: {schema: SelectPropSchema; value: SelectPropValue}) {
  const {schema, value: valueProp} = props
  const {setPropValue} = useProps()

  const value = useMemo(() => {
    const entries = Object.entries(schema.options)

    for (const [k, v] of entries) {
      if (v === valueProp) {
        return k
      }
    }

    return ''
  }, [schema, valueProp])

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <Select
          fontSize={[2, 2, 1]}
          padding={2}
          radius={2}
          value={String(value || '')}
          onChange={(event) => {
            const optionKey = event.currentTarget.value as keyof typeof schema.options
            const optionValue = schema.options[optionKey]

            setPropValue(schema.name, optionValue)
          }}
        >
          {Object.entries(schema.options).map(([key]) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  )
}
