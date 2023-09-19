/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'
import {Card, Checkbox} from '../../src/primitives'

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    checked: {
      type: 'boolean',
    },
  },
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Docs: Story = {
  render: (props) => (
    <Card padding={3}>
      <Checkbox {...props} />
    </Card>
  ),
}

export const Controlled: Story = {
  parameters: {
    controls: {
      include: ['customValidity', 'indeterminate'],
    },
  },
  render: (props) => {
    const [selected, setChecked] = useState(false)

    const handleChange = useCallback(() => {
      setChecked((prev) => !prev)
    }, [])

    return (
      <Card padding={3}>
        <Checkbox onClick={handleChange} selected={selected} {...props} />
      </Card>
    )
  },
}
