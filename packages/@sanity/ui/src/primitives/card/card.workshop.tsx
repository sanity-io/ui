import {
  Card,
  CardTone,
  Container,
  Flex,
  Grid,
  Skeleton,
  Stack,
  Text,
  TextSkeleton,
} from '@sanity/ui'
import {defineScope, useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'
import styled from 'styled-components'

export default defineScope('primitives/card', 'Card', [
  {name: 'props', title: 'Props', component: PropsStory},
  {name: 'styled', title: 'Styled', component: StyledCardStory},
  {name: 'interactive', title: 'Interactive', component: InteractiveCardStory},
  {name: 'tones', title: 'Tones', component: AllTonesStory},
  {name: 'as-button', title: 'As button', component: AsButtonStory},
  {name: 'selectable-items', title: 'Selectable items', component: SelectableItemsStory},
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

function SelectableItemsStory() {
  const tone = useSelect('Tone', CARD_TONE_OPTIONS, 'default', 'Props')

  function Preview() {
    return (
      <Flex align="center" gap={3}>
        <Skeleton style={{width: 35, height: 35}} />
        <Stack flex={1} space={2}>
          <TextSkeleton />
          <TextSkeleton size={1} />
        </Stack>
      </Flex>
    )
  }

  const [list1Id, setList1Id] = useState('e')

  const list1 = {
    select: useCallback((id) => {
      setList1Id(id)
      setList2Id(null)
    }, []),
  }

  const [list2Id, setList2Id] = useState(null)

  const list2 = {
    select: useCallback((id) => setList2Id(id), []),
  }

  return (
    <Flex height="fill">
      <Card flex={1} tone={tone}>
        <Stack padding={2} space={1}>
          <Card
            as="button"
            onClick={() => list1.select('a')}
            padding={3}
            radius={2}
            selected={list1Id === 'a'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list1.select('b')}
            padding={3}
            radius={2}
            selected={list1Id === 'b'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list1.select('c')}
            padding={3}
            radius={2}
            selected={list1Id === 'c'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list1.select('d')}
            padding={3}
            radius={2}
            selected={list1Id === 'd'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list1.select('e')}
            padding={3}
            radius={2}
            selected={list1Id === 'e'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list1.select('f')}
            padding={3}
            radius={2}
            selected={list1Id === 'f'}
            tone="inherit"
          >
            <Preview />
          </Card>
        </Stack>
      </Card>
      <Card borderLeft flex={1} tone={tone}>
        <Stack padding={2} space={1}>
          <Card
            as="button"
            onClick={() => list2.select('a')}
            padding={3}
            radius={2}
            selected={list2Id === 'a'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list2.select('b')}
            padding={3}
            radius={2}
            selected={list2Id === 'b'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list2.select('c')}
            padding={3}
            radius={2}
            selected={list2Id === 'c'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list2.select('d')}
            padding={3}
            radius={2}
            selected={list2Id === 'd'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list2.select('e')}
            padding={3}
            radius={2}
            selected={list2Id === 'e'}
            tone="inherit"
          >
            <Preview />
          </Card>
          <Card
            as="button"
            onClick={() => list2.select('f')}
            padding={3}
            radius={2}
            selected={list2Id === 'f'}
            tone="inherit"
          >
            <Preview />
          </Card>
        </Stack>
      </Card>
    </Flex>
  )
}
