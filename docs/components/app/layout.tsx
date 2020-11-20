import {SanityLogo} from '@sanity/logos'
import {Box, Button, Card, Flex, Inline, Switch} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import {useApp} from './hooks'

interface Route {
  href: string
  title: string
}

function ThemedSanityLogo() {
  const dark = useApp().colorScheme === 'dark'

  return <SanityLogo dark={dark} />
}

export function AppLayout({children}: {children: React.ReactNode}) {
  const {colorScheme, features, setColorScheme} = useApp()
  const router = useRouter()

  const navbarRoutes = [
    features.designDocs && {href: '/design', title: 'Design'},
    features.uiDocs && {href: '/ui', title: 'UI'},
    features.arcade && {href: '/arcade', title: 'Arcade'},
    features.resourcesDocs && {href: '/resources', title: 'Resources'},
    features.changelog && {href: '/changelog', title: 'Changelog'},
  ].filter(Boolean) as Route[]

  return (
    <Flex direction="column" height="fill">
      <Card padding={[2, 3, 4]} borderBottom>
        <Flex align="center">
          <Box flex={1}>
            <Flex>
              <Inline space={2}>
                {navbarRoutes.map((route, routeIndex) => (
                  <Link href={route.href} key={route.href} passHref>
                    <Button
                      as="a"
                      icon={routeIndex === 0 ? ThemedSanityLogo : undefined}
                      mode="bleed"
                      padding={[1, 2, 3]}
                      selected={router.asPath.startsWith(route.href)}
                      size={[2, 2, 3]}
                      text={route.title}
                    />
                  </Link>
                ))}
              </Inline>
            </Flex>
          </Box>

          <Box paddingX={[1, 2, 3]}>
            <Switch
              checked={colorScheme === 'dark'}
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  setColorScheme('dark')
                } else {
                  setColorScheme('light')
                }
              }}
              style={{verticalAlign: 'top'}}
            />
          </Box>
        </Flex>
      </Card>

      {children}
    </Flex>
  )
}
