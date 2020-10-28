import {Box, Button, Card, Flex, Inline, Switch} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {useApp} from './hooks'

const RootRoot = styled(Flex)`
  height: 100%;
`

export function AppLayout({children}: {children: React.ReactNode}) {
  const {colorScheme, setColorScheme} = useApp()
  const router = useRouter()

  return (
    <RootRoot direction="column">
      <Card padding={[2, 3, 4]} style={{borderBottom: '1px solid var(--card-hairline-soft-color)'}}>
        <Flex align="center">
          <Box flex={1}>
            <Flex>
              <Box marginRight={2}>
                <Link href="/">
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    text={<strong>Sanity Design</strong>}
                  />
                </Link>
              </Box>
              <Inline space={2}>
                <Link href="/design">
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/design')}
                    text="Design"
                  />
                </Link>
                <Link href="/ui">
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/ui')}
                    text="UI"
                  />
                </Link>
                <Link href="/arcade">
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/arcade')}
                    text="Arcade"
                  />
                </Link>
                <Link href="/resources">
                  <Button
                    as="a"
                    mode="bleed"
                    padding={[1, 2, 3]}
                    selected={router.asPath.startsWith('/resources')}
                    text="Resources"
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
    </RootRoot>
  )
}
