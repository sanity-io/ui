/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'
import {Checkbox, Flex, Stack} from '../../src/core/primitives'
import {matrixBuilder} from '../helpers/matrixBuilder'

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
      include: [],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Flex direction={'row'} wrap={'wrap'} gap={4} align={'center'}>
          {matrixBuilder({
            scheme: 'light',
            columns: ['default', 'indeterminate', 'checked'],
            rows: ['enabled', 'disabled', 'readOnly', 'customValidity'],
            title: '',
            renderItem({row, column}) {
              return (
                <Flex justify="center" marginTop={2}>
                  <Checkbox
                    {...props}
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    indeterminate={column === 'indeterminate'}
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
            columns: ['default', 'indeterminate', 'checked'],
            rows: ['enabled', 'disabled', 'readOnly', 'customValidity'],
            title: '',
            renderItem({row, column}) {
              return (
                <Flex justify="center" marginTop={2}>
                  <Checkbox
                    {...props}
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    indeterminate={column === 'indeterminate'}
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
