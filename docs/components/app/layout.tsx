import {Box, Card, Container, rem, Button} from '@sanity/ui'
import React from 'react'
import styled, {css} from 'styled-components'
import {AppHeader} from './header'

const Root = styled.div`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.media[1])}) {
      display: flex;
      height: 100%;
    }
  `};
`

const SideMenu = styled(Card)`
  height: 100vh;
  overflow: auto;

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
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);

      &[data-open='true'] {
        transform: translate3d(0, 0, 0);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 9999px rgba(0, 0, 0, 0.1);
      }
    }

    @media (min-width: ${rem(theme.media[1])}) {
      flex: 1;
      max-width: 20rem;
      min-width: 10rem;
      border-right: 1px solid #ccc;
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
      display: none;
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
        <NarrowDeviceMenu padding={[4, 5]}>
          <Button onClick={handleMenuOpenClick}>Menu</Button>
        </NarrowDeviceMenu>

        <Container as="main" width={1}>
          <Box as="main" padding={[4, 5]}>
            {props.children}
          </Box>
        </Container>
      </ContentContainer>
    </Root>
  )
}
