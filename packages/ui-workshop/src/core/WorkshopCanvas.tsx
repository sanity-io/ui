import {BoxDisplay, Card, Container, Flex, Heading, Spinner, Stack, Text} from '@sanity/ui'
import {memo, useMemo, useState} from 'react'
import {styled} from 'styled-components'

import {VIEWPORT_OPTIONS} from './constants'
import {buildFrameUrl} from './helpers'
import {useWorkshop} from './useWorkshop'

const Frame = styled.iframe`
  display: block;
  border: 0;
  height: 100%;
  width: 100%;
`

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

  const containerStyle = useMemo(
    () => ({
      maxWidth: viewportW === 'auto' ? undefined : `${(viewportW || 1) * zoom}px`,
      maxHeight: viewportH ? `${(viewportH || 1) * zoom}px` : undefined,
    }),
    [viewportW, viewportH, zoom],
  )

  const display: BoxDisplay = useMemo(() => (hidden ? 'none' : 'block'), [hidden])

  const frameStyle = useMemo(
    () => ({
      transform: `scale(${zoom})`,
      transformOrigin: '0 0',
      width: `${100 / zoom}%`,
      height: `${100 / zoom}%`,
    }),
    [zoom],
  )

  return (
    <Card display={display} flex={1} overflow="hidden" tone="transparent">
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
          height="fill"
          hidden={!frameReady || path === '/'}
          style={containerStyle}
          width="auto"
        >
          <Card height="fill" shadow={1}>
            <Frame ref={frameRef} src={initialFrameUrl} style={frameStyle} />
          </Card>
        </Container>
      </Flex>
    </Card>
  )
})
