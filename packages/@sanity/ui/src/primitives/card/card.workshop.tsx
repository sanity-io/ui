import {Card, Container, Flex, Grid, Stack, Text, TextSkeleton} from '@sanity/ui'
import {defineScope, useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import styled from 'styled-components'
import {
  AS_OPTIONS,
  CARD_TONE_OPTIONS,
  RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  SPACE_OPTIONS,
} from './__workshop__/constants'

export default defineScope('primitives/card', 'Card', [
  {name: 'props', title: 'Props', component: PropsStory},
  {name: 'styled', title: 'Styled', component: StyledCardStory},
  {name: 'interactive', title: 'Interactive', component: InteractiveCardStory},
  {name: 'tones', title: 'Tones', component: AllTonesStory},
  {name: 'as-button', title: 'As button', component: AsButtonStory},
  {
    name: 'selectable-items',
    title: 'Selectable items',
    resolveComponent: () => import('./__workshop__/selectableItemsStory'),
  },
])

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
  const tone = useSelect('Tone', CARD_TONE_OPTIONS, 'default', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <div aria-selected={selected}>
        <Card aria-pressed={pressed} as="button" padding={3} tabIndex={0} tone={tone}>
          <Stack space={3}>
            <Text>
              Text <code>Code</code>
            </Text>
            <Text muted>Muted</Text>
            <Text accent>Accent</Text>
            <TextSkeleton animated />
          </Stack>
        </Card>
      </div>
    </Flex>
  )
}

function AllTonesStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={5}>
          <Card padding={4} radius={2} shadow={4} style={{textAlign: 'center'}} tone="default">
            <Text>Default</Text>
          </Card>
          <Card padding={4} radius={2} shadow={4} style={{textAlign: 'center'}} tone="transparent">
            <Text>Transparent</Text>
          </Card>
          <Card padding={4} radius={2} shadow={4} style={{textAlign: 'center'}} tone="positive">
            <Text>Positive</Text>
          </Card>
          <Card padding={4} radius={2} shadow={4} style={{textAlign: 'center'}} tone="caution">
            <Text>Caution</Text>
          </Card>
          <Card padding={4} radius={2} shadow={4} style={{textAlign: 'center'}} tone="critical">
            <Text>Critical</Text>
          </Card>
          <Card padding={4} radius={2} shadow={4} style={{textAlign: 'center'}} tone="primary">
            <Text>Brand</Text>
          </Card>
        </Stack>
      </Container>
    </Flex>
  )
}

function AsButtonStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container>
        <Grid columns={2} gap={[4, 5, 6]}>
          <Stack>
            <Card as="button" padding={4} style={{textAlign: 'center'}} tone="transparent">
              <Stack space={2}>
                <Text>Text</Text>
                <Text muted>Muted</Text>
                <Text accent>Accent</Text>
              </Stack>
            </Card>
            <Card as="button" padding={4} style={{textAlign: 'center'}} tone="default">
              <Stack space={2}>
                <Text>Text</Text>
                <Text muted>Muted</Text>
                <Text accent>Accent</Text>
              </Stack>
            </Card>
            <Card as="button" padding={4} style={{textAlign: 'center'}} tone="positive">
              <Stack space={2}>
                <Text>Text</Text>
                <Text muted>Muted</Text>
                <Text accent>Accent</Text>
              </Stack>
            </Card>
            <Card as="button" padding={4} style={{textAlign: 'center'}} tone="caution">
              <Stack space={2}>
                <Text>Text</Text>
                <Text muted>Muted</Text>
                <Text accent>Accent</Text>
              </Stack>
            </Card>
            <Card as="button" padding={4} style={{textAlign: 'center'}} tone="critical">
              <Stack space={2}>
                <Text>Text</Text>
                <Text muted>Muted</Text>
                <Text accent>Accent</Text>
              </Stack>
            </Card>
            <Card as="button" padding={4} style={{textAlign: 'center'}} tone="primary">
              <Stack space={2}>
                <Text>Text</Text>
                <Text muted>Muted</Text>
                <Text accent>Accent</Text>
              </Stack>
            </Card>
          </Stack>
          <Stack>
            <div aria-selected>
              <Card as="button" padding={4} style={{textAlign: 'center'}} tone="transparent">
                <Stack space={2}>
                  <Text>Text</Text>
                  <Text muted>Muted</Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Card>
            </div>
            <div aria-selected>
              <Card as="button" padding={4} style={{textAlign: 'center'}} tone="default">
                <Stack space={2}>
                  <Text>Text</Text>
                  <Text muted>Muted</Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Card>
            </div>
            <div aria-selected>
              <Card as="button" padding={4} style={{textAlign: 'center'}} tone="positive">
                <Stack space={2}>
                  <Text>Text</Text>
                  <Text muted>Muted</Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Card>
            </div>
            <div aria-selected>
              <Card as="button" padding={4} style={{textAlign: 'center'}} tone="caution">
                <Stack space={2}>
                  <Text>Text</Text>
                  <Text muted>Muted</Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Card>
            </div>
            <div aria-selected>
              <Card as="button" padding={4} style={{textAlign: 'center'}} tone="critical">
                <Stack space={2}>
                  <Text>Text</Text>
                  <Text muted>Muted</Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Card>
            </div>
            <div aria-selected>
              <Card as="button" padding={4} style={{textAlign: 'center'}} tone="primary">
                <Stack space={2}>
                  <Text>Text</Text>
                  <Text muted>Muted</Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Card>
            </div>
          </Stack>
        </Grid>
      </Container>
    </Flex>
  )
}
