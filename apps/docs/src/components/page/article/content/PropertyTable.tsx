import {WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card, Code, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'

import {isArray} from '@/lib/common'
import {PropertyData, PropertyTableData} from '@/lib/data'
import {propertyBox} from './PropertyTable.css'

import {PlainContent} from '../PlainContent'

export function PropertyTable(props: {data: WrappedValue<PropertyTableData>}): ReactElement {
  const {properties, caption} = props.data

  return (
    <Box marginY={[2, 2, 3, 4]}>
      <Card radius={3} shadow={1}>
        {properties?.map((property) => (
          <Property key={property.name?.value} property={property} />
        ))}
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

function Property(props: {property: WrappedValue<PropertyData>}) {
  const {property} = props

  let tsType = property.name?.value

  if (!property.required?.value) tsType += '?'

  tsType += `: ${property.type?.value}`

  return (
    <Box className={propertyBox} padding={4}>
      <Stack gap={4}>
        <Code language="typescript" size={1}>
          {tsType}
        </Code>

        {isArray(property.description) && <PlainContent blocks={property.description} />}
      </Stack>
    </Box>
  )
}
