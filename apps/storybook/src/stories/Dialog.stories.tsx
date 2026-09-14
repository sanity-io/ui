import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'
import {Dialog as DialogV3} from 'ui3'

import {Box} from '../../../../packages/ui/src/components/box/Box'
import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Dialog} from '../../../../packages/ui/src/components/dialog/Dialog'
import {
  type DialogProps,
  dialogProps,
} from '../../../../packages/ui/src/components/dialog/dialog.props'
import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(dialogProps)

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  args: {
    header: 'Dialog heading',
    size: 0,
  },
  argTypes,
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Dialog"]',
    },
    performance: {
      component: Dialog,
      compareComponent: DialogV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

function LongBodyContent() {
  return (
    <VStack gap={3}>
      <Text>
        Sanity is a fully customizable all-code backend for all your content-driven websites and
        apps—their builders and creators.
      </Text>
      <Text>
        It provides the structured foundation, automation layer, and agentic context companies need
        to move faster, work smarter, and power every content experience—from websites to AI agents.
      </Text>
      <Text>
        Build a content system that matches how your business operates with three interconnected
        layers.
      </Text>
      <Text>
        Sanity is a fully customizable all-code backend for all your content-driven websites and
        apps—their builders and creators.
      </Text>
      <Text>
        It provides the structured foundation, automation layer, and agentic context companies need
        to move faster, work smarter, and power every content experience—from websites to AI agents.
      </Text>
      <Text>
        Build a content system that matches how your business operates with three interconnected
        layers.
      </Text>
    </VStack>
  )
}

function DialogBasicStory(props: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open dialog" onClick={() => setDialogOpen(true)} />
      <Dialog {...props} open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Dialog.Content>
          <Text>Dialog body content</Text>
        </Dialog.Content>
      </Dialog>
    </Box>
  )
}

function DialogScrollingContentStory(props: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open dialog" onClick={() => setDialogOpen(true)} />
      <Dialog {...props} open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Dialog.Content>
          <LongBodyContent />
        </Dialog.Content>
      </Dialog>
    </Box>
  )
}

function DialogWithFooterStory(props: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open dialog" onClick={() => setDialogOpen(true)} />
      <Dialog {...props} open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Dialog.Content>
          <LongBodyContent />
        </Dialog.Content>
        <Dialog.Footer>
          <Flex justifyContent="flex-end" gap={2}>
            <Button level="tertiary" text="Cancel" onClick={() => setDialogOpen(false)} />
            <Button text="Confirm" onClick={() => setDialogOpen(false)} />
          </Flex>
        </Dialog.Footer>
      </Dialog>
    </Box>
  )
}

export const Basic: Story = {
  render: (props) => <DialogBasicStory {...props} />,
  play: async ({canvas}) => {
    const dialog = await canvas.findByRole('dialog', {hidden: true})

    await expect(dialog.dataset.ui).toBe('Dialog')

    await userEvent.click(await canvas.findByRole('button', {name: 'Open dialog'}))

    // Only a dialog in the top layer matches :modal. This proves `open` reached showModal()
    // rather than the native open attribute, which renders a non-modal dialog.
    await waitFor(async () => {
      await expect(dialog.matches(':modal')).toBe(true)
    })

    await userEvent.click(await canvas.findByRole('button', {name: 'Close'}))

    await waitFor(async () => {
      await expect(dialog.matches(':modal')).toBe(false)
    })
  },
}

export const ScrollingContent: Story = {
  name: 'Scrolling content',
  render: (props) => <DialogScrollingContentStory {...props} />,
  play: async ({canvas}) => {
    await expect((await canvas.findByRole('dialog', {hidden: true})).dataset.ui).toBe('Dialog')
  },
}

export const WithFooter: Story = {
  name: 'With footer',
  render: (props) => <DialogWithFooterStory {...props} />,
  play: async ({canvas}) => {
    const dialog = await canvas.findByRole('dialog', {hidden: true})

    await expect(dialog.dataset.ui).toBe('Dialog')
    await expect(dialog.querySelector('[data-ui="DialogContent"]')).toBeInTheDocument()
    await expect(dialog.querySelector('[data-ui="DialogFooter"]')).toBeInTheDocument()
  },
}
