import {OkHandIcon, RocketIcon, SunIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Tab, TabList} from '../../src/components'
import {getOverflowControls, getSpaceControls} from '../controls'

const meta: Meta<typeof TabList> = {
  args: {
    children: [
      <Tab aria-controls="example-panel-foo" icon={SunIcon} key="foo" id="foo" label="Foo" />,
      <Tab aria-controls="example-panel-bar" icon={RocketIcon} key="bar" id="bar" label="Bar" />,
      <Tab aria-controls="example-panel-baz" icon={OkHandIcon} key="baz" id="baz" label="Baz" />,
    ],
  },
  argTypes: {
    overflow: getOverflowControls(),
    margin: getSpaceControls(),
    marginBottom: getSpaceControls(),
    marginLeft: getSpaceControls(),
    marginRight: getSpaceControls(),
    marginTop: getSpaceControls(),
    marginX: getSpaceControls(),
    marginY: getSpaceControls(),
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    space: getSpaceControls(),
  },
  component: TabList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TabList>

export const Default: Story = {
  render: (props) => {
    return <TabList {...props} />
  },
}

export const LongLabels: Story = {
  args: {
    children: [
      <Tab
        aria-controls="example-panel-foo"
        icon={SunIcon}
        id="foo"
        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida, tellus non dictum cursus, augue tortor viverra lacus, id rhoncus ipsum mi vitae elit. Suspendisse mollis risus sollicitudin, scelerisque augue placerat, porttitor lectus. "
        key="foo"
      />,
      <Tab
        aria-controls="example-panel-bar"
        icon={RocketIcon}
        id="bar"
        label="Ut nec dui est. Curabitur pulvinar euismod porta. Suspendisse finibus leo id mauris pretium, at luctus quam eleifend. "
        key="bar"
      />,
      <Tab
        aria-controls="example-panel-baz"
        icon={OkHandIcon}
        id="baz"
        label="Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam varius sodales arcu sed ultrices. "
        key="baz"
      />,
    ],
  },
  render: (props) => {
    return <TabList {...props} />
  },
}
