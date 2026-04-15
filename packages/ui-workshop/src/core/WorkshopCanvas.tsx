import {Card, Container, Heading, Stack, Text, vars} from '@sanity/ui'
import {motion} from 'motion/react'
import {useState} from 'react'

import {VIEWPORT_OPTIONS} from './constants'
import {buildFrameUrl} from './helpers'
import {useWorkshop} from './useWorkshop'
import {iframe} from './WorkshopCanvas.css'

/** @internal */
export function WorkshopCanvas(props: {frameRef: React.Ref<HTMLIFrameElement>; hidden: boolean}) {
  const {frameRef, hidden} = props
  const {frameReady, frameUrl, path, payload, title, viewport, zoom} = useWorkshop()
  const viewportOption = VIEWPORT_OPTIONS.find((o) => o.name === viewport) ?? VIEWPORT_OPTIONS[0]
  const viewportW = viewportOption.rect.width
  const viewportH = viewportOption.rect.height

  const [initialFrameUrl] = useState(() =>
    buildFrameUrl({baseUrl: frameUrl, path, payload, viewport, zoom}),
  )

  const isAutoW = viewportW === 'auto'
  const isAutoH = viewportH === 'auto'
  const fixedW = typeof viewportW === 'number' ? viewportW : undefined
  const fixedH = typeof viewportH === 'number' ? viewportH : undefined

  return (
    <Card
      __unstable_pattern="halftone"
      display={hidden ? 'none' : 'grid'}
      flex={2}
      overflow="hidden"
      position="relative"
      style={{placeItems: 'center'}}
      tone="transparent"
    >
      {path === '/' && (
        <Container width={0}>
          <Stack gap={4} padding={4}>
            <Heading align="center" size={2}>
              {title}
            </Heading>
            <Text align="center" muted size={1}>
              Browse workshop stories in the navigator to the left.
            </Text>
          </Stack>
        </Container>
      )}

      {path !== '/' && (
        <motion.div
          animate={{scale: zoom}}
          style={{
            boxShadow: vars.shadow[1],
            width: isAutoW ? '100%' : fixedW,
            height: isAutoH ? '100%' : fixedH,
            maxWidth: '100%',
            maxHeight: '100%',
            transformOrigin: 'center center',
            willChange: 'transform',
            opacity: frameReady ? 1 : 0,
            pointerEvents: frameReady ? 'auto' : 'none',
          }}
          transition={{type: 'spring', stiffness: 260, damping: 30}}
        >
          <iframe ref={frameRef} className={iframe} src={initialFrameUrl} title="Workshop Canvas" />
        </motion.div>
      )}
    </Card>
  )
}
