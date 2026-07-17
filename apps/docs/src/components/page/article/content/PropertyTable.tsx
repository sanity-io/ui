import {Badge, Box, Card, Code, Flex, Stack, Text} from '@sanity/ui'
import {stegaClean} from 'next-sanity'
import {ReactElement} from 'react'
import {styled} from 'styled-components'

import {isArray} from '@/lib/common'
import type {PortableTextValue} from '@/types'

import {PlainContent} from '../PlainContent'

type PropertyTableValue = Extract<PortableTextValue[number], {_type: 'propertyTable'}>

export function PropertyTable(props: {data: PropertyTableValue}): ReactElement {
  const {properties, caption} = props.data

  return (
    <Box marginY={[2, 2, 3, 4]}>
      <Card radius={2} shadow={1}>
        {properties?.map((property) => (
          <Property key={stegaClean(property.name)} property={property} />
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

type PropertyValue = NonNullable<PropertyTableValue['properties']>[number]
function Property(props: {property: PropertyValue}) {
  // The type signature is rendered as (copyable) code, so strip stega metadata
  const {name, required, type} = stegaClean(props.property)
  const {deprecated} = props.property

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

        {isArray(props.property.description) && (
          <PlainContent blocks={props.property.description} />
        )}
      </Stack>
    </PropertyBox>
  )
}
