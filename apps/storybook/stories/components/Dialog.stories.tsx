import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import {
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Code,
  Dialog,
  DialogProps,
  DialogProvider,
  Flex,
  Inline,
  Layer,
  LayerProvider,
  Menu,
  MenuButton,
  MenuItem,
  PortalProvider,
  Stack,
  Text,
  useLayer,
} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'
import {ReactNode, useCallback, useEffect, useRef, useState} from 'react'
import {styled} from 'styled-components'

import {
  getContainerWidthControls,
  getPositionControls,
  getRadiusControls,
  getShadowControls,
  getSpaceControls,
} from '../controls'

const meta: Meta<typeof Dialog> = {
  args: {
    __unstable_autoFocus: false,
    children: (
      <Box padding={4}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
          hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi
          imperdiet quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis,
          ex quam luctus felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at
          rhoncus a, tempus vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Sed id mauris quam. Nam finibus sapien non lacinia
          ultricies. Integer fermentum tortor at pellentesque faucibus. In venenatis commodo
          placerat. Curabitur commodo tortor libero, vel pellentesque elit luctus sodales. Donec
          mattis tristique nunc ac lacinia. Vestibulum non pulvinar turpis, posuere consequat arcu.
          Fusce ut urna blandit, finibus nisi a, molestie elit. Nulla sed eleifend mi.
        </Text>
      </Box>
    ),
    footer: (
      <Card padding={4}>
        <Inline>
          <Text size={1} weight="medium">
            Dialog footer
          </Text>
        </Inline>
      </Card>
    ),
    header: 'Dialog header',
  },
  argTypes: {
    cardRadius: getRadiusControls(),
    cardShadow: getShadowControls(),
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    position: getPositionControls(),
    width: getContainerWidthControls(),
  },
  component: Dialog,
  decorators: [
    (Story: StoryFn): React.JSX.Element => {
      const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
      const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

      return (
        <Card ref={setBoundaryElement}>
          <BoundaryElementProvider element={boundaryElement}>
            <PortalProvider element={portalElement}>
              {/* @ts-expect-error fix later */}
              <Story />
            </PortalProvider>
          </BoundaryElementProvider>
          <div data-portal="" ref={setPortalElement} />
        </Card>
      )
    },
  ],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: (props) => {
    return <Dialog {...props} />
  },
}

export const WithoutClose: Story = {
  args: {
    __unstable_hideCloseButton: true,
  },
  render: (props) => {
    return <Dialog {...props} />
  },
}

export const OpenDialogWithButton: Story = {
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [open, setOpen] = useState(false)
    // oxlint-disable-next-line rules-of-hooks
    const onClose = useCallback(() => setOpen(false), [])
    // oxlint-disable-next-line rules-of-hooks
    const onOpen = useCallback(() => setOpen(true), [])

    return (
      <>
        <Button onClick={onOpen} text="Open dialog" />
        {open && (
          <Dialog
            animate
            {...props}
            onClose={onClose}
            footer={
              <Card padding={3} style={{textAlign: 'right'}}>
                <Inline>
                  <Button onClick={onClose} mode="bleed" text="Close" />
                </Inline>
              </Card>
            }
            open={open}
          />
        )}
      </>
    )
  },
}

