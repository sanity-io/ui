import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card, Text} from '@sanity/ui'

import {useApp} from '@/app/useApp'
import {ImageData} from '@/lib/data'

export function Image(props: {data: WrappedValue<ImageData>}) {
  const {imageUrlBuilder} = useApp()
  const {alt, asset, caption} = unwrapData(props.data)

  if (!asset) return null

  const src = imageUrlBuilder.image(asset).url()

  return (
    <Box as="figure" marginY={[4, 4, 5]}>
      <Card overflow="hidden" radius={2} shadow={1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt || undefined} src={src} style={{verticalAlign: 'top', width: '100%'}} />
      </Card>
      <Box marginTop={2}>
        <Text
          // @ts-expect-error TODO - fix in `@sanity/ui`
          as="figcaption"
          muted
          size={1}
        >
          {caption}
        </Text>
      </Box>
    </Box>
  )
}
