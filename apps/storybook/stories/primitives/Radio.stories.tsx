// import {Flex, Radio, Stack} from '@sanity/ui'
import {Flex} from '@sanity/ui/primitives/flex'
import {Radio} from '@sanity/ui/primitives/radio'
import {Stack} from '@sanity/ui/primitives/stack'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {type ChangeEvent, useCallback, useState} from 'react'

import {matrixBuilder} from '../helpers/matrixBuilder'

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

export const Default: Story = {
  render: (props) => <Radio {...props} />,
}

export const Controlled: Story = {
  parameters: {
    controls: {
      include: ['customValidity', 'disabled'],
    },
  },
  render: function Controlled(props) {
    const [value, setValue] = useState('a')

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }, [])

    return (
      <Flex gap={3}>
        <Radio {...props} checked={value === 'a'} name="foo" value="a" onChange={handleChange} />
        <Radio {...props} checked={value === 'b'} name="foo" value="b" onChange={handleChange} />
        <Radio {...props} checked={value === 'c'} name="foo" value="c" onChange={handleChange} />
      </Flex>
    )
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
      <Stack gap={3}>
        <Flex align={'center'} direction={'row'} gap={4} wrap={'wrap'}>
          {matrixBuilder({
            scheme: 'light',
            columns: ['default', 'checked'],
            rows: ['enabled', 'disabled', 'readOnly', 'customValidity'],
            title: '',
            renderItem({row, column}) {
              return (
                <Flex justify="center" marginTop={2}>
                  <Radio
                    {...props}
                    key={row + column}
                    customValidity={row === 'customValidity' ? 'error' : undefined}
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    readOnly={row === 'readOnly'}
                  />
                </Flex>
              )
            },
          })}
          {matrixBuilder({
            scheme: 'dark',
            columns: ['default', 'checked'],
            rows: ['enabled', 'disabled', 'readOnly', 'customValidity'],
            title: '',
            renderItem({row, column}) {
              return (
                <Flex justify="center" marginTop={2}>
                  <Radio
                    {...props}
                    key={row + column}
                    customValidity={row === 'customValidity' ? 'error' : undefined}
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    readOnly={row === 'readOnly'}
                  />
                </Flex>
              )
            },
          })}
        </Flex>
      </Stack>
    )
  },
}
