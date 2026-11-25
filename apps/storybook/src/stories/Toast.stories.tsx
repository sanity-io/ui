import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Toast} from '../../../../packages/ui/src/components/toast/Toast'
import {TOAST_TONE, toastProps} from '../../../../packages/ui/src/components/toast/toast.props'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(toastProps)

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  args: {
    title: 'It’s toasted',
  },
  argTypes,
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Toast"]',
    },
    performance: {
      component: Toast,
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: (props) => {
    return <Toast {...props} />
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <VStack gap={4}>
        {TOAST_TONE.map((tone) => (
          <Toast {...props} key={tone} tone={tone} title={`Toast ${tone} tone`} />
        ))}
      </VStack>
    )
  },
  play: async ({canvas}) => {
    const title = await canvas.findByText('Toast positive tone')
    await expect(title.closest('[data-ui="Toast"]')?.classList).toContain('sui-tone-positive')
  },
}

export const AllProps: Story = {
  render: (props) => {
    return <Toast description="Two slices, golden brown" closable {...props} />
  },
}

export const LongContent: Story = {
  render: (props) => {
    return (
      <Toast
        description="The term gluten usually refers to the elastic network of a wheat grain's proteins, gliadin and glutenin primarily, which forms readily with the addition of water and often kneading in the case of bread dough."
        tone="positive"
        closable
        {...props}
      />
    )
  },
}
