import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import {
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Inline,
  PortalProvider,
  Stack,
  Text,
} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'
import {useCallback, useState} from 'react'

import {
  CONTAINER_WIDTH_CONTROLS,
  POSITION_CONTROLS,
  RADIUS_CONTROLS,
  SHADOW_CONTROLS,
  SPACE_CONTROLS,
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
    cardRadius: RADIUS_CONTROLS,
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    position: POSITION_CONTROLS,
    shadow: SHADOW_CONTROLS,
    width: CONTAINER_WIDTH_CONTROLS,
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
          <div ref={setPortalElement} data-portal="" />
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
  render: function Default(props) {
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
  render: function OpenDialogWithButton(props) {
    const [open, setOpen] = useState(false)
    const onClose = useCallback(() => setOpen(false), [])
    const onOpen = useCallback(() => setOpen(true), [])

    return (
      <>
        <Button text="Open dialog" onClick={onOpen} />
        {open && (
          <Dialog
            animate
            {...props}
            footer={
              <Card padding={3} style={{textAlign: 'right'}}>
                <Inline>
                  <Button mode="bleed" text="Close" onClick={onClose} />
                </Inline>
              </Card>
            }
            open={open}
            onClose={onClose}
          />
        )}
      </>
    )
  },
}

export const DynamicContent: Story = {
  render: function DynamicContent(props) {
    const [numParagraphs, setNumParagraphs] = useState(1)

    return (
      <Dialog
        {...props}
        footer={
          <Flex gap={2} justify="flex-end" padding={3}>
            <Button
              text="Add paragraph"
              tone="primary"
              onClick={() => setNumParagraphs((prev) => prev + 1)}
            />
            <Button
              disabled={numParagraphs === 0}
              text="Remove paragraph"
              tone="critical"
              onClick={() => setNumParagraphs((prev) => (prev > 0 ? prev - 1 : 0))}
            />
          </Flex>
        }
      >
        <Stack gap={4} padding={4}>
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
  render: function Positioning(props) {
    return (
      <Box>
        <Stack gap={3} style={{padding: 'calc(100vh - 100px) 0 '}}>
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
  render: function DeleteDocumentDialog(props) {
    const [open, setOpen] = useState(true)
    const onClose = useCallback(() => setOpen(false), [])
    const onOpen = useCallback(() => setOpen(true), [])

    return (
      <>
        <Button text="Open dialog" onClick={onOpen} />
        {open && (
          <Dialog
            {...props}
            footer={
              <Flex gap={3} justify={'flex-end'} padding={3} width="fill">
                <Button mode="bleed" text="Cancel" tone="default" onClick={onClose} />
                <Button mode="default" text="Close" tone="critical" onClick={onClose} />
              </Flex>
            }
            header="Delete document"
            open={open}
            padding={3}
            onClose={onClose}
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
