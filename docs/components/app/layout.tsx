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
  max-width: 12rem;
`

export function AppLayout(props: {children: React.ReactNode}) {
  return (
    <Root>
      <Content>
        <HeaderContainer flex={1}>
          <div style={{overflow: 'auto', position: 'sticky', top: 0, height: '100%'}}>
            <AppHeader />
          </div>
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
