import {SanityLogo} from '@sanity/logos'
import {Button, Card, Inline, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'
import {useApp} from './hooks'

export function AppFooter() {
  const {colorScheme} = useApp()

  return (
    <Card borderTop paddingX={[3, 4, 5]} paddingY={[2, 3, 4]} style={{minHeight: 'auto'}}>
      <Inline space={1} style={{textAlign: 'center'}}>
        <Text muted size={[1, 1, 2]}>
          By
        </Text>

        <Link href="https://sanity.io" passHref>
          <Button
            as="a"
            fontSize={[1, 1, 2]}
            mode="bleed"
            padding={2}
            text={<SanityLogo aria-label="Sanity" dark={colorScheme === 'dark' || undefined} />}
          />
        </Link>

        <Text muted size={[1, 1, 2]}>
          the platform for structured content
        </Text>
      </Inline>
    </Card>
  )
}
