import {Box, Card, Flex, Icon, Label} from '@sanity/ui'
import React, {useState} from 'react'
import styled from 'styled-components'
import {NavLink} from '$components'

const Root = styled(Box).attrs({forwardedAs: 'nav'})`
  height: 100vh;
  top: 0;
  position: sticky;
`

interface NavItemType {
  title: string
}

function NavItem(props: any) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {props.href && (
        <Box padding={3}>
          <NavLink href={props.href} size={[2, 2, 3]} weight="medium">
            {props.menuTitle || props.title}
          </NavLink>
        </Box>
      )}

      {!props.href && (
        <Box onClick={() => setCollapsed((v) => !v)} paddingX={3} paddingTop={5} paddingBottom={3}>
          <Flex justify="space-between">
            <Label size={[2, 2, 3]} weight="medium">
              {props.menuTitle || props.title}
            </Label>
            <Label muted size={[2, 2, 3]}>
              <Icon symbol={collapsed ? 'chevron-down' : 'chevron-up'} />
            </Label>
          </Flex>
        </Box>
      )}

      {props.items.length > 0 && (
        <Box
          hidden={collapsed}
          // paddingLeft={3}
        >
          {props.items.map((item: any, itemIndex: number) => (
            <NavItem {...item} key={itemIndex} />
          ))}
        </Box>
      )}
    </>
  )
}

function NavMenu({
  href,
  items,
  menuTitle,
  title,
}: {
  href?: string
  items: NavItemType[]
  menuTitle?: string
  title: string
}) {
  return (
    <Card padding={[3, 4]}>
      <NavItem href={href || '/'} items={[]} menuTitle={menuTitle} title={title} />

      {items.map((item: any, itemIndex: number) => (
        <NavItem {...item} key={itemIndex} />
      ))}
    </Card>
  )
}

export function PageHeader({structure}: {structure: any}) {
  return (
    <Root overflow="auto">
      <NavMenu {...structure} />
    </Root>
  )
}
