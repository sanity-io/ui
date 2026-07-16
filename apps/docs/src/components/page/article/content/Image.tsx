import {Box, Card, Text} from '@sanity/ui'
import {stegaClean} from 'next-sanity'

import {useApp} from '@/app/useApp'
import type {PortableTextValue} from '@/types'

export function Image(props: {data: Extract<PortableTextValue[number], {_type: 'image'}>}) {
  const {imageUrlBuilder} = useApp()
  const {alt, asset, caption} = props.data

  if (!asset) return null

  const src = imageUrlBuilder.image(asset).url()

  return (
    <Box as="figure" marginY={[4, 4, 5]}>
      <Card overflow="hidden" radius={2} shadow={1}>
        {/* oxlint-disable-next-line nextjs/no-img-element */}
        <img
          alt={stegaClean(alt) || undefined}
          src={src}
          style={{verticalAlign: 'top', width: '100%'}}
        />
      </Card>
      <Box marginTop={2}>
        <Text as="figcaption" muted size={1}>
          {caption}
        </Text>
      </Box>
    </Box>
  )
}
