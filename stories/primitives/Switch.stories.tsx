/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'
import {Card, Switch} from '../../src/primitives'

const meta: Meta<typeof Switch> = {
  argTypes: {
    checked: {
      type: 'boolean',
    },
  },
  component: Switch,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Docs: Story = {
  render: (props) => (
    <Card padding={3}>
      <Switch {...props} />
    </Card>
  ),
}

export const Controlled: Story = {
  parameters: {
    controls: {
      include: ['indeterminate'],
    },
  },
  render: (props) => {
    const [checked, setChecked] = useState(false)

    const handleChange = useCallback(() => {
      setChecked((prev) => !prev)
    }, [])

    return (
      <Card padding={3}>
        <Switch checked={checked} onClick={handleChange} {...props} />
      </Card>
    )
  },
}
