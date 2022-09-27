import {WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card, Code, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import styled from 'styled-components'

import {isArray} from '@/lib/common'
import {PropertyData, PropertyTableData} from '@/lib/data'

import {PlainContent} from '../PlainContent'

export function PropertyTable(props: {data: WrappedValue<PropertyTableData>}): ReactElement {
  const {properties, caption} = props.data

  return (
    <Box marginY={[2, 2, 3, 4]}>
      <Card radius={2} shadow={1}>
        {properties?.map((property) => <Property key={property.name?.value} property={property} />)}
      </Card>

      {caption?.value && (
        <Box marginTop={[3, 3, 4, 5]}>
          <Text muted size={1}>
            {caption?.value}
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

function Property(props: {property: WrappedValue<PropertyData>}) {
  const {property} = props

  let tsType = property.name?.value

  if (!property.required?.value) tsType += '?'

  tsType += `: ${property.type?.value}`

  return (
    <PropertyBox padding={3}>
      <Stack space={3}>
        <Code language="typescript" muted size={1}>
          {tsType}
        </Code>

        {isArray(property.description) && <PlainContent blocks={property.description} />}
      </Stack>
    </PropertyBox>
  )
}
