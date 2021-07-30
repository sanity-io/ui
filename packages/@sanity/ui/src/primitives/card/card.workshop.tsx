import {Box, Card, CardTone, Container, Flex, Grid, Stack, Text} from '@sanity/ui'
import {defineScope, useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import styled from 'styled-components'

export default defineScope('primitives/card', 'Card', [
  {name: 'props', title: 'Props', component: PropsStory},
  {name: 'styled', title: 'Styled', component: StyledCardStory},
  {name: 'interactive', title: 'Interactive', component: InteractiveCardStory},
  {name: 'tones', title: 'Tones', component: AllTonesStory},
  {name: 'as-button', title: 'As button', component: AsButtonStory},
])

const AS_OPTIONS: {[key: string]: 'div' | 'button' | 'span' | 'ol' | 'pre' | 'ul'} = {
  'DIV (default)': 'div',
  BUTTON: 'button',
  SPAN: 'span',
  OL: 'ol',
  PRE: 'pre',
  UL: 'ul',
}

const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

const RADIUS_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
}

const SHADOW_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
}

const CARD_TONE_OPTIONS: {[key: string]: CardTone} = {
  Default: 'default',
  Inherit: 'inherit',
  Transparent: 'transparent',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

function PropsStory() {
  const border = useBoolean('Border', false, 'Props')
  const as = useSelect('As', AS_OPTIONS, 'div', 'Props')
  const padding = useSelect('Padding', SPACE_OPTIONS, 0, 'Props')
  const radius = useSelect('Radius', RADIUS_OPTIONS, 0, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const shadow = useSelect('Shadow', SHADOW_OPTIONS, 0, 'Props')
  const tone = useSelect('Tone', CARD_TONE_OPTIONS, 'default', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Card
        as={as}
        border={border}
        onClick={useAction('onClick')}
        padding={padding}
        radius={radius}
        selected={selected}
        shadow={shadow}
        tone={tone}
      >
        <Stack space={3}>
          <Text>
            Card with <code>padding={padding}</code>, <code>tone={tone}</code>, and{' '}
            <code>shadow={shadow}</code>.
          </Text>
          <Text>
            Text with <a>link</a>.
          </Text>
          <Text accent>Accented text.</Text>
        </Stack>
      </Card>
    </Flex>
  )
}

const StyledCard = styled(Card).attrs({forwardedAs: 'ol'})``

function StyledCardStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <StyledCard>
        <Text as="li">Styled</Text>
      </StyledCard>
    </Flex>
  )
}

function InteractiveCardStory() {
  const selected = useBoolean('Selected', false, 'Props')
  const pressed = useBoolean('Pressed', false, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <div aria-selected={selected}>
        <Card aria-pressed={pressed} as="button" padding={3} tabIndex={0}>
          <Stack space={3}>
            <Text>
              Text <code>Code</code>
            </Text>
            <Text muted>Muted</Text>
            <Text accent>Accent</Text>
          </Stack>
        </Card>
      </div>
    </Flex>
  )
}

function AllTonesStory() {
  const tones = Object.entries(CARD_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={5}>
          {tones.map(([title, tone]) => (
            <Card
              key={tone}
              padding={4}
              radius={2}
              shadow={4}
              style={{textAlign: 'center'}}
              tone={tone}
            >
              <Text>{title}</Text>
            </Card>
          ))}
        </Stack>
      </Container>
    </Flex>
  )
}

function AsButtonStory() {
  const tones = Object.entries(CARD_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container>
        <Grid columns={3} gap={2}>
          <Box>
            <Text align="center" size={1} weight="semibold">
              Enabled
            </Text>
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <Card as="button" key={tone} padding={4} style={{textAlign: 'center'}} tone={tone}>
                  <Stack space={2}>
                    <Text weight="semibold">{title}</Text>
                    <Text muted>Muted</Text>
                    <Text accent>Accent</Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text align="center" size={1} weight="semibold">
              Disabled
            </Text>
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <Card
                  as="button"
                  disabled
                  key={tone}
                  padding={4}
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack space={2}>
                    <Text weight="semibold">{title}</Text>
                    <Text muted>Muted</Text>
                    <Text accent>Accent</Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text align="center" size={1} weight="semibold">
              Selected
            </Text>
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <div aria-selected key={tone}>
                  <Card as="button" padding={4} style={{textAlign: 'center'}} tone={tone}>
                    <Stack space={2}>
                      <Text weight="semibold">{title}</Text>
                      <Text muted>Muted</Text>
                      <Text accent>Accent</Text>
                    </Stack>
                  </Card>
                </div>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Flex>
  )
}
