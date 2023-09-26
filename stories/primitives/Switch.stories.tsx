/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'
import {Flex, Stack, Switch} from '../../src/primitives'

const meta: Meta<typeof Switch> = {
  args: {
    onChange: () => {},
  },
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

export const Default: Story = {
  render: (props) => <Switch {...props} />,
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  parameters: {
    controls: {
      include: [],
    },
  },
  render: (props) => <Switch {...props} />,
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

    return <Switch {...props} checked={checked} onChange={handleChange} />
  },
}

export const InputStates: Story = {
  parameters: {
    controls: {
      include: [],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Flex gap={3}>
          <Switch {...props} />
          <Switch {...props} indeterminate />
          <Switch {...props} defaultChecked />
        </Flex>
        <Flex gap={3}>
          <Switch {...props} disabled />
          <Switch {...props} disabled indeterminate />
          <Switch {...props} defaultChecked disabled />
        </Flex>
      </Stack>
    )
  },
}
