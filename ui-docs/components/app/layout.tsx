import {Box, Card, Container, rem, Button} from '@sanity/ui'
import React from 'react'
import styled, {css} from 'styled-components'
import {AppHeader} from './header'

const Root = styled(Card)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.media[1])}) {
      display: grid;
      height: 100%;
      grid-template-columns: minmax(10rem, 15rem) 3fr;
    }
  `};
`

const SideMenu = styled(Card)`
  /* height: 100vh; */

  ${({theme}) => css`
    @media (max-width: ${rem(theme.media[1] - 1)}) {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      transform: translate3d(-100%, 0, 0);
      transition: transform 200ms;
      width: 10rem;
      box-shadow: 0 0 0 1px var(--card-shadow-outline-color);

      &[data-open='true'] {
        transform: translate3d(0, 0, 0);
        box-shadow: 0 0 0 1px var(--card-shadow-outline-color),
          0 0 0 9999px var(--card-shadow-umbra-color);
      }
    }

    @media (min-width: ${rem(theme.media[1])}) {
      flex: 1;
      /* max-width: 15rem; */
      /* min-width: 10rem; */
      border-right: 1px solid var(--card-shadow-outline-color);
      position: sticky;
      top: 0;
    }
  `}
`

const ContentContainer = styled.div`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.media[1])}) {
      flex: 3;
      min-width: 30rem;
    }
  `}
`

const NarrowDeviceMenu = styled(Box)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.media[1])}) {
      display: none !important;
    }
  `}
`

export function AppLayout(props: {children: React.ReactNode}) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleMenuOpenClick = () => {
    setMenuOpen(true)
  }

  return (
    <Root>
      <SideMenu data-open={menuOpen} forwardedAs="aside">
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

        <Container as="main" width={2}>
          <Box as="main" padding={[4, 5]} paddingY={[5, 5, 6, 7]}>
            {props.children}
          </Box>
        </Container>
      </ContentContainer>
    </Root>
  )
}
