import {
  AddIcon,
  BinaryDocumentIcon,
  BookIcon,
  CircleIcon,
  CopyIcon,
  CubeIcon,
  EllipsisVerticalIcon,
  ImageIcon,
  RestoreIcon,
  TrashIcon,
  UsersIcon,
} from '@sanity/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Hotkeys,
  Inline,
  LayerProvider,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Popover,
  Stack,
  Text,
} from '@sanity/ui'
import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Fragment, useCallback, useState} from 'react'
import {fn} from 'storybook/test'

import {getSpaceControls} from '../controls'

const meta: Meta<typeof Menu> = {
  args: {
    onClickOutside: fn(),
    onEscape: fn(),
    onItemClick: fn(),
    onItemSelect: fn(),
  },
  argTypes: {
    padding: getSpaceControls(),
    space: getSpaceControls(),
    disabled: {control: 'boolean'},
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
  },
  component: Menu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  render: (props) => {
    return (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Menu {...props}>
              <MenuItem icon={RestoreIcon} id="menu-item-1" text="Review changes" />
              <MenuItem icon={BinaryDocumentIcon} id="menu-item-2" text="Inspect" />
              <MenuDivider />
              <MenuGroup
                id="menu-item-2"
                text="Menu item with submenu"
                popover={{placement: 'right'}}
              >
                <MenuItem id="menu-item-2-1" text="Menu item" />
                <MenuItem id="menu-item-2-2" text="Menu item" />
              </MenuGroup>
            </Menu>
          </LayerProvider>
        </Card>
      </Container>
    )
  },
}

export const MenuItemsVariants: Story = {
  render: (props) => {
    // This is a representation of the LargeMenuItem that we will need to build into the Studio UI.
    const LargeMenuItem = (
      props: Omit<React.ComponentProps<typeof MenuItem>, 'hotkeys' | 'icon' | 'iconRight'> & {
        text: string
        subText: string
        badgeText?: string
      },
    ) => {
      const {subText, disabled, text, badgeText, tone} = props
      const fontSize = 1

      return (
        <MenuItem disabled={disabled} id="menu-item-1" tone={tone}>
          <Flex as="span" gap={3} align="center">
            {(text || subText) && (
              <Stack flex={1} space={2}>
                {text && (
                  <Text size={fontSize} textOverflow="ellipsis" weight="medium">
                    {text}
                  </Text>
                )}
                {subText && (
                  <Text size={fontSize} textOverflow="ellipsis" weight={'regular'} muted>
                    {subText}
                  </Text>
                )}
              </Stack>
            )}
            {badgeText && (
              <Badge fontSize={fontSize} mode="default">
                {badgeText}
              </Badge>
            )}
          </Flex>
        </MenuItem>
      )
    }

    const MenuWithVariants = (
      props: React.ComponentProps<typeof Menu> & {
        disabled: boolean
      },
    ) => (
      <Card radius={3} shadow={2}>
        <LayerProvider>
          <Menu {...props}>
            <MenuItem disabled={props.disabled} id="menu-item-1" text="Menu item title" />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              id="menu-item-2"
              text="With icon"
            />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              iconRight={CircleIcon}
              id="menu-item-3"
              text="With icon and right icon"
            />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              id="menu-item-4"
              text="With hotkeys"
              hotkeys={['Cmd', 'Alt', 'D']}
            />
            <LargeMenuItem
              disabled={props.disabled}
              id="menu-item-5"
              text="Menu item title"
              subText="Menu item subtitle"
            />
            <LargeMenuItem
              disabled={props.disabled}
              id="menu-item-6"
              text="Menu item title"
              subText="Menu item subtitle"
              badgeText="Badge"
            />
            <MenuGroup
              id="menu-group"
              text="Menu item with submenu"
              popover={{placement: 'right'}}
              disabled={props.disabled}
            >
              <MenuItem id="menu-group-1" text="Menu item" />
            </MenuGroup>
            <MenuDivider />
            <MenuItem
              disabled={props.disabled}
              id="menu-item-1-critical"
              tone="critical"
              text="Menu item title"
            />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              id="menu-item-2-critical"
              tone="critical"
              text="With icon"
            />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              iconRight={CircleIcon}
              id="menu-item-3-critical"
              tone="critical"
              text="With icon and right icon"
            />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              id="menu-item-4-critical"
              tone="critical"
              text="With hotkeys"
              hotkeys={['Cmd', 'Alt', 'D']}
            />
            <LargeMenuItem
              disabled={props.disabled}
              id="menu-item-5-critical"
              tone="critical"
              text="Menu item title"
              subText="Menu item subtitle"
            />
            <LargeMenuItem
              disabled={props.disabled}
              id="menu-item-6-critical"
              tone="critical"
              text="Menu item title"
              subText="Menu item subtitle"
              badgeText="Badge"
            />
            <MenuGroup
              tone="critical"
              disabled={props.disabled}
              id="menu-group"
              text="Menu item with submenu"
              popover={{placement: 'right'}}
            >
              <MenuItem id="menu-group-1" text="Menu item" />
            </MenuGroup>
          </Menu>
        </LayerProvider>
      </Card>
    )

    return (
      <Container width={1}>
        <Flex gap={4} wrap="wrap">
          <MenuWithVariants {...props} disabled={false} />
          <MenuWithVariants {...props} disabled={true} />
        </Flex>
      </Container>
    )
  },
}

