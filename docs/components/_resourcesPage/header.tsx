import {Box, Button, Stack} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Box)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

function NavLink(props: {children: React.ReactNode; href: string}) {
  const router = useRouter()

  return (
    <Link href={props.href}>
      <Button
        as="a"
        justify="flex-start"
        mode="bleed"
        padding={[1, 2, 3]}
        text={props.children}
        selected={props.href === router.asPath}
        size={[2, 2, 2, 3]}
      />
    </Link>
  )
}

export function ResourcesPageHeader() {
  return (
    <Root data-name="ResourcesPageHeader" forwardedAs="header">
      <Box as="nav" padding={[2, 3, 4]}>
        <Stack space={1}>
          <NavLink href="/resources">Introduction</NavLink>
          <NavLink href="/resources/logos">Logos</NavLink>
          <NavLink href="/resources/colors">Colors</NavLink>
          <NavLink href="/resources/icons">Icons</NavLink>
        </Stack>
      </Box>
    </Root>
  )
}
