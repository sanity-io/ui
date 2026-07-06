import {Card, Checkbox, Flex, Stack} from '@sanity/ui'
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
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [selected, setChecked] = useState(false)

    // oxlint-disable-next-line rules-of-hooks
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

export const MultipleTones: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack>
        <Card padding={3} tone="neutral">
          <Checkbox />
        </Card>
        <Card padding={3} tone="primary">
          <Checkbox />
        </Card>
        <Card padding={3} tone="suggest">
          <Checkbox />
        </Card>
        <Card padding={3} tone="positive">
          <Checkbox />
        </Card>
        <Card padding={3} tone="caution">
          <Checkbox />
        </Card>
        <Card padding={3} tone="critical">
          <Checkbox />
        </Card>
      </Stack>
    </Flex>
  ),
}
