import {Box, Card, Container, Flex, Grid, Stack, Text} from '@sanity/ui'

import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function AsButtonStory() {
  const tones = Object.entries(WORKSHOP_CARD_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container>
        <Grid columns={3} gap={2}>
          <Box>
            <Text align="center" size={1} weight="medium">
              Enabled
            </Text>
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <Card
                  __unstable_focusRing
                  as="button"
                  key={tone}
                  padding={3}
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack space={2}>
                    <Text size={1} weight="medium">
                      {title}
                    </Text>
                    <Text muted size={1}>
                      Muted
                    </Text>
                    <Text accent size={1}>
                      Accent
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
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <Card
                  __unstable_focusRing
                  as="button"
                  disabled
                  key={tone}
                  padding={3}
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack space={2}>
                    <Text size={1} weight="medium">
                      {title}
                    </Text>
                    <Text size={1} muted>
                      Muted
                    </Text>
                    <Text accent size={1}>
                      Accent
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
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <Card
                  __unstable_focusRing
                  as="button"
                  key={tone}
                  padding={3}
                  selected
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack space={2}>
                    <Text size={1} weight="medium">
                      {title}
                    </Text>
                    <Text size={1} muted>
                      Muted
                    </Text>
                    <Text accent size={1}>
                      Accent
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
