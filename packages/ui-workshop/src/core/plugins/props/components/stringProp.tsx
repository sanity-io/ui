import {Stack, Text, TextInput} from '@sanity/ui'

import type {StringPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function StringProp(props: {schema: StringPropSchema; value?: string}) {
  const {schema, value = ''} = props
  const {setPropValue} = useProps()

  return (
    <Stack gap={3}>
      <Text size={1} weight="medium">
        {schema.name}
      </Text>

      <TextInput
        fontSize={[2, 2, 1]}
        padding={2}
        // radius={3}
        value={value}
        onChange={(event) => setPropValue(schema.name, event.currentTarget.value)}
      />
    </Stack>
  )
}
