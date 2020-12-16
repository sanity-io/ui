import {SanityLogo} from '@sanity/logos'
import {Button, Card, Inline, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'
import {useApp} from './hooks'

export function AppFooter() {
  const app = useApp()

  return (
    <Card
      borderTop
      paddingX={[4, 5, 6]}
      paddingY={[3, 4, 5]}
      style={{position: 'relative', textAlign: 'center'}}
    >
      <Inline space={1}>
        <Text muted size={[1, 1, 2]}>
          By
        </Text>

        <Link href="https://sanity.io" passHref>
          <Button
            as="a"
            fontSize={[1, 1, 2]}
            mode="bleed"
            padding={2}
            text={<SanityLogo dark={app.colorScheme === 'dark' ? true : undefined} />}
          />
        </Link>

        <Text muted size={[1, 1, 2]}>
          the platform for structured content
        </Text>
      </Inline>
    </Card>
  )
}
