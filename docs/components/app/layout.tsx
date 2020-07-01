import {Box, Container, Flex} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {AppHeader} from './header'

const Root = styled(Container)`
  height: 100%;
`

const Content = styled(Flex)`
  height: 100%;
`

const HeaderContainer = styled(Box)`
  max-width: 10rem;
  min-width: 7rem !important;
  width: 100%;
`

export function AppLayout(props: {children: React.ReactNode}) {
  return (
    <Root>
      <Content>
        <HeaderContainer flex={1}>
          <AppHeader />
        </HeaderContainer>

        <Box flex={3}>
          <Container as="main" width={1}>
            {props.children}
          </Container>
        </Box>
      </Content>
    </Root>
  )
}
