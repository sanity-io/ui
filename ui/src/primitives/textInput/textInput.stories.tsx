import {icons, IconSymbol} from '@sanity/icons'
import {Button, Card, Container, Stack, Text, TextInput} from '@sanity/ui'
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useState} from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/TextInput',
  decorators: [withCentered, withKnobs],
}

const symbolOptions = Object.keys(icons).reduce((acc: {[key: string]: string}, key) => {
  acc[key] = key

  return acc
}, {})

export const plain = () => {
  const border = boolean('Border', true, 'Props')

  const customValidity = text('Custom validity', '', 'Props') || undefined

  const disabled = boolean('Disabled', false, 'Props')

  const fontSize = select(
    'Font size',
    {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4},
    2,
    'Props'
  )

  const icon = (select('Icon', {'(none)': '', ...symbolOptions}, 'add-circle', 'Props') ||
    undefined) as IconSymbol | undefined

  const iconRight = (select(
    'Icon (right)',
    {'(none)': '', ...symbolOptions},
    'add-circle',
    'Props'
  ) || undefined) as IconSymbol

  const padding = select(
    'Padding',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3 (default)': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    3,
    'Props'
  )

  const placeholder = text('Placeholder', '', 'Props') || undefined

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

  const space = select(
    'Space',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3 (default)': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    3,
    'Props'
  )

  const weight = select(
    'Weight',
    {'Regular (default)': undefined, Semibold: 'semibold', Bold: 'bold'},
    undefined,
    'Props'
  )

  return (
    <Container width={0}>
      <Card padding={4}>
        <Stack space={3}>
          <Text as="label" htmlFor="text-input-example" size={1} weight="semibold">
            TextInput
          </Text>
          <TextInput
            border={border}
            customValidity={customValidity}
            disabled={disabled}
            fontSize={fontSize}
            icon={icon && icons[icon]}
            iconRight={iconRight && icons[iconRight]}
            id="text-input-example"
            padding={padding}
            placeholder={placeholder}
            radius={radius}
            space={space}
            weight={weight}
          />
        </Stack>
      </Card>
    </Container>
  )
}

export const customValidity = () => {
  const customValidity = text('Custom validity', 'Invalid value', 'Props') || undefined

  return (
    <Container as="form" onSubmit={(event) => event.preventDefault()} width={0}>
      <Card padding={4}>
        <Stack space={4}>
          <TextInput customValidity={customValidity} />
          <Button text="Submit" type="submit" />
        </Stack>
      </Card>
    </Container>
  )
}

export const typed = () => {
  const type = select(
    'Type',
    {
      date: 'date',
      'datetime-local': 'datetime-local',
      email: 'email',
      month: 'month',
      number: 'number',
      password: 'password',
      tel: 'tel',
      time: 'time',
      text: 'text',
      week: 'week',
    },
    'text',
    'Props'
  )

  return <Example type={type} />
}

export const tones = () => {
  return (
    <Stack space={4}>
      <Card padding={3}>
        <TextInput />
      </Card>
      <Card padding={3} tone="transparent">
        <TextInput />
      </Card>
      <Card padding={3} tone="primary">
        <TextInput />
      </Card>
      <Card padding={3} tone="positive">
        <TextInput />
      </Card>
      <Card padding={3} tone="caution">
        <TextInput />
      </Card>
      <Card padding={3} tone="critical">
        <TextInput />
      </Card>
    </Stack>
  )
}

export const clearButton = () => {
  return <ClearableButtonExample />
}

function ClearableButtonExample() {
  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  const handleClear = useCallback(() => {
    setValue('')
  }, [])

  return (
    <TextInput
      clearButton
      onChange={handleChange}
      onClear={handleClear}
      placeholder="Enter text"
      value={value}
    />
  )
}

function Example({
  type,
}: {
  type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'time'
    | 'text'
    | 'week'
}) {
  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  return <TextInput onChange={handleChange} type={type} value={value} />
}
