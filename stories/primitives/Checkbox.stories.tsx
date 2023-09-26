/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'
import {Checkbox, Flex, Stack} from '../../src/primitives'

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

export const Default: Story = {
  render: (props) => <Checkbox {...props} />,
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

    return <Checkbox defaultChecked={selected} onClick={handleChange} {...props} />
  },
}

export const InputStates: Story = {
  parameters: {
    controls: {
      include: ['customValidity'],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Flex gap={3}>
          <Checkbox {...props} />
          <Checkbox {...props} indeterminate />
          <Checkbox {...props} defaultChecked />
        </Flex>
        <Flex gap={3}>
          <Checkbox {...props} disabled />
          <Checkbox {...props} disabled indeterminate />
          <Checkbox {...props} defaultChecked disabled />
        </Flex>
      </Stack>
    )
  },
}
