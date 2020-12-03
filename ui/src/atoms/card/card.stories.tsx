import {Card, Grid, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import styled from 'styled-components'
import {Stack} from '../stack'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Card',
  decorators: [withCentered, withKnobs],
}

export const props = () => {
  const border = boolean('Border', false, 'Props')

  const as = select(
    'As',
    {
      'DIV (default)': 'div',
      SPAN: 'span',
      OL: 'ol',
      PRE: 'pre',
      UL: 'ul',
    },
    'div',
    'Props'
  )

  const padding = select(
    'Padding',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    0,
    'Props'
  )

  const radius = select(
    'Radius',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
    },
    0,
    'Props'
  )

  const shadow = select(
    'Shadow',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
    },
    0,
    'Props'
  )

  const tone = select(
    'Tone',
    {
      Default: 'default',
      Inherit: 'inherit',
      Transparent: 'transparent',
      Primary: 'primary',
      Positive: 'positive',
      Caution: 'caution',
      Critical: 'critical',
    },
    'default',
    'Props'
  )

  return (
    <Card
      as={as}
      border={border}
      onClick={action('onClick')}
      padding={padding}
      radius={radius}
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
  )
}

const StyledCard = styled(Card).attrs({forwardedAs: 'ol'})``

export const styledCard = () => {
  return (
    <StyledCard>
      <Text as="li">Styled</Text>
    </StyledCard>
  )
}

export const interactiveCard = () => {
  const selected = boolean('Selected?', false, 'Props')

  return (
    <Card padding={4}>
      <div aria-selected={selected}>
        <Card as="button" padding={3} tabIndex={0}>
          <Stack space={3}>
            <Text>
              Text <code>Code</code>
            </Text>
            <Text muted>Muted</Text>
            <Text accent>Accent</Text>
          </Stack>
        </Card>
      </div>
    </Card>
  )
}

export const allTones = () => {
  return (
    <Stack space={3}>
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
  )
}

export const asButton = () => {
  return (
    <Grid columns={2}>
      <Card padding={3}>
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
      </Card>
      <Card padding={3}>
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
      </Card>
    </Grid>
  )
}
