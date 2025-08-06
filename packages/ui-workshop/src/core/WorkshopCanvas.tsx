import {Card, Container, Flex, Heading, Spinner, Stack, Text} from '@sanity/ui'
import {assignInlineVars} from '@vanilla-extract/dynamic'
import {memo, useState} from 'react'

import {
  iframe,
  iframeContainer,
  viewportMaxHeight,
  viewportMaxWidth,
  zoom as zoomVar,
} from '#styles'

import {VIEWPORT_OPTIONS} from './constants'
import {buildFrameUrl} from './helpers'
import {useWorkshop} from './useWorkshop'

/** @internal */
export const WorkshopCanvas = memo(function WorkshopCanvas(props: {
  frameRef: React.Ref<HTMLIFrameElement>
  hidden: boolean
}): React.ReactNode {
  const {frameRef, hidden} = props
  const {frameReady, frameUrl, path, payload, scheme, title, viewport, zoom} = useWorkshop()
  const viewportOption = VIEWPORT_OPTIONS.find((o) => o.name === viewport) || VIEWPORT_OPTIONS[0]
  const viewportW = viewportOption?.rect.width
  const viewportH = viewportOption?.rect.height

  const [initialFrameUrl] = useState(() =>
    buildFrameUrl({baseUrl: frameUrl, path, payload, scheme, viewport, zoom}),
  )

  return (
    <Card display={hidden ? 'none' : 'block'} flex={1} overflow="hidden" tone="transparent">
      <Flex align="center" height="fill" justify="center" sizing="border">
        {path === '/' && (
          <Container width={0}>
            <Stack padding={4} space={4}>
              <Heading align="center">{title}</Heading>
              <Text align="center" muted>
                Browse workshop stories in the navigator to the left.
              </Text>
            </Stack>
          </Container>
        )}

        {!frameReady && path !== '/' && <Spinner muted />}

        <Container
          className={iframeContainer}
          height="fill"
          hidden={!frameReady || path === '/'}
          style={assignInlineVars({
            [viewportMaxWidth]: viewportW === 'auto' ? undefined : `${viewportW}px`,
            [viewportMaxHeight]: viewportH ? `${viewportH}px` : undefined,
            [zoomVar]: `${zoom}`,
          })}
          width="auto"
        >
          <Card height="fill" shadow={1}>
            <iframe className={iframe} ref={frameRef} src={initialFrameUrl} />
          </Card>
        </Container>
      </Flex>
    </Card>
  )
})
