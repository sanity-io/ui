import {Box, Text} from '@sanity/ui'
import {memo} from 'react'

import {Prop} from './components/prop'
import {useProps} from './useProps'

/** @internal */
export const PropsInspector = memo(function PropsInspector(): React.ReactElement {
  const {schemas, value} = useProps()

  return (
    <Box padding={2}>
      {schemas.length === 0 && (
        <Box padding={2}>
          <Text muted size={[2, 2, 1]}>
            No properties
          </Text>
        </Box>
      )}

      {schemas.length > 0 &&
        schemas.map((schema, schemaIndex) => (
          <Prop
            key={schemaIndex}
            schema={schema}
            value={value[schema.name] === undefined ? schema.defaultValue : value[schema.name]}
          />
        ))}
    </Box>
  )
})
