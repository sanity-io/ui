import {Card} from '@sanity/ui'
import styled from 'styled-components'

const IFrame = styled.iframe`
  border: 0;
  width: 100%;
  display: block;
`

export function FigmaEmbed(props: any) {
  const {url} = props.node || {}

  if (!url) {
    return null
  }

  return (
    <Card marginY={[2, 2, 3, 4]} overflow="hidden" radius={1} shadow={1}>
      <IFrame
        height="450"
        width="800"
        src={`https://www.figma.com/embed?embed_host=sanity.ui/ui&amp;url=${url}`}
        allowFullScreen
      />
    </Card>
  )
}
