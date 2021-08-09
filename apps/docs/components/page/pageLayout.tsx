import {Box, Card, Flex, rem} from '@sanity/ui'
import React from 'react'
import styled, {css} from 'styled-components'
import {PageHeader} from './pageHeader'
import {NavMenu} from '$lib/nav'

export interface PageLayoutProps {
  children?: React.ReactNode
  menu?: NavMenu
  menuHeader?: React.ReactNode
}

const Root = styled(Flex)`
  position: relative;
`

const NavBox = styled(Box)`
  min-width: 12em;
  max-width: 22rem;
`

const ContentContainer = styled(Box)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.sanity.media[1])}) {
      min-width: 25.5rem;
    }
  `}
`

const ContentCard = styled(Card).attrs({forwardedAs: 'main'})`
  min-height: 100%;
`

export function PageLayout({children, menu, menuHeader}: PageLayoutProps) {
  return (
    <Card flex={1} style={{minHeight: 'auto'}}>
      <Root>
        {(menuHeader || (menu && menu.items.length > 1)) && (
          <NavBox display={['none', 'none', 'block']} flex={1}>
            <PageHeader header={menuHeader} menu={menu} />
          </NavBox>
        )}

        <ContentContainer flex={4}>
          <ContentCard id="content">{children}</ContentCard>
        </ContentContainer>
      </Root>
    </Card>
  )
}
