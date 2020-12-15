import {icons, IconSymbol} from '@sanity/icons'
import {Button, Card, Container} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import styled from 'styled-components'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Button',
  decorators: [withCentered, withKnobs],
}

const iconOptions = Object.keys(icons).reduce((acc: {[key: string]: string}, key) => {
  acc[key] = key

  return acc
}, {})

export const plain = () => {
  const disabled = boolean('Disabled', false, 'Props')

  const fontSize = select(
    'Font size',
    {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4},
    2,
    'Props'
  )

  const icon = select('Icon', {'(none)': '', ...iconOptions}, 'add-circle', 'Props') as IconSymbol

  const iconRight = select(
    'Icon (right)',
    {'(none)': '', ...iconOptions},
    '',
    'Props'
  ) as IconSymbol

  const justify = select(
    'Justify',
    ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    'center',
    'Props'
  )

  const mode = select(
    'Mode',
    {
      Default: 'default',
      Ghost: 'ghost',
      Bleed: 'bleed',
    },
    'default',
    'Props'
  )

  const paddingX = select(
    'Padding X',
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
    3,
    'Props'
  )

  const paddingY = select(
    'Padding Y',
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
    3,
    'Props'
  )

  const selected = boolean('Selected', false, 'Props')

  const space = select(
    'Space',
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
    3,
    'Props'
  )

  const tone = select(
    'Tone',
    {
      Default: 'default',
      Primary: 'primary',
      Positive: 'positive',
      Caution: 'caution',
      Critical: 'critical',
    },
    'default',
    'Props'
  )

  const textProp = text('Text', 'Label', 'Props')

  return (
    <Container width={1} style={{textAlign: 'center'}}>
      <Card padding={4}>
        <Button
          disabled={disabled}
          fontSize={fontSize}
          icon={icon && icons[icon]}
          iconRight={iconRight && icons[iconRight]}
          justify={justify}
          mode={mode}
          onClick={action('onClick')}
          paddingX={paddingX}
          paddingY={paddingY}
          selected={selected}
          space={space}
          text={textProp}
          tone={tone}
        />
      </Card>
    </Container>
  )
}

const StyledButton1 = styled.a`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

export const styledButton1 = () => {
  return <Button as={StyledButton1} href="#" text="Test" />
}

const StyledButton2 = styled(Button)`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

export const styledButton2 = () => {
  const props = {href: '#', text: 'Test'}

  // NOTE: This approach does not work with TypeScript
  return <StyledButton2 forwardedAs="a" {...(props as any)} />
}
