import {Box, Button, Text, Flex, Inline} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'

export function AppHeader() {
  return (
    <Box as="header" style={{borderBottom: '1px solid #ccc'}}>
      <Flex>
        <Box as="a" flex={1} padding={4}>
          <Link href="/" passHref>
            <Text as="a">Sanity UI</Text>
          </Link>
        </Box>

        <Box padding={1}>
          <Inline space={2}>
            <Link href="/layout" passHref>
              <Button as="a">Layout</Button>
            </Link>
          </Inline>
        </Box>
      </Flex>
    </Box>
  )
}
