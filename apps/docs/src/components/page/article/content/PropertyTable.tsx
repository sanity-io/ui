'use client'

import {Badge, Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {Code} from '@sanity/ui/code'
import {ReactElement, ReactNode} from 'react'
import {styled} from 'styled-components'

export interface Property {
  deprecated?: string
  description?: ReactNode
  name: string
  required?: boolean
  type: string
}

export function PropertyTable(props: {caption?: string; properties: Property[]}): ReactElement {
  const {caption, properties} = props

  return (
    <Box marginY={[2, 2, 3, 4]}>
      <Card radius={2} shadow={1}>
        {properties.map((property) => (
          <PropertyRow key={property.name} property={property} />
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

function PropertyRow(props: {property: Property}) {
  const {deprecated, description, name, required, type} = props.property

  let tsType = name

  if (!required) tsType += '?'

  tsType += `: ${type}`

  return (
    <PropertyBox padding={3}>
      <Stack gap={3}>
        <Flex align="center" gap={2} wrap="wrap">
          <Code language="typescript" size={1}>
            {tsType}
          </Code>

          {deprecated && (
            <Badge fontSize={0} tone="caution">
              deprecated
            </Badge>
          )}
        </Flex>

        {deprecated && (
          <Text muted size={1}>
            {deprecated}
          </Text>
        )}

        {description}
      </Stack>
    </PropertyBox>
  )
}
