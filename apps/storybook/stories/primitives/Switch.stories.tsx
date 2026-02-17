import {Flex, Stack, Switch} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useState} from 'react'

import {matrixBuilder} from '../helpers/matrixBuilder'

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

const ControlledSwitch = (props: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = useState(!!props['defaultChecked'])

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev)
  }, [])

  return <Switch {...props} checked={checked} onChange={handleChange} />
}

export const Controlled: Story = {
  parameters: {
    controls: {
      include: ['indeterminate'],
    },
  },
  render: (props) => <ControlledSwitch {...props} />,
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
            rows: ['enabled', 'disabled', 'readOnly'],
            title: '',
            renderItem({row, column}) {
              return (
                <Flex justify="center" marginTop={2}>
                  <ControlledSwitch
                    {...props}
                    key={row + column}
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
            rows: ['enabled', 'disabled', 'readOnly'],
            title: '',
            renderItem({row, column}) {
              return (
                <Flex justify="center" marginTop={2}>
                  <ControlledSwitch
                    {...props}
                    key={row + column}
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
