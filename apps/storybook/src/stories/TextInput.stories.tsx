import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {TextInput as TextInputV3} from 'ui3'

import {TextInput} from '../../../../packages/ui/src/components/text-input/TextInput'
import {
  type TextInputType,
  textInputProps,
} from '../../../../packages/ui/src/components/text-input/textInput.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(textInputProps)

const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  args: {placeholder: 'Placeholder'},
  argTypes,
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="TextInput"]',
    },
    performance: {
      component: TextInput,
      compareComponent: TextInputV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  render: (props) => <TextInput {...props} id="default-text-input" aria-label="Text input" />,
  play: async ({canvas}) => {
    // Renders a native text input with an accessible name.
    const input = (await canvas.findByRole('textbox', {name: 'Text input'})) as HTMLInputElement

    // The default input is valid and enabled.
    await expect(input.getAttribute('aria-invalid')).toBeNull()
    await expect(input.disabled).toBe(false)
  },
}

export const Disabled: Story = {
  render: (props) => (
    <TextInput {...props} id="disabled-text-input" aria-label="Disabled text input" disabled />
  ),
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled text input')) as HTMLInputElement).disabled,
    ).toBe(true)
  },
}

export const Error: Story = {
  render: (props) => (
    <TextInput {...props} id="error-text-input" aria-label="Text input with error" hasError />
  ),
  play: async ({canvas}) => {
    // The hasError prop marks the element invalid via aria-invalid.
    const input = await canvas.findByRole('textbox', {name: 'Text input with error'})
    await expect(input.getAttribute('aria-invalid')).toBe('true')
  },
}

const TEXT_TYPES = [
  'date',
  'email',
  'month',
  'number',
  'password',
  'tel',
  'time',
  'url',
  'week',
] satisfies TextInputType[]

export const Types: Story = {
  render: (props) => (
    <VStack gap={3}>
      {TEXT_TYPES.map((type) => (
        <div key={type}>
          <Text as="label" htmlFor={`${type}-text-input`} size={1}>
            {type}
          </Text>
          <TextInput {...props} id={`${type}-text-input`} type={type} />
        </div>
      ))}
    </VStack>
  ),
  play: async ({canvas}) => {
    // Each input passes its type through to the native element.
    await Promise.all(
      TEXT_TYPES.map(async (type) => {
        const input = (await canvas.findByLabelText(type)) as HTMLInputElement
        await expect(input.type).toBe(type)
      }),
    )
  },
}
