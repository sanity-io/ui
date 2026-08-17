import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {expect} from 'storybook/test'

import {Box} from '../../../../packages/ui/src/components/box/Box'
import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Container} from '../../../../packages/ui/src/components/container/Container'
import {Dialog} from '../../../../packages/ui/src/components/dialog/Dialog'
import {
  type DialogProps,
  dialogProps,
} from '../../../../packages/ui/src/components/dialog/dialog.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(dialogProps)

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  args: {
    header: 'Modal heading',
  },
  argTypes,
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Dialog',
    },
    performance: {
      component: Dialog,
    },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

function DialogDefaultStory(props: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open dialog" onClick={() => setDialogOpen(true)} />
      <Dialog {...props} isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Text>Dialog body content</Text>
      </Dialog>
    </Box>
  )
}

function DialogScrollingContentStory(props: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open dialog" onClick={() => setDialogOpen(true)} />
      <Dialog {...props} isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Container size={0}>
          <VStack gap={3}>
            <Text>
              Sanity is a fully customizable all-code backend for all your content-driven websites
              and apps—their builders and creators.
            </Text>
            <Text>
              It provides the structured foundation, automation layer, and agentic context companies
              need to move faster, work smarter, and power every content experience—from websites to
              AI agents.
            </Text>
            <Text>
              Build a content system that matches how your business operates with three
              interconnected layers.
            </Text>
            <Text>
              Sanity is a fully customizable all-code backend for all your content-driven websites
              and apps—their builders and creators.
            </Text>
            <Text>
              It provides the structured foundation, automation layer, and agentic context companies
              need to move faster, work smarter, and power every content experience—from websites to
              AI agents.
            </Text>
            <Text>
              Build a content system that matches how your business operates with three
              interconnected layers.
            </Text>
          </VStack>
        </Container>
      </Dialog>
    </Box>
  )
}
export const Default: Story = {
  render: (props) => <DialogDefaultStory {...props} />,
  play: async ({canvas}) => {
    await expect((await canvas.findByRole('dialog', {hidden: true})).dataset.ui).toBe('Dialog')
  },
}

export const ScrollingContent: Story = {
  name: 'Scrolling content',
  render: (props) => <DialogScrollingContentStory {...props} />,
  play: async ({canvas}) => {
    await expect((await canvas.findByRole('dialog', {hidden: true})).dataset.ui).toBe('Dialog')
  },
}
