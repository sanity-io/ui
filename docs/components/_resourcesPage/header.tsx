import {Box, Stack} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {NavLink} from '$components'

const Root = styled(Box)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

export function ResourcesPageHeader() {
  return (
    <Root data-name="ResourcesPageHeader" forwardedAs="header">
      <Box as="nav" padding={[3, 4, 5]}>
        <Stack space={[2, 3, 4]}>
          <NavLink href="/resources" size={[2, 2, 2, 3]}>
            Introduction
          </NavLink>
          <NavLink href="/resources/logos" size={[2, 2, 2, 3]}>
            Logos
          </NavLink>
          <NavLink href="/resources/colors" size={[2, 2, 2, 3]}>
            Colors
          </NavLink>
          <NavLink href="/resources/icons" size={[2, 2, 2, 3]}>
            Icons
          </NavLink>
        </Stack>
      </Box>
    </Root>
  )
}
