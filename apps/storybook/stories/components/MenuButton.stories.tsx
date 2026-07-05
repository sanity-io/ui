import {
  AddIcon,
  CheckmarkIcon,
  ChevronDownIcon,
  ClockIcon,
  CommentIcon,
  EllipsisHorizontalIcon,
  ErrorOutlineIcon,
  ExpandIcon,
  LaunchIcon,
  SearchIcon,
} from '@sanity/icons'
import {
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Code,
  Flex,
  Grid,
  LayerProvider,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuDivider,
  MenuGroup,
  MenuItem,
  SelectableTone,
  Stack,
  Text,
  ToastProvider,
  useToast,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, fn, userEvent, within} from '@storybook/test'
import {useCallback, useRef, useState} from 'react'

const meta: Meta<typeof MenuButton> = {
  args: {
    onOpen: fn(),
    onClose: fn(),
    button: <Button text="Open" />,
    menu: (
      <Menu>
        <MenuItem icon={SearchIcon} id="menu-item-1" text="Search" />
        <MenuItem icon={ClockIcon} id="menu-item-2" text="Clock" />
        <MenuItem disabled icon={CommentIcon} id="menu-item-3" text="Comment" />
        <MenuDivider />
        <MenuItem icon={ExpandIcon} id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  component: MenuButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MenuButton>

export const Default: Story = {
  render: (props) => {
    return <MenuButton {...props} />
  },
}

export const AnimatedPopover: Story = {
  args: {
    popover: {animate: true},
  },
  render: (props) => {
    return <MenuButton {...props} />
  },
}

export const PopoverRadius: Story = {
  parameters: {
    controls: {
      include: [],
    },
  },
  render: (props) => (
    <Flex gap={4} wrap="wrap">
      <MenuButton {...props} button={<Button text="0" />} popover={{radius: 0}} />
      <MenuButton {...props} button={<Button text="1" />} popover={{radius: 1}} />
      <MenuButton {...props} button={<Button text="2" />} popover={{radius: 2}} />
      <MenuButton {...props} button={<Button text="3" />} popover={{radius: 3}} />
      <MenuButton {...props} button={<Button text="4" />} popover={{radius: 4}} />
      <MenuButton {...props} button={<Button text="5" />} popover={{radius: 5}} />
      <MenuButton {...props} button={<Button text="6" />} popover={{radius: 6}} />
      <MenuButton {...props} button={<Button text="full" />} popover={{radius: 'full'}} />
    </Flex>
  ),
}

export const WithMenuGroup: Story = {
  args: {
    menu: (
      <Menu>
        <MenuItem id="menu-item-1" text="Search" />
        <MenuItem id="menu-item-2" text="Clock" />
        <MenuGroup text="More">
          <MenuItem text="Email link" />
          <MenuItem text="Messages" />
        </MenuGroup>
        <MenuItem id="menu-item-3" text="Comment" />
        <MenuDivider />
        <MenuItem id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  render: (props) => {
    return <MenuButton {...props} />
  },
}

export const WithSelectedItem: Story = {
  args: {
    menu: (
      <Menu data-testid="menu">
        <MenuItem id="menu-item-1" selected text="Search" />
        <MenuItem id="menu-item-2" text="Clock" />
        <MenuDivider />
        <MenuItem id="menu-item-3" text="Comment" />
        <MenuItem id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  render: (props) => {
    return <MenuButton {...props} />
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button', {name: 'Open'})

    await userEvent.click(button)
    await userEvent.click(button)

    const menu = within(document.documentElement).queryByTestId('menu')

    // Assertion: <Menu> with a selected item should not be visible when clicking the original <MenuButton> to close
    // oxlint-disable-next-line no-floating-promises
    expect(menu).toBeNull()
  },
}

export const PopoverModal: Story = {
  args: {
    menu: (
      <Menu data-testid="menu">
        <MenuItem id="menu-item-1" selected text="Search" />
        <MenuItem id="menu-item-2" text="Clock" />
        <MenuDivider />
        <MenuItem id="menu-item-3" text="Comment" />
        <MenuItem id="menu-item-4" text="Expand" />
      </Menu>
    ),
  },
  render: (props) => {
    return (
      // oxlint-disable-next-line no-deprecated
      <Stack space={4}>
        <Flex gap={4} wrap="wrap">
          <MenuButton {...props} button={<Button text="Default " />} />
          <MenuButton
            {...props}
            button={<Button text="Modal popover" tone="primary" />}
            popover={{modal: true, portal: false}}
          />
          <MenuButton
            {...props}
            button={<Button text="Modal popover (portalled)" tone="primary" />}
            popover={{modal: true, portal: true}}
          />
          <Button
            as="a"
            href="https://www.sanity.io"
            iconRight={LaunchIcon}
            mode="ghost"
            target="_blank"
            text="Open sanity.io in a new window"
          />
        </Flex>

        <Card
          as="a"
          border
          href="https://www.sanity.io"
          padding={2}
          radius={3}
          target="_blank"
          tone="default"
        >
          <Flex align="center" gap={2} justify="space-between">
            <Box padding={2}>
              <Text size={1}>Open sanity.io in a new window</Text>
            </Box>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <MenuButton
                {...props}
                button={<Button icon={EllipsisHorizontalIcon} mode="bleed" />}
                popover={{modal: true}}
              />
            </div>
          </Flex>
        </Card>
      </Stack>
    )
  },
}

export const KeyboardNavigation: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Card height="fill">
      <Box padding={[4, 5, 6]}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Grid columns={3} gap={2}>
          <Button id="prev-button" mode="ghost" text="Prev" />
          <LayerProvider>
            <MenuButton
              button={<Button text="Open" />}
              id="menu-button"
              menu={
                <Menu>
                  <MenuItem icon={SearchIcon} id="menu-item-1" onClick={fn()} text="Search" />
                  <MenuItem icon={ClockIcon} id="menu-item-2" onClick={fn()} text="Clock" />
                  <MenuItem
                    disabled
                    icon={CommentIcon}
                    id="menu-item-3"
                    onClick={fn()}
                    text="Comment"
                  />
                  <MenuDivider />
                  <MenuItem icon={ExpandIcon} id="menu-item-4" onClick={fn()} text="Expand" />
                </Menu>
              }
              onClose={fn()}
              onOpen={fn()}
              popover={{constrainSize: true}}
            />
          </LayerProvider>
          <Button mode="ghost" id="next-button" text="Next" />
        </Grid>
      </Box>
    </Card>
  ),
}

const SELECTED_ITEM_POPOVER_PROPS: MenuButtonProps['popover'] = {
  matchReferenceWidth: true,
}

function SelectedItemFocusStory() {
  const [selectedIndex, setSelectedIndex] = useState(1)

  return (
    <Box padding={[4, 5, 6]}>
      {/* oxlint-disable-next-line no-deprecated */}
      <Stack space={4}>
        <Code>selectedIndex={selectedIndex}</Code>

        <MenuButton
          button={<Button text="Open menu" />}
          id="menu-button"
          menu={
            <Menu>
              <MenuItem
                icon={SearchIcon}
                iconRight={selectedIndex === 0 ? CheckmarkIcon : undefined}
                id="menu-item-1"
                onClick={() => setSelectedIndex(0)}
                pressed={selectedIndex === 0}
                selected={selectedIndex === 0}
                text="Show search"
              />
              <MenuItem
                icon={ClockIcon}
                iconRight={selectedIndex === 1 ? CheckmarkIcon : undefined}
                id="menu-item-2"
                onClick={() => setSelectedIndex(1)}
                pressed={selectedIndex === 1}
                selected={selectedIndex === 1}
                text="Show clock"
              />
              <MenuDivider />
              <MenuItem
                icon={ExpandIcon}
                iconRight={selectedIndex === 2 ? CheckmarkIcon : undefined}
                id="menu-item-3"
                onClick={() => setSelectedIndex(2)}
                pressed={selectedIndex === 2}
                selected={selectedIndex === 2}
                text="Expanded"
              />
            </Menu>
          }
          popover={SELECTED_ITEM_POPOVER_PROPS}
        />
      </Stack>
    </Box>
  )
}

export const SelectedItemFocus: Story = {
  parameters: {controls: {include: []}},
  render: () => <SelectedItemFocusStory />,
}

function ClosableStory() {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Box padding={[4, 5, 6]}>
      <Stack>
        <MenuButton
          button={<Button text="Open" />}
          id="closable-example"
          menu={
            // oxlint-disable-next-line no-deprecated
            <Menu padding={0} space={0}>
              {/* oxlint-disable-next-line no-deprecated */}
              <Stack padding={1} space={1}>
                <MenuItem text="Item 1" />
                <MenuItem text="Item 2" />
                <MenuItem text="Item 3" />
                <MenuItem text="Item 4" />
              </Stack>
              <Stack padding={1} style={{borderTop: '1px solid var(--card-border-color)'}}>
                <Button
                  icon={AddIcon}
                  onClick={() => {
                    ref.current?.click()
                    ref.current?.focus()
                  }}
                  mode="bleed"
                  text="Add item"
                  tone="primary"
                />
              </Stack>
            </Menu>
          }
          popover={{constrainSize: true}}
          ref={ref}
        />
      </Stack>
    </Box>
  )
}

export const Closable: Story = {
  parameters: {controls: {include: []}},
  render: () => <ClosableStory />,
}

const WITHOUT_ARROW_POPOVER_PROPS: MenuButtonProps['popover'] = {
  __unstable_margins: [1, 1, 1, 1],
  arrow: false,
  constrainSize: true,
  fallbackPlacements: ['top-start'],
  matchReferenceWidth: true,
  radius: 0,
  placement: 'bottom-start',
}

export const WithoutArrow: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      <Stack>
        <MenuButton
          button={<Button mode="ghost" text="Open menu" />}
          id="without-arrow-example"
          menu={
            <Menu>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
              <MenuItem text="Item 3" />
            </Menu>
          }
          popover={WITHOUT_ARROW_POPOVER_PROPS}
        />
      </Stack>
    </Box>
  ),
}

const CONSTRAINED_ITEMS: {tone: SelectableTone; message: string}[] = Array.from(
  {length: 17},
  () => ({
    tone: 'critical',
    message: 'Critical message',
  }),
)

function ConstrainedInBoundaryStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Box height="fill" padding={[4, 5, 6]} sizing="border">
      <Card height="fill" shadow={1}>
        <Flex height="fill">
          <Card flex={1} padding={4}>
            <Text>Pane</Text>
          </Card>
          <Card borderLeft flex={1} padding={2} ref={setBoundaryElement}>
            <Flex>
              <Box flex={1} padding={3}>
                <Text>Pane</Text>
              </Box>
              <Box>
                <BoundaryElementProvider element={boundaryElement}>
                  <MenuButton
                    button={<Button icon={ErrorOutlineIcon} mode="bleed" tone="critical" />}
                    id="validation-menu"
                    menu={
                      <Menu>
                        {CONSTRAINED_ITEMS.map((item, itemIndex) => (
                          // oxlint-disable-next-line no-array-index-key
                          <MenuItem key={itemIndex} padding={5} tone={item.tone}>
                            <Text>{item.message}</Text>
                          </MenuItem>
                        ))}
                      </Menu>
                    }
                    popover={{constrainSize: true, placement: 'bottom', portal: true}}
                  />
                </BoundaryElementProvider>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Box>
  )
}

