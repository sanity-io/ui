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

          <Card padding={2} tone="transparent">
            <Box padding={4} style={{outline: '1px solid red'}}>
              <Text>Text</Text>
            </Box>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Box padding={4} style={{outline: '1px solid red'}}>
  <Text>Text</Text>
</Box>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Card</h2>

          <Card padding={2} tone="transparent">
            <Card padding={4}>
              <Text>Text</Text>
            </Card>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Card padding={4}>
  <Text>Text</Text>
</Card>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Stack</h2>

          <Card padding={2} tone="transparent">
            <Stack space={4}>
              <Card>
                <Text>foo</Text>
              </Card>
              <Card>
                <Text>bar</Text>
              </Card>
              <Card>
                <Text>baz</Text>
              </Card>
            </Stack>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Stack space={4}>
  <Card>
    <Text>foo</Text>
  </Card>
  <Card>
    <Text>bar</Text>
  </Card>
  <Card>
    <Text>baz</Text>
  </Card>
</Stack>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Inline</h2>

          <Card padding={2} tone="transparent">
            <Inline space={4} style={{textAlign: 'center'}}>
              <Card padding={1}>
                <Text>foo</Text>
              </Card>
              <Card padding={2}>
                <Text>bar</Text>
              </Card>
              <Card padding={3}>
                <Text>baz</Text>
              </Card>
            </Inline>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Inline space={4} style={{textAlign: 'center'}}>
  <Card padding={1}>
    <Text>foo</Text>
  </Card>
  <Card padding={2}>
    <Text>bar</Text>
  </Card>
  <Card padding={3}>
    <Text>baz</Text>
  </Card>
</Inline>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Flex</h2>

          <Card padding={2} tone="transparent">
            <Flex>
              <Card flex={1}>hello</Card>
              <Card flex={[1, 2, 3]}>world</Card>
            </Flex>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Flex>
  <Card flex={1}>hello</Card>
  <Card flex={[1, 2, 3]}>world</Card>
</Flex>`}</code>
          </Card>

          <Card padding={2} tone="transparent">
            <Flex direction="column">
              <Card flex={1}>hello</Card>
              <Card flex={[1]}>world</Card>
            </Flex>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Flex direction="column">
  <Card flex={1}>hello</Card>
  <Card flex={[1]}>world</Card>
</Flex>`}</code>
          </Card>
        </Box>

        <Box as="section">
          <h2>Container</h2>

          <Card padding={2} tone="transparent">
            <Container width={0}>
              <Text>Contained text</Text>
            </Container>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Container width={0}>
  <Text>Contained text</Text>
</Container>`}</code>
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
