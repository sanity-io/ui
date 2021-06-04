import {Box, Select, Text} from '@sanity/ui'
import React, {useMemo} from 'react'
import {SelectPropSchema} from '../types'
import {useScope} from '../useScope'

export function SelectProp(props: {schema: SelectPropSchema; value: any}): React.ReactElement {
  const {schema, value: valueProp} = props
  const {setPropValue} = useScope()

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
          fontSize={1}
          onChange={(event) => {
            const optionKey = event.currentTarget.value
            const optionValue = schema.options[optionKey as any]

            setPropValue(schema.name, optionValue)
          }}
          padding={2}
          radius={2}
          value={String(value || '')}
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