export const DynamicContent: Story = {
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [numParagraphs, setNumParagraphs] = useState(1)

    return (
      <Dialog
        {...props}
        footer={
          <Flex gap={2} justify="flex-end" padding={3}>
            <Button
              onClick={() => setNumParagraphs((prev) => prev + 1)}
              text="Add paragraph"
              tone="primary"
            />
            <Button
              disabled={numParagraphs === 0}
              onClick={() => setNumParagraphs((prev) => (prev > 0 ? prev - 1 : 0))}
              text="Remove paragraph"
              tone="critical"
            />
          </Flex>
        }
      >
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack padding={4} space={4}>
          {numParagraphs === 0 && (
            <Text muted size={1}>
              (No content)
            </Text>
          )}
          {/* oxlint-disable-next-line no-new-array */}
          {[...new Array(numParagraphs).fill(undefined)].map((_, index) => (
            // oxlint-disable-next-line no-array-index-key
            <Text key={index}>
              Paragraph {index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque at nisl at sem tempor hendrerit scelerisque ut libero. Maecenas iaculis
              efficitur lorem, ac faucibus mi imperdiet quis. Cras a consectetur erat. Fusce
              imperdiet, dolor et pellentesque iaculis, ex quam luctus felis, non ultrices enim sem
              vitae quam. Duis lorem velit, lacinia at rhoncus a, tempus vel neque. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed id mauris
              quam. Nam finibus sapien non lacinia ultricies. Integer fermentum tortor at
              pellentesque faucibus. In venenatis commodo placerat. Curabitur commodo tortor libero,
              vel pellentesque elit luctus sodales. Donec mattis tristique nunc ac lacinia.
              Vestibulum non pulvinar turpis, posuere consequat arcu. Fusce ut urna blandit, finibus
              nisi a, molestie elit. Nulla sed eleifend mi.
            </Text>
          ))}
        </Stack>
      </Dialog>
    )
  },
}

export const Positioning: Story = {
  args: {
    children: null,
    footer: null,
  },
  render: (props) => {
    return (
      <Box>
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={3} style={{padding: 'calc(100vh - 100px) 0 '}}>
          <Text align="center">
            <ArrowUpIcon />
          </Text>
          <Text align="center">Scrollable</Text>
          <Text align="center">
            <ArrowDownIcon />
          </Text>
        </Stack>
        <Dialog {...props} />
      </Box>
    )
  },
}

export const DeleteDocumentDialog: Story = {
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [open, setOpen] = useState(true)
    // oxlint-disable-next-line rules-of-hooks
    const onClose = useCallback(() => setOpen(false), [])
    // oxlint-disable-next-line rules-of-hooks
    const onOpen = useCallback(() => setOpen(true), [])

    return (
      <>
        <Button onClick={onOpen} text="Open dialog" />
        {open && (
          <Dialog
            {...props}
            onClose={onClose}
            header="Delete document"
            padding={3}
            footer={
              <Flex gap={3} justify={'flex-end'} padding={3}>
                <Button onClick={onClose} mode="bleed" text="Cancel" tone="default" />
                <Button onClick={onClose} mode="default" text="Close" tone="critical" />
              </Flex>
            }
            open={open}
          >
            <Box padding={4}>
              <Text size={1}>Are you sure you want to delete “Untitled”?</Text>
            </Box>
          </Dialog>
        )}
      </>
    )
  },
}

function PropsStory() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Button
          id="open-dialog-button"
          onClick={() => setOpen(true)}
          ref={buttonRef}
          text="Open dialog"
        />

        {open && (
          <Dialog header="Props example" id="dialog" onClose={handleClose} open={open} width={0}>
            <Box padding={4}>
              {/* oxlint-disable-next-line no-deprecated */}
              <Stack space={4}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vitae diam
                  aliquet imperdiet.
                </Text>
                <Button id="button-1" text="Focus test" />
                <Text>
                  Sed in hendrerit metus. Sed sapien neque, imperdiet eu justo sed, vestibulum
                  mollis dolor.
                </Text>
                <Button id="button-2" text="Focus test" />
                <Text>
                  Nulla sit amet ipsum ligula. Duis sit amet velit tempor, ultricies mauris
                  dignissim, mollis enim.
                </Text>
                <Button id="button-3" text="Focus test" />
                <Text>Cras quis elit non mauris faucibus molestie non non augue. </Text>
                <Text>
                  Proin suscipit gravida sodales. Morbi vel purus molestie, rhoncus augue sit amet,
                  auctor justo.
                </Text>
                <Button id="button-4" text="Focus test" />
                <Text>Proin lobortis nunc a tellus condimentum, a ultrices arcu egestas.</Text>
                <Button id="button-5" text="Focus test" />
                <Text>
                  Suspendisse augue nibh, euismod sit amet sapien nec, molestie dignissim magna.
                </Text>
              </Stack>
            </Box>
          </Dialog>
        )}
      </Box>
    </LayerProvider>
  )
}

