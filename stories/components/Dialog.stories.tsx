/* eslint-disable react-hooks/rules-of-hooks */
import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'
import {Dialog} from '../../src/components'
import {Box, Button, Card, Flex, Inline, Stack, Text} from '../../src/primitives'
import {BoundaryElementProvider, PortalProvider} from '../../src/utils'
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
    (Story: StoryFn): JSX.Element => {
      const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
      const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

      return (
        <Card ref={setBoundaryElement}>
          <BoundaryElementProvider element={boundaryElement}>
            <PortalProvider element={portalElement}>
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
            <Box paddingX={3}>
              <Box paddingX={3} paddingY={5}>
                <Text size={1}>Are you sure you want to delete “Untitled”?</Text>
              </Box>
            </Box>
          </Dialog>
        )}
      </>
    )
  },
}
