import {HeartIcon} from '@sanity/icons'
import {SanityLogo} from '@sanity/logos'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'
import {useApp} from './hooks'

export function AppFooter() {
  const {colorScheme} = useApp()

  return (
    <Card borderTop paddingX={[3, 4, 5]} paddingY={[1, 2, 3]} style={{minHeight: 'auto'}}>
      <Flex align="center" as="p" gap={1} justify="center">
        <Text as="span" muted size={1}>
          Made with
        </Text>

        <Box as="span" paddingX={1}>
          <Text as="span" accent size={1}>
            <HeartIcon aria-label="love" />
          </Text>
        </Box>

        <Text as="span" muted size={1}>
          by folks at
        </Text>

        <Link href="https://sanity.io" passHref>
          <Button as="a" mode="bleed" padding={1} tone="critical">
            <Text as="span" size={1}>
              <SanityLogo aria-label="Sanity" dark={colorScheme === 'dark' || undefined} />
            </Text>
          </Button>
        </Link>

        {/* <Text muted size={1}>
          the platform for structured content
        </Text> */}
      </Flex>
    </Card>
  )
}
