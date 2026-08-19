'use client'

import {Button, Container, Divider, Flex, Heading, Text} from '@sanity/ui'
import Link from 'next/link'

export default function Home() {
  return (
    <Container size={2} paddingY={4}>
      <Flex flexDirection="column" rowGap={2}>
        <Heading as="h1" size={4}>
          Sanity UI in Next.js
        </Heading>

        <Text>A sandbox for testing Sanity UI component installation and rendering.</Text>
      </Flex>

      <Divider marginY={5} />

      <Button as={Link} text="Test Button" href="/test" />
    </Container>
  )
}
