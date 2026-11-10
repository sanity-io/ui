import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Radio as RadioV3} from 'ui3'

import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {Radio} from '../../../../packages/ui/src/components/radio/Radio'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Radio"]',
    },
    performance: {
      component: Radio,
      compareComponent: RadioV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  render: (props) => {
    return (
      <VStack gap={2}>
        <Radio {...props} name="radio" aria-label="Radio 1" />
        <Radio {...props} name="radio" aria-label="Radio 2" defaultChecked />
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(((await canvas.findByLabelText('Radio 1')) as HTMLInputElement).type).toBe('radio')
    await expect(((await canvas.findByLabelText('Radio 2')) as HTMLInputElement).type).toBe('radio')
  },
}

export const Disabled: Story = {
  render: (props) => {
    return (
      <VStack gap={2}>
        <Radio {...props} aria-label="Disabled radio" disabled />
        <Radio {...props} aria-label="Disabled checked radio" disabled defaultChecked />
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled radio')) as HTMLInputElement).disabled,
    ).toBe(true)
    await expect(
      ((await canvas.findByLabelText('Disabled checked radio')) as HTMLInputElement).disabled,
    ).toBe(true)
  },
}

export const WithLabel: Story = {
  render: (props) => {
    return (
      <HStack gap={2}>
        <Radio {...props} id="labelRadio" />
        <Text as="label" htmlFor="labelRadio">
          Radio
        </Text>
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect(((await canvas.findByLabelText('Radio')) as HTMLInputElement).type).toBe('radio')
  },
}
