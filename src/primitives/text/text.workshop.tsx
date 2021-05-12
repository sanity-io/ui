import {
  Card,
  Container,
  Text,
  TextAlign,
  Theme,
  ThemeColorSpotKey,
  ThemeFontWeightKey,
  useTheme,
} from '@sanity/ui'
import {defineScope, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import styled, {css} from 'styled-components'

export default defineScope('primitives/text', 'Text', [
  {name: 'default', title: 'Text', component: TextStory},
  {name: 'colored', title: 'Colored text', component: ColoredTextStory},
])

const TEXT_ALIGN_OPTIONS: {[key: string]: TextAlign | ''} = {
  '(none)': '',
  Initial: 'initial',
  Left: 'left',
  Right: 'right',
  Center: 'center',
  Justify: 'justify',
}

const TEXT_OVERFLOW_OPTIONS: {[key: string]: 'ellipsis' | ''} = {
  '(none)': '',
  Ellipsis: 'ellipsis',
}

const TEXT_WEIGHT_OPTIONS: {[key: string]: ThemeFontWeightKey | ''} = {
  'Regular (default)': '',
  Medium: 'medium',
  Semibold: 'semibold',
  Bold: 'bold',
}

const TEXT_SIZE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2 (default)': 2,
  '3': 3,
  '4': 4,
}

function TextStory() {
  const accent = useBoolean('Accent', false, 'Props')
  const align = useSelect('Align', TEXT_ALIGN_OPTIONS, '', 'Props') || undefined
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', TEXT_SIZE_OPTIONS, 2, 'Props')
  const text = useText('Text', 'Hello, world', 'Props')

  const textOverflow =
    useSelect('Text overflow', TEXT_OVERFLOW_OPTIONS, undefined, 'Props') || undefined

  const weight = useSelect('Weight', TEXT_WEIGHT_OPTIONS, '', 'Props') || undefined

  return (
    <Container width={0}>
      <Card padding={4}>
        <Text
          accent={accent}
          align={align}
          muted={muted}
          size={size}
          textOverflow={textOverflow}
          weight={weight}
        >
          {text}
        </Text>
      </Card>
    </Container>
  )
}

const COLOR_OPTIONS: {[key: string]: ThemeColorSpotKey} = {
  Gray: 'gray',
  Blue: 'blue',
  Purple: 'purple',
  Magenta: 'magenta',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Cyan: 'cyan',
}

const ColoredText = styled(Text)<{color?: ThemeColorSpotKey}>(
  (props: {color?: ThemeColorSpotKey; theme: Theme}) => {
    const {spot} = props.theme.sanity.color

    return css`
      color: ${spot[props.color || 'gray']};
    `
  }
)

function ColoredTextStory() {
  const theme = useTheme()
  const color = useSelect('Color', COLOR_OPTIONS, 'gray')

  return (
    <ColoredText align="center" color={color} size={4} theme={theme} weight="bold">
      {color}
    </ColoredText>
  )
}
