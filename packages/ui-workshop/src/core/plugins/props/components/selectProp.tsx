import {Select, Stack, Text} from '@sanity/ui'
import {useMemo} from 'react'

import {isArray} from '../../../lib/isArray'
import type {SelectPropSchema, SelectPropValue} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function SelectProp(props: {schema: SelectPropSchema; value: SelectPropValue}) {
  const {schema, value} = props
  const {setPropValue} = useProps()

  const options: {key: string; stringValue: string; value: SelectPropValue}[] = useMemo(() => {
    if (isArray(schema.options)) {
      return schema.options.map((option) => ({
        key: String(option ?? ''),
        stringValue: String(option ?? ''),
        value: option,
      }))
    }

    return Object.entries(schema.options).map(([key, value]) => ({
      key,
      stringValue: String(value ?? ''),
      value,
    }))
  }, [schema.options])

  return (
    <Stack gap={3}>
      <Text size={1} weight="medium">
        {schema.name}
      </Text>

      <Select
        fontSize={[2, 2, 1]}
        padding={2}
        value={String(value ?? '')}
        onChange={(event) => {
          const option = options.find(({stringValue}) => stringValue === event.currentTarget.value)

          setPropValue(schema.name, option?.value)
        }}
      >
        {options.map(({key, stringValue}) => (
          <option key={key} value={stringValue}>
            {stringValue === '' ? '(undefined)' : key}
          </option>
        ))}
      </Select>
    </Stack>
  )
}
