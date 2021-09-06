import {Card, Container, Flex, Spinner} from '@sanity/ui'
import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWorkshop} from '../useWorkshop'
import {VIEWPORT_OPTIONS} from './constants'

const Iframe = styled.iframe`
  &:not([hidden]) {
    display: block;
  }
  border: 0;
  height: 100%;
  width: 100%;
`

export function WorkshopStoryCanvas(props: {
  frameRef: React.Ref<HTMLIFrameElement>
  ready: boolean
  scheme: 'light' | 'dark'
  viewport: string
  zoom: number
}): React.ReactElement {
  const {frameRef, ready, scheme, viewport, zoom} = props
  const {frameUrl, location, scope, story} = useWorkshop()
  const [currentFrameUrl] = useState(() => `${frameUrl}?path=${location.path}&scheme=${scheme}`)
  const v = VIEWPORT_OPTIONS.find((o) => o.name === viewport)

  const iframe = useMemo(
    () => (
      <Iframe
        hidden={!ready}
        ref={frameRef}
        src={currentFrameUrl}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: '0 0',
          width: `${100 / zoom}%`,
          height: `${100 / zoom}%`,
        }}
      />
    ),
    [currentFrameUrl, frameRef, ready, zoom]
  )

  return (
    <Flex direction="column" flex={3} overflow="hidden">
      <Card flex={1} padding={2} tone="transparent">
        <Flex align="center" height="fill" justify="center">
          <Container
            height="fill"
            hidden={!scope || !story}
            style={{
              maxWidth: v?.rect.width === 'auto' ? undefined : `${(v?.rect.width || 1) * zoom}px`,
              maxHeight: v?.rect.height ? `${(v?.rect.height || 1) * zoom}px` : undefined,
            }}
            width="auto"
          >
            <Card
              height="fill"
              overflow="hidden"
              shadow={ready ? 1 : undefined}
              tone={ready ? undefined : 'inherit'}
            >
              {!ready && (
                <Flex align="center" height="fill" justify="center">
                  <Spinner muted />
                </Flex>
              )}

              {iframe}
            </Card>
          </Container>
        </Flex>
      </Card>
    </Flex>
  )
}
