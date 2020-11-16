import {Box, Button, Card, Container, Flex, Inline} from '@sanity/ui'
import React from 'react'

export function AppLayout({children}: {children?: React.ReactNode}) {
  return (
    <>
      <Card borderBottom padding={[2, 2, 3, 4]}>
        <Container>
          <Flex>
            <Card marginRight={4} radius={2} style={{width: 120}} tone="critical" />
            <Box flex={1}>
              <Inline space={1}>
                <Button
                  iconRight="chevron-down"
                  mode="bleed"
                  padding={2}
                  space={2}
                  text="Platform"
                />
                <Button
                  iconRight="chevron-down"
                  mode="bleed"
                  padding={2}
                  space={2}
                  text="Resources"
                />
                <Button mode="bleed" padding={2} text="Pricing" />
                <Button mode="bleed" padding={2} text="Blog" />
              </Inline>
            </Box>

            <Inline space={1}>
              <Button mode="bleed" padding={2} text="Contact us" />
              <Button mode="bleed" padding={2} text="Log in" />
            </Inline>

            <Box marginLeft={3}>
              <Button padding={2} text="Get started" tone="brand" />
            </Box>
          </Flex>
        </Container>
      </Card>

      <Box>{children}</Box>
    </>
  )
}
