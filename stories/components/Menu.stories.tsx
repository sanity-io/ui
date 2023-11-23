import {BinaryDocumentIcon, CircleIcon, RestoreIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Menu, MenuDivider, MenuGroup, MenuItem} from '../../src/core/components'
import {Badge, Card, Container, Flex, Stack, Text} from '../../src/core/primitives'
import {LayerProvider} from '../../src/core/utils'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof Menu> = {
  args: {},
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
