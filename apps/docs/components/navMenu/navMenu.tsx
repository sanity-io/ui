import {ChevronDownIcon} from '@sanity/icons'
import {Box, Card, Flex, Label, Stack} from '@sanity/ui'
import {useState} from 'react'
import styled from 'styled-components'
import {NavLink} from '$components/navLink'
import {NavMenu as NavMenuType, NavMenuItem} from '$lib/nav'

const AnimatedChevronDownIcon = styled(ChevronDownIcon)`
  transition: transform 100ms;

  & path {
    stroke-width: 2 !important;
  }
`

export function NavMenu({menu}: {menu: NavMenuType}) {
  if (menu.title) {
    return <LabeledNavMenu menu={menu} />
  }

  return (
    <Box padding={[4, 4, 5]}>
      <NavMenuItems items={menu.items} />
    </Box>
  )
}

function NavMenuItems({items}: {items: NavMenuItem[]}) {
  return (
    <Stack space={4}>
      {items.map((item, itemIndex) => {
        if (item.type === 'menuLink') {
          return (
            <Box key={itemIndex}>
              <NavLink
                href={item.href}
                size={2}
                style={item.hidden ? {opacity: 0.25} : undefined}
                weight="medium"
              >
                {item.title}
              </NavLink>
            </Box>
          )
        }

        return null
      })}
    </Stack>
  )
}

function LabeledNavMenu({menu}: {menu: NavMenuType}) {
  const [collapsed, setCollapsed] = useState<boolean>(menu.collapsed || false)

  return (
    <div>
      <Card
        borderTop
        onClick={() => setCollapsed((v) => !v)}
        padding={[4, 4, 5]}
        paddingBottom={collapsed ? [4, 4, 5] : [4, 4, 4]}
        style={{cursor: 'pointer'}}
      >
        <Flex justify="space-between">
          <Label size={2} weight="medium">
            {menu.title}
          </Label>
          <Label muted size={2}>
            <AnimatedChevronDownIcon
              style={{
                transform: `rotate(${collapsed ? '90deg' : '0'})`,
              }}
            />
          </Label>
        </Flex>
      </Card>

      <Box hidden={collapsed} padding={[4, 4, 5]} paddingTop={[0, 0, 0]}>
        <NavMenuItems items={menu.items} />
      </Box>
    </div>
  )
}
