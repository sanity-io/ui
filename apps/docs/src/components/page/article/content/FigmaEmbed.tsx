import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Card} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

import {FigmaEmbedData} from '@/lib/data'

const IFrame = styled.iframe`
  border: 0;
  width: 100%;
  display: block;
`

export function FigmaEmbed(props: {data: WrappedValue<FigmaEmbedData>}) {
  const {url} = unwrapData(props.data)

  if (!url) return null

  return (
    <Card marginY={[2, 2, 3, 4]} overflow="hidden" radius={2} shadow={1}>
      <IFrame
        height="450"
        width="800"
        src={`https://www.figma.com/embed?embed_host=sanity.ui/ui&amp;url=${url}`}
        allowFullScreen
      />
    </Card>
  )
}
