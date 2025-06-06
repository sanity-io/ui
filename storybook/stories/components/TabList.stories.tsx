import {OkHandIcon, RocketIcon, SunIcon} from '@sanity/icons'
import {Tab, TabList} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {OVERFLOW_CONTROLS, SPACE_CONTROLS} from '../controls'

const meta: Meta<typeof TabList> = {
  args: {
    children: [
      <Tab aria-controls="example-panel-foo" icon={SunIcon} key="foo" id="foo" label="Foo" />,
      <Tab aria-controls="example-panel-bar" icon={RocketIcon} key="bar" id="bar" label="Bar" />,
      <Tab aria-controls="example-panel-baz" icon={OkHandIcon} key="baz" id="baz" label="Baz" />,
    ],
  },
  argTypes: {
    overflow: OVERFLOW_CONTROLS,
    margin: SPACE_CONTROLS,
    marginBottom: SPACE_CONTROLS,
    marginLeft: SPACE_CONTROLS,
    marginRight: SPACE_CONTROLS,
    marginTop: SPACE_CONTROLS,
    marginX: SPACE_CONTROLS,
    marginY: SPACE_CONTROLS,
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    gap: SPACE_CONTROLS,
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