export const ConstrainedInBoundary: Story = {
  parameters: {controls: {include: []}},
  render: () => <ConstrainedInBoundaryStory />,
}

export const DisableFocusOnClose: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <MenuButton
        __unstable_disableRestoreFocusOnClose
        button={
          <Button iconRight={ChevronDownIcon} mode="ghost" text="Should not focus after close" />
        }
        id="example"
        menu={
          <Menu>
            <MenuItem text="Test 1" />
            <MenuItem text="Test 2" />
            <MenuItem text="Test 3" />
          </Menu>
        }
        popover={{constrainSize: true, matchReferenceWidth: true}}
      />
    </Flex>
  ),
}

function WithOnCloseStory() {
  const {push} = useToast()

  const handleClose = useCallback(() => {
    push({
      title: 'Menu closed',
      status: 'success',
    })
  }, [push])

  return (
    <Box padding={[4, 5, 6]}>
      {/* oxlint-disable-next-line no-deprecated */}
      <Stack space={2}>
        <MenuButton
          button={<Button text="With onClose callback" />}
          id="closable-example"
          onClose={handleClose}
          menu={
            // oxlint-disable-next-line no-deprecated
            <Menu padding={0} space={0}>
              {/* oxlint-disable-next-line no-deprecated */}
              <Stack padding={1} space={1}>
                <MenuItem text="Item 1" />
                <MenuItem text="Item 2" />
                <MenuItem text="Item 3" />
                <MenuItem text="Item 4" />
              </Stack>
            </Menu>
          }
          popover={{constrainSize: true}}
        />
        <Button text="Blur test button" mode="ghost" />
      </Stack>
    </Box>
  )
}

export const WithOnClose: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <ToastProvider>
      <WithOnCloseStory />
    </ToastProvider>
  ),
}

export const CustomSelectedState: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={4}>
      <MenuButton
        button={<Button icon={ChevronDownIcon} mode="bleed" selected={false} text="Menu" />}
        id="test-menu"
        menu={
          <Menu>
            <MenuItem text="Item 1" />
            <MenuItem text="Item 2" />
          </Menu>
        }
      />
    </Box>
  ),
}
