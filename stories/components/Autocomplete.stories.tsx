import {SearchIcon} from '@sanity/icons'
import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {Autocomplete} from '../../src/components'
import {Card, Flex} from '../../src/primitives'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof Autocomplete> = {
  args: {
    icon: SearchIcon,
    options: [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}],
    placeholder: 'Search...',
  },
  component: Autocomplete,
  decorators: [
    (Story: StoryFn): JSX.Element => (
      <Card paddingBottom={8} paddingTop={3}>
        <Story />
      </Card>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Autocomplete>

export const Default: Story = {
  render: (props) => {
    return <Autocomplete {...props} />
  },
}

export const Loading: Story = {
  args: {loading: true},
  render: (props) => {
    return <Autocomplete {...props} />
  },
}

export const Radius: Story = {
  render: (props) => (
    <Flex gap={4} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <Autocomplete {...props} placeholder={String(radius)} radius={radius} />
        ),
      })}
    </Flex>
  ),
}
