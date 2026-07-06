import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'
import {useCallback, useRef, useState} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'

import {Dialog, Menu, MenuButton, MenuItem} from '../../../../packages/ui/src/core/components'
import {
  Box,
  Button,
  Card,
  Flex,
  Inline,
  Stack,
  Text,
} from '../../../../packages/ui/src/core/primitives'
import {
  BoundaryElementProvider,
  Layer,
  LayerProvider,
  PortalProvider,
} from '../../../../packages/ui/src/core/utils'
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
    const [open, setOpen] = useState(false)
    const onClose = useCallback(() => setOpen(false), [])
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
        <Stack padding={4} space={4}>
          {numParagraphs === 0 && (
            <Text muted size={1}>
              (No content)
            </Text>
          )}
          {[...new Array(numParagraphs).fill(undefined)].map((_, index) => (
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
    const [open, setOpen] = useState(true)
    const onClose = useCallback(() => setOpen(false), [])
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
              <Flex width="full" gap={3} justify={'flex-end'} padding={3}>
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
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument
    const el = (id: string) => doc.getElementById(id)
    const closeButton = () =>
      doc.querySelector<HTMLButtonElement>('#dialog button[aria-label="Close dialog"]')

    await step('should open dialog', async () => {
      await userEvent.click(el('open-dialog-button')!)
      await waitFor(() => expect(el('dialog')).toBeVisible())
    })

    await step('should trap focus', async () => {
      // The close button should be focused when the dialog opens
      await waitFor(() => expect(closeButton()).toHaveFocus())

      // Tab to next until the focus is back at the top
      await userEvent.tab()
      await waitFor(() => expect(el('button-1')).toHaveFocus())
      await userEvent.tab()
      await waitFor(() => expect(el('button-2')).toHaveFocus())
      await userEvent.tab()
      await waitFor(() => expect(el('button-3')).toHaveFocus())
      await userEvent.tab()
      await waitFor(() => expect(el('button-4')).toHaveFocus())
      await userEvent.tab()
      await waitFor(() => expect(el('button-5')).toHaveFocus())
      await userEvent.tab()
      await waitFor(() => expect(closeButton()).toHaveFocus())
      await userEvent.tab()

      // The first button should again be focused
      await waitFor(() => expect(el('button-1')).toHaveFocus())
    })
  },
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
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument
    const el = (id: string) => doc.getElementById(id)

    await step('should focus last focused element when dialog becomes top layer', async () => {
      // Open the nested dialogs
      await userEvent.click(el('open-dialog-1-button')!)
      await waitFor(() => expect(el('open-dialog-2-button-2')).toBeVisible())
      await userEvent.click(el('open-dialog-2-button-2')!)
      await waitFor(() => expect(el('open-dialog-3-button-3')).toBeVisible())
      await userEvent.click(el('open-dialog-3-button-3')!)

      // Close dialogs and check if the last focused element is focused
      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(el('open-dialog-3-button-3')).toHaveFocus())

      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(el('open-dialog-2-button-2')).toHaveFocus())

      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(el('open-dialog-1-button')).toHaveFocus())
    })
  },
}
