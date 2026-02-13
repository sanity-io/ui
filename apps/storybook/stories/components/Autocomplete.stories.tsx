import {SearchIcon} from '@sanity/icons'
import {Autocomplete, Card} from '@sanity/ui'
import {RADIUS} from '@sanity/ui/theme'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'

import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Autocomplete> = {
  args: {
    icon: SearchIcon,
    options: [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}],
    placeholder: 'Search...',
  },
  component: Autocomplete,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Card paddingBottom={9}>
        {/* @ts-expect-error fix later */}
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
    <>
      {rowBuilder({
        gap: 4,
        renderItem: ({value, index}) => (
          <Autocomplete
            {...props}
            id="autocomplete"
            key={index}
            placeholder={String(value)}
            radius={value}
          />
        ),
        rows: [...RADIUS],
      })}
    </>
  ),
}
