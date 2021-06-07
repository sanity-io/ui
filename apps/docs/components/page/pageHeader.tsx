import {Layer} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {NavMenu} from '$components/navMenu'
import {NavMenu as NavMenuType} from '$lib/nav'

const Root = styled(Layer).attrs({forwardedAs: 'nav'})`
  height: 100vh;
  top: 0;
  position: sticky;
  overflow: auto;
  border-right: 1px solid var(--card-border-color);
`

export function PageHeader({header, menu}: {header: React.ReactNode; menu: NavMenuType}) {
  return (
    <Root>
      {header}

      {menu.items.map((item, itemIndex) => {
        if (item.type === 'menu') {
          return <NavMenu key={itemIndex} menu={item} />
        }

        return null
      })}
    </Root>
  )
}
