import {Box, Card, Flex, rem} from '@sanity/ui'
import React from 'react'
import styled, {css} from 'styled-components'
import {PageHeader} from './pageHeader'
import {NavMenu} from '$lib/nav'

interface PageLayoutProps {
  children: React.ReactNode
  menu: NavMenu | null
}

const Root = styled(Flex)`
  position: relative;
`

const ContentContainer = styled(Box)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.sanity.media[1])}) {
      min-width: 30rem;
    }
  `}
`

const ContentCard = styled(Card).attrs({forwardedAs: 'main'})`
  min-height: 100%;
`

export function PageLayout({children, menu}: PageLayoutProps) {
  return (
    <Root>
      {menu && (
        <Box
          display={['none', 'none', 'block']}
          flex={1}
          style={{minWidth: '12em', maxWidth: '16em'}}
        >
          <PageHeader menu={menu} />
        </Box>
      )}

      <ContentContainer flex={4}>
        <ContentCard id="content">{children}</ContentCard>
      </ContentContainer>
    </Root>
  )
}
