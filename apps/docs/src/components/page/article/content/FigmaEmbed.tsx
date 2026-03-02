import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card} from '@sanity/ui'
import React from 'react'

import {FigmaEmbedData} from '@/lib/data'

export function FigmaEmbed(props: {data: WrappedValue<FigmaEmbedData>}) {
  const {url} = unwrapData(props.data)

  if (!url) return null

  return (
    <Card marginY={[2, 2, 3, 4]} overflow="hidden" radius={2} shadow={1}>
      <Box
        allowFullScreen
        as="iframe"
        src={`https://www.figma.com/embed?embed_host=sanity.ui/ui&amp;url=${url}`}
        style={{height: 800}}
      />
    </Card>
  )
}