export const Props: Story = {
  parameters: {controls: {include: []}},
  render: () => <PropsStory />,
}

function ActivateStory() {
  const [firstDialogOpen, setFirstDialogOpen] = useState<boolean>(false)
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)
  const [thirdDialogOpen, setThirdDialogOpen] = useState<boolean>(false)
  const [fourthDialogOpen, setFourthDialogOpen] = useState<boolean>(false)

  return (
    <LayerProvider>
      <Flex align="center" height="fill" justify="center">
        <Layer onActivate={({activeElement}) => activeElement?.focus()}>
          <Button
            text="Open dialog 1"
            onClick={() => setFirstDialogOpen(true)}
            id="open-dialog-1-button"
          />

          {firstDialogOpen && (
            <Dialog
              header="Dialog 1"
              id="1"
              onActivate={({activeElement}) => activeElement?.focus()}
              onClose={() => setFirstDialogOpen(false)}
            >
              {/* oxlint-disable-next-line no-deprecated */}
              <Stack space={2} padding={3}>
                <Button
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                  id="open-dialog-2-button-1"
                />
                <Button
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                  id="open-dialog-2-button-2"
                />
                <Button
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                  id="open-dialog-2-button-3"
                />
              </Stack>

              {secondDialogOpen && (
                <Dialog
                  header="Dialog 2"
                  id="2"
                  onActivate={({activeElement}) => activeElement?.focus()}
                  onClose={() => setSecondDialogOpen(false)}
                >
                  {/* oxlint-disable-next-line no-deprecated */}
                  <Stack space={2} padding={3}>
                    <Button
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                      id="open-dialog-3-button-1"
                    />
                    <Button
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                      id="open-dialog-3-button-2"
                    />
                    <Button
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                      id="open-dialog-3-button-3"
                    />
                  </Stack>

                  {thirdDialogOpen && (
                    <Dialog
                      header="Dialog 3"
                      id="3"
                      onActivate={({activeElement}) => activeElement?.focus()}
                      onClose={() => setThirdDialogOpen(false)}
                    >
                      {/* oxlint-disable-next-line no-deprecated */}
                      <Stack space={2} padding={3}>
                        <MenuButton
                          id="menu"
                          button={
                            <Button mode="ghost" text="Open menu" id="open-dialog-4-menu-button" />
                          }
                          menu={
                            <Menu>
                              <MenuItem
                                text="Open dialog 4"
                                onClick={() => setFourthDialogOpen(true)}
                              />
                              <MenuItem
                                text="Open dialog 4"
                                onClick={() => setFourthDialogOpen(true)}
                              />
                              <MenuItem
                                text="Open dialog 4"
                                onClick={() => setFourthDialogOpen(true)}
                              />
                            </Menu>
                          }
                        />
                      </Stack>

                      {fourthDialogOpen && (
                        <Dialog
                          header="Dialog 4"
                          id="4"
                          onActivate={({activeElement}) => activeElement?.focus()}
                          onClose={() => setFourthDialogOpen(false)}
                        >
                          {/* oxlint-disable-next-line no-deprecated */}
                          <Stack space={2} padding={3}>
                            <Text>👋</Text>
                          </Stack>
                        </Dialog>
                      )}
                    </Dialog>
                  )}
                </Dialog>
              )}
            </Dialog>
          )}
        </Layer>
      </Flex>
    </LayerProvider>
  )
}

export const Activate: Story = {
  parameters: {controls: {include: []}},
  render: () => <ActivateStory />,
}

