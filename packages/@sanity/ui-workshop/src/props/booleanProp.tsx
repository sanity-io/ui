import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import React from 'react'
import {BooleanPropSchema} from '../types'
import {useScope} from '../useScope'

export function BooleanProp(props: {
  schema: BooleanPropSchema
  value?: boolean
}): React.ReactElement {
  const {schema, value} = props
  const {setPropValue} = useScope()

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
}
