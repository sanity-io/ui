import {Stack, Text} from '@sanity/ui'

import {Prop} from './components/prop'
import {useProps} from './useProps'

/** @internal */
export function PropsInspector() {
  const {schemas, value} = useProps()

  return (
    <Stack gap={5} paddingX={4} paddingY={5}>
      {schemas.length === 0 && (
        <Text muted size={[2, 2, 1]}>
          No properties
        </Text>
      )}

      {schemas.map((schema, schemaIndex) => (
        <Prop key={schemaIndex} schema={schema} value={value[schema.name]} />
      ))}
    </Stack>
  )
}
