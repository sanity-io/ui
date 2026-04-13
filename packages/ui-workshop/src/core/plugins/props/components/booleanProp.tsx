import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import {vars} from '@sanity/ui/css'

import type {BooleanPropSchema} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function BooleanProp(props: {schema: BooleanPropSchema; value?: boolean}) {
  const {schema, value = false} = props
  const {setPropValue} = useProps()

  return (
    <Flex as="label" gap={3} style={{margin: `calc(0px - ${vars.space[1]}) 0`}}>
      <Checkbox
        checked={value}
        onChange={(event) => setPropValue(schema.name, event.currentTarget.checked)}
      />

      <Box paddingY={1}>
        <Text size={1} weight="semibold">
          {schema.name}
        </Text>
      </Box>
    </Flex>
  )
}
