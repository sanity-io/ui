import {Box, Button, Card, Container, rem, useClickOutside} from '@sanity/ui'
import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {AppHeader} from './header'

const Root = styled(Card)`
  ${({theme}) => css`
    @media (max-width: ${rem(theme.media[1])}) {
      min-height: 100%;
    }

    @media (min-width: ${rem(theme.media[1])}) {
      display: grid;
      height: 100%;
      grid-template-columns: minmax(10rem, 18rem) 3fr;
    }
  `};
`

const SideMenu = styled(Card)`
  ${({theme}) => css`
    @media (max-width: ${rem(theme.media[1] - 1)}) {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      transform: translate3d(calc(-100% - 1px), 0, 0);
      transition: transform 200ms;
      width: 12rem;
      box-shadow: 0 0 0 1px var(--card-shadow-outline-color);

      &[data-open='true'] {
        transform: translate3d(0, 0, 0);
        box-shadow: 0 0 0 1px var(--card-shadow-outline-color),
          0 0 0 9999px var(--card-shadow-umbra-color);
      }
    }

    @media (min-width: ${rem(theme.media[1])}) {
      border-right: 1px solid var(--card-shadow-outline-color);
      position: sticky;
      top: 0;
    }
  `}
`

const ContentContainer = styled.div`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.media[1])}) {
      min-width: 30rem;
    }
  `}
`

const ContentCard = styled(Card)`
  min-height: 100%;
`

const NarrowDeviceMenu = styled(Box)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.media[1])}) {
      display: none !important;
    }
  `}
`

export function AppLayout(props: {children: React.ReactNode}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sideMenuElement, setSideMenuElement] = useState<HTMLDivElement | null>(null)

  const handleMenuOpenClick = () => setMenuOpen(true)

  useClickOutside(() => setMenuOpen(false), [sideMenuElement])

  return (
    <Root>
      <SideMenu data-open={menuOpen} forwardedAs="aside" ref={setSideMenuElement as any}>
        <AppHeader />
      </SideMenu>

      <ContentContainer>
        <NarrowDeviceMenu padding={[2, 4]}>
          <Button
            aria-label="Menu"
            icon="menu"
            mode="bleed"
            onClick={handleMenuOpenClick}
            size={[2, 3, 4]}
          />
        </NarrowDeviceMenu>

        <ContentCard>
          <Container as="main" width={2} style={{height: '100%'}}>
            <Box as="main" paddingX={[4, 5, 6, 7]} paddingY={[5, 6, 7, 8]}>
              {props.children}
            </Box>
          </Container>
        </ContentCard>
      </ContentContainer>
    </Root>
  )
}