function NestedStory() {
  const [open1] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const dialog2Button = useRef<HTMLButtonElement>(null)
  const dialog3Button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open2) dialog2Button.current?.focus()
  }, [open2])

  useEffect(() => {
    if (!open3) dialog3Button.current?.focus()
  }, [open3])

  return (
    <LayerProvider>
      {open1 && (
        <Dialog animate cardShadow={1} header="Dialog 1" id="dialog1">
          <Box padding={4}>
            <Button onClick={() => setOpen2(true)} ref={dialog2Button} text="Open Dialog 2" />
          </Box>

          {open2 && (
            <Dialog
              animate
              cardShadow={2}
              header="Dialog 2"
              id="dialog2"
              onClose={() => setOpen2(false)}
              onClickOutside={() => setOpen2(false)}
            >
              <Box padding={4}>
                <Button onClick={() => setOpen3(true)} ref={dialog3Button} text="Open Dialog 3" />
              </Box>

              {open3 && (
                <Dialog
                  animate
                  cardShadow={4}
                  header="Dialog 3"
                  id="dialog3"
                  onClose={() => setOpen3(false)}
                  onClickOutside={() => setOpen3(false)}
                >
                  <Box padding={4}>
                    <MenuButton
                      button={<Button text="Test" />}
                      id="menu3"
                      popover={{animate: true}}
                      menu={
                        <Menu>
                          <MenuItem text="Test" />
                          <MenuItem text="Test" />
                        </Menu>
                      }
                      // oxlint-disable-next-line no-deprecated
                      portal
                    />
                  </Box>
                </Dialog>
              )}
            </Dialog>
          )}
        </Dialog>
      )}
    </LayerProvider>
  )
}

export const Nested: Story = {
  parameters: {controls: {include: []}},
  render: () => <NestedStory />,
}

function OnScrollStory({onScroll}: {onScroll: () => void}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current

    if (!el) return

    el.addEventListener('scroll', onScroll, {passive: true})

    // oxlint-disable-next-line consistent-return
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <LayerProvider>
      <Dialog contentRef={ref} header="On scroll example" id="on-scroll-example">
        <Box padding={4}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
            hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi
            imperdiet quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis,
            ex quam luctus felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at
            rhoncus a, tempus vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Sed id mauris quam. Nam finibus sapien non lacinia
            ultricies. Integer fermentum tortor at pellentesque faucibus. In venenatis commodo
            placerat. Curabitur commodo tortor libero, vel pellentesque elit luctus sodales. Donec
            mattis tristique nunc ac lacinia. Vestibulum non pulvinar turpis, posuere consequat
            arcu. Fusce ut urna blandit, finibus nisi a, molestie elit. Nulla sed eleifend mi.
          </Text>
        </Box>
      </Dialog>
    </LayerProvider>
  )
}

export const OnScroll: Story = {
  parameters: {controls: {include: []}},
  render: () => <OnScrollStory onScroll={fn()} />,
}

function DebugLayer() {
  const layer = useLayer()

  return (
    <Code language="json" size={1}>
      {JSON.stringify(layer, null, 2)}
    </Code>
  )
}

export const Layering: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      <LayerProvider>
        <Layer zOffset={10} id="a">
          <Card padding={2} shadow={2}>
            <DebugLayer />
          </Card>
        </Layer>
        <Layer zOffset={10} id="b">
          <Card padding={2} shadow={2}>
            <DebugLayer />
          </Card>
        </Layer>
        <Dialog header="Layering example" id="layering-example" onClose={fn()} zOffset={100}>
          <Box padding={4}>
            <DebugLayer />
          </Box>
        </Dialog>
      </LayerProvider>
    </Box>
  ),
}

function AutoFocusStory() {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <Box padding={4}>
        <Button onClick={() => setOpen(true)} text="Open dialog" />
      </Box>
    )
  }

  return (
    <Dialog
      __unstable_autoFocus
      header="Auto-focus example"
      id="auto-focus-example"
      onClose={() => setOpen(false)}
    >
      <Box padding={4}>
        <Button text="Focusable button" />
      </Box>
    </Dialog>
  )
}

