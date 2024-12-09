/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box, Select, Text} from '@sanity/ui'
import {memo, useMemo} from 'react'

import {SelectPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export const SelectProp = memo(function SelectProp(props: {
  schema: SelectPropSchema
  value: any
}): React.ReactNode {
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
})
