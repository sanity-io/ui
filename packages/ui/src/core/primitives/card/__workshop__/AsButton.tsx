import {Box, Card, Container, Flex, Grid, Stack, Text} from '@sanity/ui'

import {WORKSHOP_CARD_TONE_OPTIONS} from '$workshop'

export default function AsButtonStory(): React.JSX.Element {
  const tones = Object.entries(WORKSHOP_CARD_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container>
        <Grid gap={1} gridTemplateColumns={3}>
          <Box>
            <Text align="center" size={1} weight="medium">
              Enabled
            </Text>
            <Stack gap={1} marginTop={3}>
              {tones.map(([title, tone]) => (
                <Card
                  key={tone}
                  __unstable_focusRing
                  as="button"
                  padding={3}
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack gap={3}>
                    <Text size={1} weight="medium">
                      {title}
                    </Text>
                    <Text muted size={1}>
                      Muted
                    </Text>
                    <Text size={1}>
                      <code>Code</code>
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text align="center" size={1} weight="medium">
              Disabled
            </Text>
            <Stack gap={1} marginTop={3}>
              {tones.map(([title, tone]) => (
                <Card
                  key={tone}
                  __unstable_focusRing
                  as="button"
                  disabled
                  padding={3}
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack gap={3}>
                    <Text size={1} weight="medium">
                      {title}
                    </Text>
                    <Text muted size={1}>
                      Muted
                    </Text>
                    <Text size={1}>
                      <code>Code</code>
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text align="center" size={1} weight="medium">
              Selected
            </Text>
            <Stack gap={1} marginTop={3}>
              {tones.map(([title, tone]) => (
                <Card
                  key={tone}
                  __unstable_focusRing
                  as="button"
                  padding={3}
                  selected
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack gap={3}>
                    <Text size={1} weight="medium">
                      {title}
                    </Text>
                    <Text muted size={1}>
                      Muted
                    </Text>
                    <Text size={1}>
                      <code>Code</code>
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Flex>
  )
}
