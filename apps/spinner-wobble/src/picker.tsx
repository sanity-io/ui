import {Button, Card, Flex, Heading, KBD, Stack, Text, ThemeProvider} from '@sanity/ui-fixed'
import {buildTheme} from '@sanity/ui-fixed/theme'

import '@sanity/ui-fixed/styles.css'

const theme = buildTheme()

export default function Picker() {
  return (
    <ThemeProvider theme={theme}>
      <Card height="fill" scheme="dark">
        <Flex align="center" height="fill" justify="center" padding={4}>
          <Stack gap={5}>
            <Stack gap={3}>
              <Heading size={3}>Safari spinner wobble</Heading>
              <Text muted size={2}>
                Pick a version. <KBD>b</KBD> and <KBD>a</KBD> switch between them.
              </Text>
            </Stack>
            <Flex gap={3}>
              <Button as="a" href="?variant=before" mode="ghost" text="Before · 4.2.0" />
              <Button as="a" href="?variant=after" text="After · 4.2.1" tone="primary" />
            </Flex>
          </Stack>
        </Flex>
      </Card>
    </ThemeProvider>
  )
}
