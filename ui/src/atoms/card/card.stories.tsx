import {Card, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import styled from 'styled-components'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Card',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
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
      Transparent: 'transparent',
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
      <Text>
        Card with <code>padding={padding}</code>, <code>tone={tone}</code>, and{' '}
        <code>shadow={shadow}</code>
      </Text>
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
        <Card as="a" padding={3} tabIndex={0}>
          <Text>Interactive</Text>
        </Card>
      </div>
    </Card>
  )
}
