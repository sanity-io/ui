import {Box, Text, TextArea} from '@sanity/ui'
import {memo} from 'react'
import {TextPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export const TextProp = memo(function TextProp(props: {
  schema: TextPropSchema
  value?: string
}): React.ReactElement {
  const {schema, value} = props
  const {setPropValue} = useProps()

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <TextArea
          onChange={(event) => setPropValue(schema.name, event.currentTarget.value)}
          rows={4}
          value={value || ''}
        />
      </Box>
    </Box>
  )
})
