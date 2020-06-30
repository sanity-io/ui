import {Box, Card, Container, Flex, Inline, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function LayoutPage() {
  return (
    <>
      <Head>
        <title>Sanity Design – Sanity.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="header" padding={4} style={{borderBottom: '1px solid #ccc'}}>
        <Text>Sanity Design</Text>
      </Box>

      <Box as="main" padding={4}>
        <h1>Layout</h1>

        <Box as="section">
          <h2>Box</h2>

          <Box padding={4} style={{outline: '1px solid red'}}>
            Test
          </Box>

          <Card as="pre" padding={2}>
            <code>{`import {Box} from '@sanity/ui'

<Box padding={4}>Test</Box>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Card</h2>

          <Card padding={4}>Test</Card>

          <Card as="pre" padding={2}>
            <code>{`import {Card} from '@sanity/ui'

<Card padding={4}>Test</Card>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Stack</h2>

          <Stack space={4}>
            <Text>foo</Text>
            <Text>bar</Text>
            <Text>baz</Text>
          </Stack>

          <Card as="pre" padding={2}>
            <code>{`import {Stack} from '@sanity/ui'

<Stack padding={4}>Test</Stack>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Inline</h2>

          <Inline space={4}>
            <Card padding={1}>1</Card>
            <Card padding={2}>2</Card>
            <Card padding={3}>3</Card>
          </Inline>

          <Card as="pre" padding={2}>
            <code>{`import {Inline} from '@sanity/ui'

<Inline padding={4}>Test</Inline>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Flex</h2>

          <Flex>
            <Card flex={1}>1</Card>
            <Card flex={[1, 2, 3]}>2</Card>
          </Flex>

          <Flex direction="column">
            <Card flex={1}>1</Card>
            <Card flex={[1]}>2</Card>
          </Flex>

          <Card as="pre" padding={2}>
            <code>{`import {Flex} from '@sanity/ui'

<Flex padding={4}>Test</Flex>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Container</h2>

          <Container width={4}>Test</Container>

          <Card as="pre" padding={2}>
            <code>{`import {Container} from '@sanity/ui'

<Container padding={4}>Test</Container>`}</code>
          </Card>
        </Box>
      </Box>

      <Box as="footer" padding={4} style={{borderTop: '1px solid #ccc'}}>
        <Text size={1}>Sanity &copy; 2017–2020</Text>
      </Box>
    </>
  )
}

export default LayoutPage
