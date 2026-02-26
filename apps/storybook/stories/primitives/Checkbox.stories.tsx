// import {Checkbox, Flex, Stack} from '@sanity/ui'
import {Checkbox} from '@sanity/ui/primitives/checkbox'
import {Flex} from '@sanity/ui/primitives/flex'
import {Stack} from '@sanity/ui/primitives/stack'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useState} from 'react'

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
  render: function Controlled(props) {
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
      <Stack gap={3}>
        <Flex align={'center'} direction={'row'} gap={4} wrap={'wrap'}>
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
                    key={row + column}
                    customValidity={row === 'customValidity' ? 'error' : undefined}
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    indeterminate={column === 'indeterminate'}
                    readOnly={row === 'readOnly'}
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
                    key={row + column}
                    customValidity={row === 'customValidity' ? 'error' : undefined}
                    defaultChecked={column === 'checked'}
                    disabled={row === 'disabled'}
                    indeterminate={column === 'indeterminate'}
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