export const AutoFocus: Story = {
  parameters: {controls: {include: []}},
  render: () => <AutoFocusStory />,
}

export const Position: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={4}>
      <Box style={{padding: 'calc(100vh - 100px) 0'}}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={3}>
          <Text align="center">
            <ArrowUpIcon />
          </Text>
          <Text align="center">Scrollable</Text>
          <Text align="center">
            <ArrowDownIcon />
          </Text>
        </Stack>

        <LayerProvider>
          <Dialog header="Position example" id="position-example" position="fixed" />
        </LayerProvider>
      </Box>
    </Box>
  ),
}

const PaneRoot = styled(Card)`
  position: relative;
`

const PanePortal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`

function Pane(props: {borderLeft?: boolean; id: string}) {
  const {borderLeft, id} = props
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  return (
    <BoundaryElementProvider element={element}>
      <PortalProvider element={portalElement}>
        <PaneRoot borderLeft={borderLeft} flex={1} ref={setElement}>
          <Box padding={4}>
            <Button onClick={() => setDialogOpen(true)} selected={dialogOpen} text="Open dialog" />
          </Box>

          <PanePortal ref={setPortalElement} />
        </PaneRoot>

        {dialogOpen && (
          <Dialog
            header={`Dialog ${id}`}
            id={id}
            onClickOutside={handleClose}
            onClose={handleClose}
            position="absolute"
          >
            <Box padding={4}>
              <MenuButton
                button={<Button text="Open menu" />}
                id={`${id}-menu`}
                menu={
                  <Menu>
                    <MenuItem text="Item 1" />
                    <MenuItem text="Item 2" />
                    <MenuItem text="Item 3" />
                  </Menu>
                }
              />
            </Box>
          </Dialog>
        )}
      </PortalProvider>
    </BoundaryElementProvider>
  )
}

export const Panes: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex height="fill">
      <Pane id="A" />
      <Pane id="B" borderLeft />
    </Flex>
  ),
}

export const WithDialogProvider: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <DialogProvider position="absolute" zOffset={1000}>
      <Dialog header="Outer" id="provider-example">
        <Dialog header="Inner" id="nested-provider-example" />
      </Dialog>
    </DialogProvider>
  ),
}

function WrappedDialogButton(props: {level: number}) {
  const {level} = props
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button onClick={() => setOpen(true)} ref={buttonRef} text={`Open dialog ${level + 1}`} />

      {open && (
        <WrappedDialog
          header={`WrappedDialog ${level + 1}`}
          id={`wrapped-${level + 1}`}
          onClickOutside={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          <Box padding={4}>
            <WrappedDialogButton level={level + 1} />
          </Box>
        </WrappedDialog>
      )}
    </>
  )
}

function WrappedDialog(props: DialogProps & {children?: ReactNode}) {
  const layer = useLayer()
  const isTopLayer = layer.size === 1

  const dialogRef = useRef<HTMLDivElement>(null)

  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null)

  const handleContentFocus = useCallback(() => {
    const containsActiveElement = dialogRef.current?.contains(document.activeElement)

    if (containsActiveElement) {
      // oxlint-disable-next-line no-unsafe-type-assertion
      setLastFocusedElement(document.activeElement as HTMLElement)
    }
  }, [])

  // Set focus on the last focused element when the dialog becomes the top layer.
  useEffect(() => {
    if (isTopLayer && lastFocusedElement) {
      lastFocusedElement.focus()
    }
  }, [isTopLayer, lastFocusedElement])

  return <Dialog {...props} data-size={layer.size} onFocus={handleContentFocus} ref={dialogRef} />
}

export const Wrapped: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <LayerProvider zOffset={100}>
      <Box padding={4}>
        <WrappedDialogButton level={0} />
      </Box>
    </LayerProvider>
  ),
}
