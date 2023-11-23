import {SearchIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Tab} from '../../src/core/components'
import {BUTTON_TONES} from '../constants'
import {getFontSizeControls, getIconControls, getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Tab> = {
  args: {
    label: 'Example tab',
  },
  argTypes: {
    fontSize: getFontSizeControls('text'),
    icon: getIconControls(),
    padding: getSpaceControls(),
  },
  component: Tab,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tab>

export const Default: Story = {
  render: (props) => {
    return <Tab {...props} />
  },
}

export const LongLabel: Story = {
  args: {
    label:
      'Duis at est eget nisi placerat scelerisque. Sed gravida bibendum est a egestas. Nam ac lacinia ipsum. Maecenas sit amet eros a velit fermentum malesuada et vitae dui. Etiam molestie erat dui, id consequat justo imperdiet volutpat. Phasellus viverra consectetur lacus a condimentum. Pellentesque scelerisque enim lorem, vitae tempus quam bibendum sed. Nullam eu ante non lectus placerat viverra. Morbi suscipit ornare tristique. Ut consequat, nisl quis sagittis eleifend, nibh enim eleifend ex, et consectetur arcu orci a velit. Etiam in odio eget augue consequat finibus eu a tortor.',
  },
  render: (props) => {
    return <Tab {...props} />
  },
}

export const Selected: Story = {
  args: {
    selected: true,
  },
  render: (props) => {
    return <Tab {...props} />
  },
}

export const Tones: Story = {
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => <Tab {...props} key={value} label={value} tone={value} />,
        rows: BUTTON_TONES,
      })}
    </>
  ),
}

export const WithIcon: Story = {
  args: {
    icon: SearchIcon,
  },
  render: (props) => {
    return <Tab {...props} />
  },
}
