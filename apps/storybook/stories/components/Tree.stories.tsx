import {BottleIcon} from '@sanity/icons/Bottle'
import {IceCreamIcon} from '@sanity/icons/IceCream'
import {LemonIcon} from '@sanity/icons/Lemon'
import {LinkIcon} from '@sanity/icons/Link'
import {TrolleyIcon} from '@sanity/icons/Trolley'
import {Box, Button, Flex, Text, TextInput, Tree, TreeItem} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useState} from 'react'
import {expect, userEvent, waitFor, within} from 'storybook/test'

import {getSpaceControls} from '../controls'

/**
 * The test id of the item that contains the focused element (the item itself, or its link when it
 * has an `href`)
 */
function focusedItem(doc: Document): string | null | undefined {
  return doc.activeElement?.closest('[data-testid]')?.getAttribute('data-testid')
}

const meta: Meta<typeof Tree> = {
  args: {
    children: [
      <TreeItem key="item1" text="Item 1" />,
      <TreeItem key="item2" text="Item 2" />,
      <TreeItem key="item3" text="Item 3" />,
    ],
  },
  argTypes: {
    gap: getSpaceControls(),
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

export const NestedItems: Story = {
  render: (props) => {
    return (
      <Tree {...props}>
        <TreeItem data-testid="item1" key="item1" text="Item 1">
          <TreeItem data-testid="item11" text="Item 1.1" />
          <TreeItem data-testid="item12" text="Item 1.2" />
          <TreeItem data-testid="item13" key="Item13" text="Item 1.3">
            <TreeItem data-testid="item131" text="Item 1.3.1" />
            <TreeItem data-testid="item132" text="Item 1.3.2" />
            <TreeItem data-testid="item133" text="Item 1.3.3">
              <TreeItem data-testid="item1331" text="Item 1.3.3.1" />
              <TreeItem data-testid="item1332" text="Item 1.3.3.2" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </Tree>
    )
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement)
    const doc = canvasElement.ownerDocument
    const item = (id: string) => canvas.getByTestId(id)

    await step('ArrowDown and ArrowUp skip the items of collapsed groups', async () => {
      item('item1').focus()
      await waitFor(() => expect(item('item1')).toHaveAttribute('tabindex', '0'))

      // The only top-level item is collapsed, so there is nowhere to go
      await userEvent.keyboard('{ArrowDown}')
      await expect(focusedItem(doc)).toBe('item1')

      await userEvent.keyboard('{ArrowRight}')
      await waitFor(() => expect(item('item1')).toHaveAttribute('aria-expanded', 'true'))

      await userEvent.keyboard('{ArrowDown}')
      await expect(focusedItem(doc)).toBe('item11')

      await userEvent.keyboard('{ArrowDown}{ArrowDown}')
      await expect(focusedItem(doc)).toBe('item13')

      // "Item 1.3" is collapsed: its items are skipped and the last visible item stays focused
      await userEvent.keyboard('{ArrowDown}')
      await expect(focusedItem(doc)).toBe('item13')

      await userEvent.keyboard('{ArrowUp}{ArrowUp}')
      await expect(focusedItem(doc)).toBe('item11')

      await userEvent.keyboard('{ArrowUp}')
      await expect(focusedItem(doc)).toBe('item1')

      await userEvent.keyboard('{ArrowUp}')
      await expect(focusedItem(doc)).toBe('item1')
    })

    await step('ArrowRight expands, ArrowLeft collapses or moves to the parent', async () => {
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')
      await expect(focusedItem(doc)).toBe('item13')

      await userEvent.keyboard('{ArrowRight}')
      await waitFor(() => expect(item('item13')).toHaveAttribute('aria-expanded', 'true'))

      await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')
      await expect(focusedItem(doc)).toBe('item133')

      // A collapsed item moves focus to its parent
      await userEvent.keyboard('{ArrowLeft}')
      await expect(focusedItem(doc)).toBe('item13')
      await waitFor(() => expect(item('item13')).toHaveAttribute('aria-expanded', 'true'))

      // An expanded item collapses
      await userEvent.keyboard('{ArrowLeft}')
      await waitFor(() => expect(item('item13')).toHaveAttribute('aria-expanded', 'false'))
      await expect(focusedItem(doc)).toBe('item13')
    })

    await step('Home and End move to the first and last visible item', async () => {
      await userEvent.keyboard('{Home}')
      await expect(focusedItem(doc)).toBe('item1')

      // "Item 1.3" is collapsed, so it is the last visible item
      await userEvent.keyboard('{End}')
      await expect(focusedItem(doc)).toBe('item13')

      await userEvent.keyboard('{ArrowRight}')
      await waitFor(() => expect(item('item13')).toHaveAttribute('aria-expanded', 'true'))
      await userEvent.keyboard('{End}')
      await expect(focusedItem(doc)).toBe('item133')

      await userEvent.keyboard('{ArrowRight}')
      await waitFor(() => expect(item('item133')).toHaveAttribute('aria-expanded', 'true'))
      await userEvent.keyboard('{End}')
      await expect(focusedItem(doc)).toBe('item1332')

      await userEvent.keyboard('{Home}')
      await expect(focusedItem(doc)).toBe('item1')
    })
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

function TabFromElementStory() {
  const [id, setId] = useState('')
  const [focus, setFocus] = useState('')

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    const testid = event.currentTarget.getAttribute('data-testid')

    if (testid) setId(testid)
  }, [])

  const handleFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const elementFocus = event.target.getAttribute('data-testid')
    if (elementFocus) setFocus(elementFocus)
  }, [])

  return (
    <Box padding={[4, 5, 6]}>
      <Box paddingY={3}>
        <Text muted size={1}>
          This example is to demonstrate that when you tab from an outside element (using the
          keyboard to navigate), you can still access the tree and tree item. Press the input
          beneath and start tabbing / using the arrow.
        </Text>
      </Box>
      <Box paddingY={3}>
        <Text>Focus: {focus}</Text>
      </Box>
      <TextInput data-testid="before" />
      <Tree gap={1} onFocus={handleFocus}>
        <TreeItem data-testid="fruit" onClick={handleClick} expanded text="Fruit">
          <TreeItem
            data-testid="oranges"
            onClick={handleClick}
            selected={id === 'oranges'}
            text="Oranges"
          />
          <TreeItem
            data-testid="pineapples"
            onClick={handleClick}
            text="Pineapples"
            selected={id === 'pineapples'}
          />
          <TreeItem data-testid="apples" onClick={handleClick} text="Apples">
            <TreeItem
              data-testid="apples/macintosh"
              onClick={handleClick}
              href="/apples/macintosh"
              icon={LinkIcon}
              text="Macintosh"
            />
            <TreeItem data-testid="apples/granny-smith" onClick={handleClick} text="Granny Smith" />
            <TreeItem data-testid="apples/fuji" onClick={handleClick} text="Fuji" />
          </TreeItem>
          <TreeItem data-testid="bananas" onClick={handleClick} text="Bananas" />
          <TreeItem data-testid="pears" onClick={handleClick} text="Pears">
            <TreeItem data-testid="pears/anjou" onClick={handleClick} text="Anjou" />
            <TreeItem data-testid="pears/bartlett" onClick={handleClick} text="Bartlett" />
            <TreeItem data-testid="pears/bosc" onClick={handleClick} text="Bosc" />
            <TreeItem data-testid="pears/concorde" onClick={handleClick} text="Concorde" />
            <TreeItem data-testid="pears/seckel" onClick={handleClick} text="Seckel" />
            <TreeItem data-testid="pears/starkrimson" onClick={handleClick} text="Starkrimson" />
          </TreeItem>
        </TreeItem>
      </Tree>
      <TextInput data-testid="after" />
    </Box>
  )
}

