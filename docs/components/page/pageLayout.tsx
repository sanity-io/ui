import {MenuIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, rem, useClickOutside} from '@sanity/ui'
import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {PageHeader} from './pageHeader'
import {NavDrawer} from '$components'

interface PageLayoutProps {
  children: React.ReactNode
  structure: any
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

const NarrowDeviceMenu = styled(Box)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.sanity.media[1])}) {
      &&:not([hidden]) {
        display: none;
      }
    }
  `}
`

export function PageLayout({children, structure}: PageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navDrawerElement, setNavDrawerElement] = useState<HTMLDivElement | null>(null)

  const handleMenuOpenClick = () => setMenuOpen(true)

  useClickOutside(() => setMenuOpen(false), [navDrawerElement])

  return (
    <Root>
      <Box
        display={['none', 'none', 'block']}
        flex={1}
        style={{minWidth: '12em', maxWidth: '16em'}}
      >
        <NavDrawer open={menuOpen} ref={setNavDrawerElement}>
          <PageHeader structure={structure} />
        </NavDrawer>
      </Box>

      <ContentContainer flex={4}>
        <NarrowDeviceMenu padding={[2, 4]}>
          <Button
            aria-label="Menu"
            fontSize={[2, 3, 4]}
            icon={MenuIcon}
            mode="bleed"
            onClick={handleMenuOpenClick}
          />
        </NarrowDeviceMenu>

        <ContentCard id="content">{children}</ContentCard>
      </ContentContainer>
    </Root>
  )
}
