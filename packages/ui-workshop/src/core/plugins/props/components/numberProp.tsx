import {Box, Text, TextInput} from '@sanity/ui'
import {memo} from 'react'
import {NumberPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export const NumberProp = memo(function NumberProp(props: {
  schema: NumberPropSchema
  value?: string
}): React.ReactElement {
  const {schema, value = ''} = props
  const {setPropValue} = useProps()

  return (
    <Box padding={3}>
      <Text size={1} weight="semibold">
        {schema.name}
      </Text>
      <Box marginTop={2}>
        <TextInput
          fontSize={[2, 2, 1]}
          onChange={(event) => setPropValue(schema.name, Number(event.currentTarget.value))}
          padding={2}
          value={value}
        />
      </Box>
    </Box>
  )
})