export const WithSubMenu: Story = {
  render: (props) => {
    return (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Menu {...props}>
              <MenuItem id="menu-item-1" text="Menu item" />
              <MenuGroup
                id="menu-item-2"
                text="Menu item with submenu"
                popover={{placement: 'right'}}
              >
                <MenuItem id="menu-item-2-1" text="Menu item" />
                <MenuGroup
                  id="menu-item-2-2"
                  text="Menu item with submenu"
                  popover={{placement: 'right'}}
                >
                  <MenuItem id="menu-item-2-2-1" text="Menu item" />
                  <MenuItem id="menu-item-2-2-2" text="Menu item" />
                </MenuGroup>
              </MenuGroup>
              <MenuGroup
                id="menu-item-2"
                text="Menu item with submenu"
                disabled
                popover={{placement: 'right'}}
              >
                <MenuItem id="menu-item-2-1" text="Menu item" />
              </MenuGroup>
            </Menu>
          </LayerProvider>
        </Card>
      </Container>
    )
  },
}

export const NestedMenuItems: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      <MenuButton
        button={<Button text="Open" />}
        id="nested-example"
        menu={
          <Menu>
            <Stack space={1}>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
            </Stack>
            <MenuDivider />
            <MenuItem text="Item 3" />
          </Menu>
        }
      />
    </Box>
  ),
}

const GROUPS_POPOVER_PROPS: MenuButtonProps['popover'] = {
  placement: 'bottom',
  portal: true,
  preventOverflow: true,
}

const GROUPS_NESTED_POPOVER_PROPS: MenuButtonProps['popover'] = {
  placement: 'right-start',
  portal: true,
  preventOverflow: true,
}

export const Groups: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      <Card padding={1} radius={3} shadow={1}>
        <Inline space={1}>
          <LayerProvider>
            <MenuButton
              button={<Button fontSize={1} mode="bleed" padding={2} text="File" />}
              id="example"
              menu={
                <Menu>
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'T']}
                    onClick={fn()}
                    padding={2}
                    text="New tab"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'N']}
                    onClick={fn()}
                    padding={2}
                    text="New window"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⇧', '⌘', 'T']}
                    onClick={fn()}
                    padding={2}
                    text="Reopen closed tab"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'O']}
                    onClick={fn()}
                    padding={2}
                    text="Open file…"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'L']}
                    onClick={fn()}
                    padding={2}
                    text="Open location…"
                  />
                  <MenuDivider />
                  <MenuGroup
                    fontSize={1}
                    onClick={fn()}
                    padding={2}
                    popover={GROUPS_NESTED_POPOVER_PROPS}
                    text="Share"
                  >
                    <MenuItem fontSize={1} onClick={fn()} padding={2} text="Email link" />
                    <MenuItem fontSize={1} onClick={fn()} padding={2} text="Messages" />
                    <MenuItem fontSize={1} onClick={fn()} padding={2} text="Airdrop" />
                    <MenuItem fontSize={1} onClick={fn()} padding={2} text="Notes" />
                    <MenuGroup
                      fontSize={1}
                      onClick={fn()}
                      padding={2}
                      popover={GROUPS_NESTED_POPOVER_PROPS}
                      text="More"
                    >
                      <MenuItem fontSize={1} onClick={fn()} padding={2} text="Email link" />
                      <MenuItem fontSize={1} onClick={fn()} padding={2} text="Messages" />
                      <MenuItem fontSize={1} onClick={fn()} padding={2} text="Airdrop" />
                      <MenuItem fontSize={1} onClick={fn()} padding={2} text="Notes" />
                    </MenuGroup>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'P']}
                    onClick={fn()}
                    padding={2}
                    text="Print…"
                  />
                </Menu>
              }
              popover={GROUPS_POPOVER_PROPS}
            />
          </LayerProvider>

          <Button disabled fontSize={1} mode="bleed" padding={2} text="Edit" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="View" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Window" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Help" />
        </Inline>
      </Card>
    </Box>
  ),
}

