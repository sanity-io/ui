import {gray, white} from '@sanity/color'
import {MenuIcon, MoonIcon, SunIcon} from '@sanity/icons'
import {SanityMonogram, SanityMonogramColor} from '@sanity/logos'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useCallback, useMemo, useState} from 'react'
import {features, sanity} from '../../config'
import {isArray, isRecord} from '../../lib/types'
import {GitHubMark} from '../assets'
import {useApp} from './hooks'
import {NavDrawer} from './navDrawer'

interface AppNavbarRoute {
  hidden: boolean
  href: string
  title: string
}

export function AppNavbar() {
  const {colorScheme, data, menu, setColorScheme} = useApp()
  const monogramColor: SanityMonogramColor | undefined = useMemo(
    () =>
      sanity.dataset === 'production'
        ? undefined
        : {bg1: gray['500'].hex, bg2: gray['200'].hex, fg: white.hex},
    []
  )
  const nav = isRecord(data) && data.nav
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = isRecord(nav) && isArray(nav.items) ? nav.items : []
  const navItemRecords: Record<string, unknown>[] = navItems.filter(isRecord)
  const navbarRoutes: AppNavbarRoute[] = navItemRecords
    .filter((item) => features.hintHiddenContent || !item.hidden)
    .map((item) => ({
      hidden: Boolean(item.hidden),
      href: `/${item.segment || ''}`,
      title: String(item.title),
    }))

  const handleToggleColorSchemeChange = useCallback(() => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
  }, [colorScheme, setColorScheme])

  const handleMenuClose = useCallback(() => setMenuOpen(false), [])

  return (
    <Card as="header" borderBottom padding={[2, 3, 4]}>
      <Flex as="nav" align="center">
        <Flex align="center" flex={1}>
          <Link href="/" passHref>
            <Button as="a" mode="bleed" padding={3} radius={2}>
              <Flex align="center">
                <SanityMonogram
                  aria-label="Sanity UI"
                  color={monogramColor}
                  style={{fontSize: 25, margin: '-7px 0 -7px -7px'}}
                />

                <Box marginLeft={3}>
                  <Text weight="bold" style={{color: 'var(--card-fg-color)'}}>
                    UI
                  </Text>
                </Box>
              </Flex>
            </Button>
          </Link>

          <Box flex={1} marginLeft={2}>
            <Flex gap={2}>
              {navbarRoutes.map((route) => {
                const selected =
                  route.href === '/' ? router.asPath === '/' : router.asPath.startsWith(route.href)

                return (
                  <Link href={route.href} key={route.href} passHref>
                    <Button
                      aria-current={selected ? 'page' : undefined}
                      as="a"
                      mode="bleed"
                      padding={[1, 2, 3]}
                      selected={selected}
                      style={route.hidden ? {opacity: 0.25} : undefined}
                      text={route.title}
                    />
                  </Link>
                )
              })}
            </Flex>
          </Box>
        </Flex>

        <Box marginLeft={[2, 3, 4]}>
          <Button
            aria-label="Toggle color scheme"
            icon={colorScheme === 'light' ? MoonIcon : SunIcon}
            mode="bleed"
            onClick={handleToggleColorSchemeChange}
          />
        </Box>

        <Box marginLeft={[1, 1, 2]}>
          <Button
            aria-label="Open GitHub repository"
            as="a"
            href="https://github.com/sanity-io/design"
            icon={GitHubMark}
            mode="bleed"
            rel="noopener noreferrer"
            target="_blank"
          />
        </Box>

        {menu && (
          <Box display={['block', 'block', 'none']} marginLeft={[1, 2, 3]}>
            <Button icon={MenuIcon} mode="bleed" onClick={() => setMenuOpen(true)} />
          </Box>
        )}

        {menu && <NavDrawer menu={menu} onClose={handleMenuClose} open={menuOpen} />}
      </Flex>
    </Card>
  )
}
