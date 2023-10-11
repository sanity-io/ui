import {LemonIcon, TrolleyIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Tree, TreeItem} from '../../src/components'

const meta: Meta<typeof Tree> = {
  args: {
    space: 2,
    children: [
      <TreeItem icon={TrolleyIcon} key="shoppingcart" expanded text="Shopping Cart">
        <TreeItem text="Rice" />
        <TreeItem text="Chicken" />
        <TreeItem text="Shampoo" />
        <TreeItem key="fruit" text="Fruit">
          <TreeItem icon={LemonIcon} text="Lemon" />
          <TreeItem text="Apples" />
          <TreeItem text="Pineapples" />
          <TreeItem data-testid="grapes" text="Grapes">
            <TreeItem data-testid="grapes/red" text="Red" />
            <TreeItem data-testid="grapes/green" text="Green" />
          </TreeItem>
        </TreeItem>
      </TreeItem>,
    ],
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
