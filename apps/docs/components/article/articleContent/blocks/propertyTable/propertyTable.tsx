import {Box, Card, Code, Stack, Text} from '@sanity/ui'
import styled from 'styled-components'
import {PropertyDescription} from './propertyDescription'

interface PropertyType {
  name?: string
  type?: string
  required?: boolean
  description?: string
}

interface PropertyTableProps {
  caption?: string
  properties: PropertyType[]
}

export function PropertyTable({caption, properties}: PropertyTableProps) {
  return (
    <Box marginY={[2, 2, 3, 4]}>
      <Card radius={2} shadow={1}>
        {properties.map((property) => (
          <Property key={property.name} {...property} />
        ))}
      </Card>

      {caption && (
        <Box marginTop={[3, 3, 4, 5]}>
          <Text muted size={1}>
            {caption}
          </Text>
        </Box>
      )}
    </Box>
  )
}

const PropertyBox = styled(Box)`
  overflow: auto;

  & + & {
    border-top: 1px solid var(--card-hairline-soft-color);
  }
`

function Property(props: PropertyType) {
  let tsType = props.name

  if (!props.required) tsType += '?'

  tsType += `: ${props.type}`

  return (
    <PropertyBox padding={[3, 3, 4]}>
      <Stack space={[3, 3, 3, 4]}>
        <Code language="typescript" muted>
          {tsType}
        </Code>

        {Array.isArray(props.description) && (
          <Text muted size={[1, 1, 2]}>
            <PropertyDescription blocks={props.description} />
          </Text>
        )}
      </Stack>
    </PropertyBox>
  )
}
