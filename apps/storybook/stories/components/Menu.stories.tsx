import {BinaryDocumentIcon, CircleIcon, RestoreIcon} from '@sanity/icons'
import {Menu, MenuDivider, MenuGroup, MenuItem} from '@sanity/ui/components/menu'
// import {
//   Badge,
//   Card,
//   Container,
//   Flex,
//   LayerProvider,
//   Menu,
//   MenuDivider,
//   MenuGroup,
//   MenuItem,
//   Stack,
//   Text,
// } from '@sanity/ui'
import {Badge} from '@sanity/ui/primitives/badge'
import {Card} from '@sanity/ui/primitives/card'
import {Container} from '@sanity/ui/primitives/container'
import {Flex} from '@sanity/ui/primitives/flex'
import {LayerProvider} from '@sanity/ui/primitives/layer'
import {Stack} from '@sanity/ui/primitives/stack'
import {Text} from '@sanity/ui/primitives/text'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {fn} from 'storybook/test'

import {SPACE_CONTROLS} from '../controls'

const meta: Meta<typeof Menu> = {
  args: {
    onClickOutside: fn(),
    onEscape: fn(),
    onItemClick: fn(),
    onItemSelect: fn(),
  },
  argTypes: {
    padding: SPACE_CONTROLS,
    gap: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
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
                popover={{placement: 'right'}}
                text="Menu item with submenu"
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
          <Flex align="center" as="span" gap={3}>
            {(text || subText) && (
              <Stack flex={1} gap={2}>
                {text && (
                  <Text size={fontSize} textOverflow="ellipsis" weight="medium">
                    {text}
                  </Text>
                )}
                {subText && (
                  <Text muted size={fontSize} textOverflow="ellipsis" weight={'regular'}>
                    {subText}
                  </Text>
                )}
              </Stack>
            )}
            {badgeText && <Badge fontSize={fontSize}>{badgeText}</Badge>}
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
              hotkeys={['Cmd', 'Alt', 'D']}
              icon={CircleIcon}
              id="menu-item-4"
              text="With hotkeys"
            />
            <LargeMenuItem
              disabled={props.disabled}
              id="menu-item-5"
              subText="Menu item subtitle"
              text="Menu item title"
            />
            <LargeMenuItem
              badgeText="Badge"
              disabled={props.disabled}
              id="menu-item-6"
              subText="Menu item subtitle"
              text="Menu item title"
            />
            <MenuGroup
              disabled={props.disabled}
              id="menu-group"
              popover={{placement: 'right'}}
              text="Menu item with submenu"
            >
              <MenuItem id="menu-group-1" text="Menu item" />
            </MenuGroup>
            <MenuDivider />
            <MenuItem
              disabled={props.disabled}
              id="menu-item-1-critical"
              text="Menu item title"
              tone="critical"
            />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              id="menu-item-2-critical"
              text="With icon"
              tone="critical"
            />
            <MenuItem
              disabled={props.disabled}
              icon={CircleIcon}
              iconRight={CircleIcon}
              id="menu-item-3-critical"
              text="With icon and right icon"
              tone="critical"
            />
            <MenuItem
              disabled={props.disabled}
              hotkeys={['Cmd', 'Alt', 'D']}
              icon={CircleIcon}
              id="menu-item-4-critical"
              text="With hotkeys"
              tone="critical"
            />
            <LargeMenuItem
              disabled={props.disabled}
              id="menu-item-5-critical"
              subText="Menu item subtitle"
              text="Menu item title"
              tone="critical"
            />
            <LargeMenuItem
              badgeText="Badge"
              disabled={props.disabled}
              id="menu-item-6-critical"
              subText="Menu item subtitle"
              text="Menu item title"
              tone="critical"
            />
            <MenuGroup
              disabled={props.disabled}
              id="menu-group"
              popover={{placement: 'right'}}
              text="Menu item with submenu"
              tone="critical"
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
                popover={{placement: 'right'}}
                text="Menu item with submenu"
              >
                <MenuItem id="menu-item-2-1" text="Menu item" />
                <MenuGroup
                  id="menu-item-2-2"
                  popover={{placement: 'right'}}
                  text="Menu item with submenu"
                >
                  <MenuItem id="menu-item-2-2-1" text="Menu item" />
                  <MenuItem id="menu-item-2-2-2" text="Menu item" />
                </MenuGroup>
              </MenuGroup>
              <MenuGroup
                disabled
                id="menu-item-2"
                popover={{placement: 'right'}}
                text="Menu item with submenu"
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
