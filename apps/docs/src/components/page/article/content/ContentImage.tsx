import {Box, Card, Text} from '@sanity/ui'
import {ReactElement} from 'react'

import {basePath} from '@/constants'

export function ContentImage(props: {alt?: string; caption?: string; src: string}): ReactElement {
  const {alt, caption, src} = props

  return (
    <Box as="figure" marginY={[4, 4, 5]}>
      <Card overflow="hidden" radius={2} shadow={1}>
        {/* Plain `img` src attributes don't get the router basePath prefix */}
        {/* oxlint-disable-next-line nextjs/no-img-element */}
        <img alt={alt} src={`${basePath}${src}`} style={{verticalAlign: 'top', width: '100%'}} />
      </Card>
      <Box marginTop={2}>
        <Text as="figcaption" muted size={1}>
          {caption}
        </Text>
      </Box>
    </Box>
  )
}
