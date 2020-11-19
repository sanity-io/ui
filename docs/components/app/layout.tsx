import {SanityMonogram} from '@sanity/logos'
import {Box, Button, Card, Flex, Inline, Switch} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import {useApp} from './hooks'

export function AppLayout({children}: {children: React.ReactNode}) {
  const {colorScheme, setColorScheme} = useApp()
  const router = useRouter()

  return (
    <Flex direction="column" height="fill">
      <Card padding={[2, 3, 4]} borderBottom>
        <Flex align="center">
          <Box flex={1}>
            <Flex>
              <Box marginRight={2}>
                <Link href="/" passHref>
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    radius={3}
                    size={[2, 2, 3]}
                    text={<SanityMonogram />}
                  />
                </Link>
              </Box>
              <Inline space={2}>
                {/* <Link href="/design" passHref>
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/design')}
                    size={[2, 2, 3]}
                    text="Design"
                  />
                </Link> */}
                <Link href="/ui" passHref>
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/ui')}
                    size={[2, 2, 3]}
                    text="UI"
                  />
                </Link>
                <Link href="/resources" passHref>
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/resources')}
                    size={[2, 2, 3]}
                    text="Resources"
                  />
                </Link>
                <Link href="/arcade" passHref>
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/arcade')}
                    size={[2, 2, 3]}
                    text="Arcade"
                  />
                </Link>
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
