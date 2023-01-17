import {EllipsisVerticalIcon, PublishIcon, TrashIcon} from '@sanity/icons'
import {useCallback, useEffect, useState} from 'react'
import {Box, Button, Card, Flex, Grid, Stack, Text, TextInput} from '../../../primitives'
import {LayerProvider, PortalProvider, useLayer} from '../../../utils'
import {Dialog, DialogCloseAction} from '../dialog'

function useActiveElement() {
  const [active, setActive] = useState<Element | null>(null)
  const handleFocus = useCallback(() => setActive(document.activeElement), [])

  useEffect(() => {
    document.addEventListener('focusin', handleFocus)

    return () => {
      document.removeEventListener('focusin', handleFocus)
    }
  }, [handleFocus])

  return active
}

function DialogButton(props: {portalElement: string}) {
  const {portalElement} = props
  const [open, setOpen] = useState<boolean>(false)
  const [dialogElement, setDialogElement] = useState<HTMLDivElement | null>(null)
  const {zIndex} = useLayer()

  const focusedElement = useActiveElement()
  const hasFocusWithin = dialogElement?.contains(focusedElement)
  const header = `Can be closed with Esc: ${hasFocusWithin ? '✅' : '❌'}`

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(
    (action: DialogCloseAction) => {
      if (hasFocusWithin && action === 'escape') {
        setOpen(false)
      }

      if (action == 'close-button') {
        setOpen(false)
      }
    },
    [hasFocusWithin]
  )

  return (
    <>
      {open && (
        <Dialog
          header={header}
          id=""
          onClose={handleClose}
          onOverlayClick={() => setOpen(false)}
          portal={portalElement}
          position="absolute"
          ref={setDialogElement}
          width={3}
        >
          <Box padding={4}>
            <Stack space={5}>
              <Stack space={2}>
                <Text size={1} weight="semibold">
                  This dialogs z-index is <code>{zIndex}</code>
                </Text>
                <TextInput padding={2} />
              </Stack>

              <Flex>
                <DialogButton portalElement={portalElement} />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}

      <Button text="Open dialog" onClick={handleOpen} mode="ghost" fontSize={1} padding={2} />
    </>
  )
}

interface PaneProps {
  children: React.ReactNode
  title: number | string
}

function Pane(props: PaneProps) {
  const {children, title} = props

  return (
    <Flex direction="column" height="fill">
      <Card padding={2} borderBottom sizing="border">
        <Flex align="center">
          <Box flex={1}>
            <Text size={1} weight="semibold">
              Pane {title}
            </Text>
          </Box>
          <Button icon={EllipsisVerticalIcon} mode="bleed" padding={2} fontSize={1} />
        </Flex>
      </Card>
      {children}
    </Flex>
  )
}

const PANES = [...Array(2).keys()].map((i) => i + 1)

export default function MultipleDialogStory() {
  const [portal1Element, setPortal1Element] = useState<HTMLDivElement | null>(null)
  const [portal2Element, setPortal2Element] = useState<HTMLDivElement | null>(null)

  return (
    <LayerProvider>
      <PortalProvider __unstable_elements={{portal1Element, portal2Element}}>
        <Flex direction="column" height="fill">
          <Grid columns={PANES.length} flex={1} sizing="border">
            {PANES.map((item) => (
              <Card key={item} height="fill" borderRight={item < PANES.length}>
                <Pane title={item}>
                  <Flex
                    align="center"
                    height="fill"
                    justify="center"
                    flex={1}
                    style={{position: 'relative'}}
                  >
                    <DialogButton portalElement={`portal${item}Element`} />

                    <>{item === 1 && <div ref={setPortal1Element} />}</>
                    <>{item === 2 && <div ref={setPortal2Element} />}</>
                  </Flex>
                </Pane>
              </Card>
            ))}
          </Grid>

          <Card borderTop padding={3}>
            <Flex>
              <Box flex={1} />

              <Flex gap={2}>
                <Button
                  text="Publish"
                  tone="positive"
                  fontSize={1}
                  mode="ghost"
                  icon={PublishIcon}
                />
                <Button text="Delete" tone="critical" fontSize={1} mode="ghost" icon={TrashIcon} />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </PortalProvider>
    </LayerProvider>
  )
}
