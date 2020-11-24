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
    @media (min-width: ${rem(theme.media[1])}) {
      min-width: 30rem;
    }
  `}
`

const ContentCard = styled(Card).attrs({forwardedAs: 'main'})`
  min-height: 100%;
`

const NarrowDeviceMenu = styled(Box)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.media[1])}) {
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
        style={{minWidth: '10em', maxWidth: '20em'}}
      >
        <NavDrawer open={menuOpen} ref={setNavDrawerElement}>
          <PageHeader structure={structure} />
        </NavDrawer>
      </Box>

      <ContentContainer flex={4}>
        <NarrowDeviceMenu padding={[2, 4]}>
          <Button
            aria-label="Menu"
            icon="menu"
            mode="bleed"
            onClick={handleMenuOpenClick}
            size={[2, 3, 4]}
          />
        </NarrowDeviceMenu>

        <ContentCard id="content">
          {children}
          {/* <Container as="main" width={wide ? 3 : 2}>
            <Box paddingX={[4, 5, 6, 7]} paddingY={[5, 6, 7, 8]}>
              {children}
            </Box>
          </Container> */}
        </ContentCard>
      </ContentContainer>
    </Root>
  )
}
