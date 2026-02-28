import {Stack, Text, TextArea} from '@sanity/ui'

import type {TextPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function TextProp(props: {schema: TextPropSchema; value?: string}) {
  const {schema, value = ''} = props
  const {setPropValue} = useProps()

  return (
    <Stack gap={3}>
      <Text size={1} weight="medium">
        {schema.name}
      </Text>

      <TextArea
        fontSize={[2, 2, 1]}
        rows={4}
        value={value}
        onChange={(event) => setPropValue(schema.name, event.currentTarget.value)}
      />
    </Stack>
  )
}
