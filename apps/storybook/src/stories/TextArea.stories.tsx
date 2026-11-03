import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {TextArea as TextAreaV3} from 'ui3'

import {TextArea} from '../../../../packages/ui/src/components/text-area/TextArea'
import {textAreaProps} from '../../../../packages/ui/src/components/text-area/textArea.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(textAreaProps)

const meta: Meta<typeof TextArea> = {
  title: 'Forms/TextArea',
  args: {placeholder: 'Placeholder'},
  argTypes,
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="TextArea"]',
    },
    performance: {
      component: TextArea,
      compareComponent: TextAreaV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  render: (props) => <TextArea {...props} id="default-text-area" aria-label="Text area" />,
  play: async ({canvas}) => {
    // Renders a native textarea with an accessible name.
    const textarea = (await canvas.findByRole('textbox', {
      name: 'Text area',
    })) as HTMLTextAreaElement

    // The default textarea is valid and enabled.
    await expect(textarea.getAttribute('aria-invalid')).toBeNull()
    await expect(textarea.disabled).toBe(false)

    // The default rows attribute is 5.
    await expect(textarea.rows).toBe(5)
  },
}

export const Disabled: Story = {
  render: (props) => (
    <TextArea {...props} id="disabled-text-area" aria-label="Disabled text area" disabled />
  ),
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled text area')) as HTMLTextAreaElement).disabled,
    ).toBe(true)
  },
}

export const Error: Story = {
  render: (props) => (
    <TextArea {...props} id="error-text-area" aria-label="Text area with error" hasError />
  ),
  play: async ({canvas}) => {
    // The hasError prop marks the element invalid via aria-invalid.
    const textarea = await canvas.findByRole('textbox', {name: 'Text area with error'})
    await expect(textarea.getAttribute('aria-invalid')).toBe('true')
  },
}

export const ReadOnly: Story = {
  render: (props) => (
    <TextArea
      {...props}
      id="read-only-text-area"
      aria-label="Read-only text area"
      defaultValue="Read-only value"
      readOnly
    />
  ),
  play: async ({canvas}) => {
    // The readOnly prop sets the native readonly state.
    const textarea = (await canvas.findByLabelText('Read-only text area')) as HTMLTextAreaElement
    await expect(textarea.readOnly).toBe(true)
  },
}

export const Rows: Story = {
  args: {rows: 10},
  render: (props) => <TextArea {...props} id="rows-text-area" aria-label="Text area with rows" />,
  play: async ({canvas}) => {
    // The rows prop passes through to the native rows attribute.
    const textarea = (await canvas.findByRole('textbox', {
      name: 'Text area with rows',
    })) as HTMLTextAreaElement
    await expect(textarea.rows).toBe(10)
  },
}

export const MaxHeight: Story = {
  name: 'Auto Resize with Max Height',
  args: {autoResize: true, maxHeight: '10rem'},
  render: (props) => (
    <TextArea {...props} id="max-height-text-area" aria-label="Text area with max height" />
  ),
  play: async ({canvas}) => {
    // autoResize grows the textarea to its content, while maxHeight caps that growth.
    const textarea = (await canvas.findByRole('textbox', {
      name: 'Text area with max height',
    })) as HTMLTextAreaElement
    await expect(textarea.className).toContain('sui-field-sizing-content')
    await expect(textarea.className).toContain('sui-max-height')
    await expect(textarea.style.getPropertyValue('--max-height')).toBe('10rem')
  },
}

export const AutoResize: Story = {
  args: {autoResize: true},
  render: (props) => (
    <TextArea {...props} id="auto-resize-text-area" aria-label="Auto resizing text area" />
  ),
  play: async ({canvas}) => {
    // The autoResize prop adds the field-sizing class that drives content sizing.
    const textarea = await canvas.findByRole('textbox', {name: 'Auto resizing text area'})
    await expect(textarea.className).toContain('sui-field-sizing-content')
  },
}
