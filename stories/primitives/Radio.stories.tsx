/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {ChangeEvent, useCallback, useState} from 'react'
import {Card, Inline, Radio} from '../../src/primitives'

const meta: Meta<typeof Radio> = {
  argTypes: {
    disabled: {
      type: 'boolean',
    },
  },
  component: Radio,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Radio>

export const Docs: Story = {
  render: (props) => (
    <Card padding={3}>
      <Radio {...props} />
    </Card>
  ),
}

export const Controlled: Story = {
  parameters: {
    controls: {
      include: ['customValidity', 'disabled'],
    },
  },
  render: (props) => {
    const [value, setValue] = useState('a')

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }, [])

    return (
      <Card padding={3}>
        <Inline space={3}>
          <Radio {...props} checked={value === 'a'} name="foo" onChange={handleChange} value="a" />
          <Radio {...props} checked={value === 'b'} name="foo" onChange={handleChange} value="b" />
          <Radio {...props} checked={value === 'c'} name="foo" onChange={handleChange} value="c" />
        </Inline>
      </Card>
    )
  },
}
