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

function ExamplePreview(props: {loading?: boolean}) {
  const {loading} = props

  return (
    <Flex align="center" gap={3}>
      <Skeleton style={{width: 35, height: 35}} />
      <Stack flex={1} space={2}>
        {loading ? <TextSkeleton animated /> : <Text>Title</Text>}
        {loading ? (
          <TextSkeleton animated size={1} />
        ) : (
          <Text muted size={1}>
            Subtitle
          </Text>
        )}
      </Stack>
    </Flex>
  )
}

function PaneItem(props: {
  active?: boolean
  children?: React.ReactNode
  onClick: () => void
  selected: boolean
}) {
  const {active, children, onClick, selected} = props

  const card = (
    <Card as="button" onClick={onClick} padding={3} radius={2} selected={selected} tone="inherit">
      {children}
    </Card>
  )

  if (active && selected) {
    return <div aria-selected>{card}</div>
  }

  return card
}

function SelectableItemsStory() {
  const tone = useSelect('Tone', CARD_TONE_OPTIONS, 'default', 'Props')
  const loading = useBoolean('Loading', false, 'Props')

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
          <PaneItem onClick={() => list1.select('a')} selected={list1Id === 'a'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem onClick={() => list1.select('b')} selected={list1Id === 'b'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem onClick={() => list1.select('c')} selected={list1Id === 'c'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem onClick={() => list1.select('d')} selected={list1Id === 'd'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem onClick={() => list1.select('e')} selected={list1Id === 'e'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem onClick={() => list1.select('f')} selected={list1Id === 'f'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
        </Stack>
      </Card>
      <Card borderLeft flex={1} tone={tone}>
        <Stack padding={2} space={1}>
          <PaneItem active onClick={() => list2.select('a')} selected={list2Id === 'a'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem active onClick={() => list2.select('b')} selected={list2Id === 'b'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem active onClick={() => list2.select('c')} selected={list2Id === 'c'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem active onClick={() => list2.select('d')} selected={list2Id === 'd'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem active onClick={() => list2.select('e')} selected={list2Id === 'e'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
          <PaneItem active onClick={() => list2.select('f')} selected={list2Id === 'f'}>
            <ExamplePreview loading={loading} />
          </PaneItem>
        </Stack>
      </Card>
    </Flex>
  )
}
