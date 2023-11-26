import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import {memo} from 'react'

import {BooleanPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export const BooleanProp = memo(function BooleanProp(props: {
  schema: BooleanPropSchema
  value?: boolean
}): React.ReactElement {
  const {schema, value} = props
  const {setPropValue} = useProps()

  return (
    <Flex as="label" padding={3}>
      <Box marginRight={2} style={{lineHeight: 0}}>
        <Checkbox
          checked={value || false}
          onChange={(event) => setPropValue(schema.name, event.currentTarget.checked)}
        />
      </Box>
      <Box paddingY={1}>
        <Text size={1} weight="semibold">
          {schema.name}
        </Text>
      </Box>
    </Flex>
  )
})
