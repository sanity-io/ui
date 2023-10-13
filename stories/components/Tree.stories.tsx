import {BottleIcon, IceCreamIcon, LemonIcon, TrolleyIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Tree, TreeItem} from '../../src/components'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof Tree> = {
  args: {
    children: [
      <TreeItem key="item1" text="Item 1" />,
      <TreeItem key="item2" text="Item 2" />,
      <TreeItem key="item3" text="Item 3" />,
    ],
  },
  argTypes: {
    space: getSpaceControls(),
  },
  component: Tree,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tree>

export const Default: Story = {
  render: (props) => {
    return <Tree {...props}></Tree>
  },
}

export const WithNestedItems: Story = {
  render: (props) => {
    return (
      <Tree {...props}>
        <TreeItem key="item1" text="Item 1">
          <TreeItem text="Item 1.1" />
          <TreeItem text="Item 1.2" />
          <TreeItem key="Item13" text="Item 1.3">
            <TreeItem text="Item 1.3.1" />
            <TreeItem text="Item 1.3.2" />
            <TreeItem data-testid="item133" text="Item 1.3.3">
              <TreeItem text="Item 1.3.3.1" />
              <TreeItem text="Item 1.3.3.2" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </Tree>
    )
  },
}

export const WithIcons: Story = {
  render: (props) => {
    return (
      <Tree {...props}>
        <TreeItem icon={TrolleyIcon} key="Item1" text="Item 1" expanded>
          <TreeItem text="Item 1.1" icon={IceCreamIcon} />
          <TreeItem text="Item 1.2" icon={LemonIcon} />
          <TreeItem text="Item 1.3" icon={BottleIcon} />
        </TreeItem>
      </Tree>
    )
  },
}
