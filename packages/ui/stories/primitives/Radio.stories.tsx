import type {Meta, StoryObj} from '@storybook/react'
import {ChangeEvent, useCallback, useState} from 'react'

import {Flex, Radio, Stack} from '../../src/core/primitives'
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
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [value, setValue] = useState('a')

    // oxlint-disable-next-line rules-of-hooks
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }, [])

    return (
      <Flex gap={3}>
        <Radio {...props} checked={value === 'a'} name="foo" onChange={handleChange} value="a" />
        <Radio {...props} checked={value === 'b'} name="foo" onChange={handleChange} value="b" />
        <Radio {...props} checked={value === 'c'} name="foo" onChange={handleChange} value="c" />
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
      // oxlint-disable-next-line no-deprecated
      <Stack space={3}>
        <Flex direction={'row'} wrap={'wrap'} gap={4} align={'center'}>
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
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    readOnly={row === 'readOnly'}
                    customValidity={row === 'customValidity' ? 'error' : undefined}
                    key={row + column}
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
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    readOnly={row === 'readOnly'}
                    customValidity={row === 'customValidity' ? 'error' : undefined}
                    key={row + column}
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