export const TabFromElement: Story = {
  parameters: {controls: {include: []}},
  render: () => <TabFromElementStory />,
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement)
    const doc = canvasElement.ownerDocument

    await step('the tree is a single tab stop that enters on the first item', async () => {
      await userEvent.click(canvas.getByTestId('before'))
      await userEvent.tab()

      await waitFor(() => expect(canvas.getByTestId('fruit')).toHaveFocus())
      await expect(canvas.getByText('Focus: fruit')).toBeInTheDocument()

      await userEvent.tab()
      await waitFor(() => expect(canvas.getByTestId('after')).toHaveFocus())

      await userEvent.tab({shift: true})
      await waitFor(() => expect(canvas.getByTestId('fruit')).toHaveFocus())

      await userEvent.tab({shift: true})
      await waitFor(() => expect(canvas.getByTestId('before')).toHaveFocus())
    })

    await step('the item that was focused last is the tab stop', async () => {
      await userEvent.tab()
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')
      await expect(focusedItem(doc)).toBe('apples')

      await userEvent.tab()
      await waitFor(() => expect(canvas.getByTestId('after')).toHaveFocus())

      await userEvent.tab({shift: true})
      await waitFor(() => expect(canvas.getByTestId('apples')).toHaveFocus())
      await expect(canvas.getByText('Focus: apples')).toBeInTheDocument()
    })

    await step('a link item keeps its place in the navigation', async () => {
      await userEvent.keyboard('{ArrowRight}{ArrowDown}')
      await expect(focusedItem(doc)).toBe('apples/macintosh')
      await expect(doc.activeElement).toHaveAttribute('href', '/apples/macintosh')

      // Leave and come back onto the link itself
      await userEvent.tab()
      await userEvent.tab({shift: true})
      await expect(focusedItem(doc)).toBe('apples/macintosh')

      await userEvent.keyboard('{ArrowDown}')
      await expect(focusedItem(doc)).toBe('apples/granny-smith')

      await userEvent.keyboard('{ArrowLeft}')
      await expect(focusedItem(doc)).toBe('apples')
    })
  },
}

