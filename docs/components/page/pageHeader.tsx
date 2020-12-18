import {Box} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {NavMenu} from '$components'
import {NavMenu as NavMenuType} from '$lib/nav'

const Root = styled(Box).attrs({forwardedAs: 'nav'})`
  height: 100vh;
  top: 0;
  position: sticky;
`

export function PageHeader({menu}: {menu: NavMenuType}) {
  return (
    <Root overflow="auto">
      {menu.items.map((item, itemIndex) => {
        if (item.type === 'menu') {
          return <NavMenu key={itemIndex} menu={item} />
        }

        return null
      })}
    </Root>
  )
}
