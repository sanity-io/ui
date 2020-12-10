import {SanityMonogram} from '@sanity/logos'
import {Box, Button, Card, Flex, Inline, Switch, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'
import {useApp} from './hooks'
import {GitHubMark} from '$components'

interface Route {
  href: string
  title: string
}

export function Navbar() {
  const {colorScheme, nav = {}, setColorScheme} = useApp()
  const router = useRouter()

  const navbarRoutes: Route[] = (nav.items || [])
    .filter((item: any) => !item.hidden)
    .map((item: any) => ({
      href: `/${item.segment || ''}`,
      title: item.title,
    }))

  const handleSchemeSwitchChange = useCallback(
    (event) => {
      const {checked} = event.currentTarget

      setColorScheme(checked ? 'dark' : 'light')
    },
    [setColorScheme]
  )

  return (
    <Card as="header" borderBottom paddingX={[3, 4, 5]} paddingY={[2, 3, 4]}>
      <Flex as="nav" align="center">
        <Box flex={1}>
          <Flex align="center">
            <Flex align="center" flex={1}>
              <Link href="/" passHref>
                <Inline as="a" space={3}>
                  <SanityMonogram style={{fontSize: 25, verticalAlign: 'top'}} />
                  <Text accent size={[2, 2, 3]} weight="bold">
                    UI
                  </Text>
                </Inline>
              </Link>
            </Flex>

            <Inline space={2}>
              {navbarRoutes.map((route) => {
                const selected =
                  route.href === '/' ? router.asPath === '/' : router.asPath.startsWith(route.href)

                return (
                  <Link href={route.href} key={route.href} passHref>
                    <Button
                      aria-current={selected ? 'page' : undefined}
                      as="a"
                      fontSize={[2, 2, 3]}
                      mode="bleed"
                      padding={[1, 2, 3]}
                      selected={selected}
                      text={route.title}
                    />
                  </Link>
                )
              })}
            </Inline>
          </Flex>
        </Box>

        <Box paddingX={[2, 3, 4]}>
          <Switch
            checked={colorScheme === 'dark'}
            onChange={handleSchemeSwitchChange}
            style={{verticalAlign: 'top'}}
          />
        </Box>

        <Box>
          <Button
            as="a"
            fontSize={[2, 2, 3]}
            href="https://github.com/sanity-io/design"
            icon={GitHubMark}
            mode="bleed"
            rel="noopener noreferrer"
            target="_blank"
          />
        </Box>
      </Flex>
    </Card>
  )
}