const MENU_GROUP_RIGHT_POPOVER_PROPS: MenuButtonProps['popover'] = {
  placement: 'right',
  portal: true,
  preventOverflow: true,
}

export const MenuGroupRight: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Card height="fill" tone="transparent">
      <Flex align="center" height="fill" padding={4} sizing="border">
        <Container width={1}>
          <Card padding={2} radius={2} shadow={2}>
            <Flex>
              <Box flex={1} />
              <Box>
                <MenuButton
                  button={<Button icon={EllipsisVerticalIcon} mode="bleed" />}
                  id="right-menu"
                  menu={
                    <Menu>
                      <MenuGroup icon={AddIcon} popover={{placement: 'left'}} text="Add above">
                        <MenuItem icon={ImageIcon} text="Image" />
                        <MenuItem icon={BookIcon} text="Book" />
                      </MenuGroup>
                      <MenuGroup icon={AddIcon} popover={{placement: 'left'}} text="Add below">
                        <MenuItem icon={ImageIcon} text="Image" />
                        <MenuItem icon={BookIcon} text="Book" />
                      </MenuGroup>
                      <MenuDivider />
                      <MenuItem icon={CopyIcon} text="Duplicate" />
                      <MenuItem icon={TrashIcon} text="Remove" tone="critical" />
                    </Menu>
                  }
                  popover={MENU_GROUP_RIGHT_POPOVER_PROPS}
                />
              </Box>
            </Flex>
          </Card>
        </Container>
      </Flex>
    </Card>
  ),
}

export const Tones: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Card radius={3} shadow={3}>
          <Menu>
            {THEME_COLOR_STATE_TONES.map((tone) => (
              <MenuItem icon={CubeIcon} key={tone} text={tone} tone={tone} />
            ))}
          </Menu>
        </Card>
      </Box>
    </LayerProvider>
  ),
}

const SHOULD_FOCUS_ITEMS = [...Array(8).keys()].map((num) => ({
  title: `Item ${num + 1}`,
  divider: num === 3,
}))

function ShouldFocusStory() {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const handleToggleOpen = useCallback(() => setPopoverOpen((v) => !v), [])

  return (
    <LayerProvider>
      <Flex align="center" justify="center" padding={4}>
        <Popover
          content={
            <Menu shouldFocus="first">
              {SHOULD_FOCUS_ITEMS.map((item) => {
                return (
                  <Fragment key={item.title}>
                    <MenuItem text={item.title} />
                    {item.divider && <MenuDivider />}
                  </Fragment>
                )
              })}
            </Menu>
          }
          open={popoverOpen}
          portal
        >
          <Button text="Open menu" onClick={handleToggleOpen} />
        </Popover>
      </Flex>
    </LayerProvider>
  )
}

export const ShouldFocus: Story = {
  parameters: {controls: {include: []}},
  render: () => <ShouldFocusStory />,
}

export const AvatarMenu: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center">
      <MenuButton
        button={<Button icon={UsersIcon} />}
        id="avatar-menu"
        menu={
          <Menu>
            <MenuItem padding={0}>
              <Flex align="center" padding={1}>
                <Box flex="none">
                  <Avatar color="purple" initials="JS" />
                </Box>
                <Box flex={1} padding={2}>
                  <Text size={1}>Jane Smith</Text>
                </Box>
                <Box padding={1}>
                  <Badge>Me</Badge>
                </Box>
                <Box padding={1}>
                  <Hotkeys keys={['Cmd', '1']} />
                </Box>
              </Flex>
            </MenuItem>
            <MenuItem padding={0}>
              <Flex align="center" padding={1}>
                <Box flex="none">
                  <Avatar color="magenta" initials="JS" />
                </Box>
                <Box flex={1} padding={2}>
                  <Text size={1}>John Doe</Text>
                </Box>
                <Box padding={1}>
                  <Hotkeys keys={['Cmd', '2']} />
                </Box>
              </Flex>
            </MenuItem>
          </Menu>
        }
      />
    </Flex>
  ),
}
