import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Radio as RadioV3} from 'ui3'

import {Radio} from '../../../../packages/ui/src/components/radio/Radio'
import {radioProps} from '../../../../packages/ui/src/components/radio/radio.props'
import {VisuallyHidden} from '../../../../packages/ui/src/components/visually-hidden/VisuallyHidden'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(radioProps)

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  args: {},
  argTypes,
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
      <>
        <Radio {...props} name="radio" label="Radio 1" />
        <Radio {...props} name="radio" label="Radio 2" />
      </>
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
      <>
        <Radio {...props} label="Disabled checked radio" disabled defaultChecked />
        <Radio {...props} label="Disabled radio" disabled />
      </>
    )
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled checked radio')) as HTMLInputElement).disabled,
    ).toBe(true)
    await expect(
      ((await canvas.findByLabelText('Disabled radio')) as HTMLInputElement).disabled,
    ).toBe(true)
  },
}

export const VisuallyHiddenLabel: Story = {
  render: (props) => {
    return <Radio {...props} label={<VisuallyHidden>Visually hidden label radio</VisuallyHidden>} />
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Visually hidden label radio')) as HTMLInputElement).type,
    ).toBe('radio')
  },
}