function DynamicItemsStory() {
  const [names, setNames] = useState(['Beets', 'Carrots'])

  return (
    <Box padding={[4, 5, 6]}>
      <Flex gap={2} paddingBottom={3}>
        <Button
          mode="ghost"
          onClick={() => setNames((prev) => ['Asparagus', ...prev])}
          text="Prepend"
        />
        <Button
          mode="ghost"
          onClick={() => setNames((prev) => [...prev, 'Daikon'])}
          text="Append"
        />
        <Button
          mode="ghost"
          onClick={() => setNames((prev) => prev.slice(1))}
          text="Remove first"
        />
      </Flex>
      <Tree gap={1}>
        {names.map((name) => (
          <TreeItem data-testid={name.toLowerCase()} key={name} text={name} />
        ))}
      </Tree>
    </Box>
  )
}

export const DynamicItems: Story = {
  parameters: {controls: {include: []}},
  render: () => <DynamicItemsStory />,
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement)
    const doc = canvasElement.ownerDocument
    const tree = () => canvas.getByRole('tree')

    await step('items added later are navigated in document order', async () => {
      await userEvent.click(canvas.getByRole('button', {name: 'Append'}))
      await userEvent.click(canvas.getByRole('button', {name: 'Prepend'}))
      await waitFor(() => expect(canvas.getByTestId('daikon')).toBeInTheDocument())

      await userEvent.click(canvas.getByTestId('beets'))
      await expect(focusedItem(doc)).toBe('beets')

      await userEvent.keyboard('{ArrowUp}')
      await expect(focusedItem(doc)).toBe('asparagus')

      await userEvent.keyboard('{End}')
      await expect(focusedItem(doc)).toBe('daikon')

      await userEvent.keyboard('{Home}')
      await expect(focusedItem(doc)).toBe('asparagus')
    })

    await step('the tree takes the tab stop back when the focused item is removed', async () => {
      await waitFor(() => expect(tree()).not.toHaveAttribute('tabindex'))

      await userEvent.click(canvas.getByRole('button', {name: 'Remove first'}))
      await waitFor(() => expect(canvas.queryByTestId('asparagus')).not.toBeInTheDocument())

      await waitFor(() => expect(tree()).toHaveAttribute('tabindex', '0'))
      await expect(canvas.getByTestId('beets')).toHaveAttribute('tabindex', '-1')

      // Tabbing from the button lands on the item that is now first
      await userEvent.tab()
      await waitFor(() => expect(canvas.getByTestId('beets')).toHaveFocus())
      await expect(tree()).not.toHaveAttribute('tabindex')
    })
  },
}
