import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {expect} from 'storybook/test'
import {Dialog} from 'ui3'

import {Box} from '../../../../packages/ui/src/components/box/Box'
import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Container} from '../../../../packages/ui/src/components/container/Container'
import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {Modal} from '../../../../packages/ui/src/components/modal/Modal'
import {type ModalProps, modalProps} from '../../../../packages/ui/src/components/modal/modal.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(modalProps)

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  args: {
    header: 'Modal heading',
  },
  argTypes,
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Modal"]',
    },
    performance: {
      component: Modal,
      compareComponent: Dialog,
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

function LongBodyContent() {
  return (
    <Container size={0}>
      <VStack gap={3}>
        <Text>
          Sanity is a fully customizable all-code backend for all your content-driven websites and
          apps—their builders and creators.
        </Text>
        <Text>
          It provides the structured foundation, automation layer, and agentic context companies
          need to move faster, work smarter, and power every content experience—from websites to AI
          agents.
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
          It provides the structured foundation, automation layer, and agentic context companies
          need to move faster, work smarter, and power every content experience—from websites to AI
          agents.
        </Text>
        <Text>
          Build a content system that matches how your business operates with three interconnected
          layers.
        </Text>
      </VStack>
    </Container>
  )
}

function ModalDefaultStory(props: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open modal" onClick={() => setModalOpen(true)} />
      <Modal {...props} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content>
          <Text>Modal body content</Text>
        </Modal.Content>
      </Modal>
    </Box>
  )
}

function ModalScrollingContentStory(props: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open modal" onClick={() => setModalOpen(true)} />
      <Modal {...props} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content>
          <LongBodyContent />
        </Modal.Content>
      </Modal>
    </Box>
  )
}

function ModalWithFooterStory(props: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Box padding={4}>
      <Button text="Open modal" onClick={() => setModalOpen(true)} />
      <Modal {...props} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content>
          <LongBodyContent />
        </Modal.Content>
        <Modal.Footer>
          <Flex justifyContent="flex-end" gap={2}>
            <Button level="tertiary" text="Cancel" onClick={() => setModalOpen(false)} />
            <Button text="Confirm" onClick={() => setModalOpen(false)} />
          </Flex>
        </Modal.Footer>
      </Modal>
    </Box>
  )
}

export const Default: Story = {
  render: (props) => <ModalDefaultStory {...props} />,
  play: async ({canvas}) => {
    await expect((await canvas.findByRole('dialog', {hidden: true})).dataset.ui).toBe('Modal')
  },
}

export const ScrollingContent: Story = {
  name: 'Scrolling content',
  render: (props) => <ModalScrollingContentStory {...props} />,
  play: async ({canvas}) => {
    await expect((await canvas.findByRole('dialog', {hidden: true})).dataset.ui).toBe('Modal')
  },
}

export const WithFooter: Story = {
  name: 'With footer',
  render: (props) => <ModalWithFooterStory {...props} />,
  play: async ({canvas}) => {
    const modal = await canvas.findByRole('dialog', {hidden: true})

    await expect(modal.dataset.ui).toBe('Modal')
    await expect(modal.querySelector('[data-ui="ModalContent"]')).toBeInTheDocument()
    await expect(modal.querySelector('[data-ui="ModalFooter"]')).toBeInTheDocument()
  },
}
