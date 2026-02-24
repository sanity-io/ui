import {Box, Text, TextArea} from '@sanity/ui'

import type {TextPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function TextProp(props: {schema: TextPropSchema; value?: string}) {
  const {schema, value = ''} = props
  const {setPropValue} = useProps()

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <TextArea
          fontSize={[2, 2, 1]}
          rows={4}
          value={value || ''}
          onChange={(event) => setPropValue(schema.name, event.currentTarget.value)}
        />
      </Box>
    </Box>
  )
}
