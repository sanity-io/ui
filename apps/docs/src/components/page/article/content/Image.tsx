import {Box, Card, Text} from '@sanity/ui'
import {stegaClean} from 'next-sanity'

import {useApp} from '@/app/useApp'
import {ImageData} from '@/lib/data'

export function Image(props: {data: ImageData}) {
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
