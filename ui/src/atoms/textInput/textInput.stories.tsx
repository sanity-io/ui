import icons, {IconSymbol} from '@sanity/icons'
import {Card, Container, Stack, Text, TextInput} from '@sanity/ui'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import React, {useState} from 'react'
import {useCallback} from 'react'
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
  const border = boolean('Border?', true, 'Props')

  const disabled = boolean('Disabled?', false, 'Props')

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

  const size = select('Size', {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4}, 2, 'Props')

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
            disabled={disabled}
            icon={icon}
            iconRight={iconRight}
            id="text-input-example"
            padding={padding}
            radius={radius}
            size={size}
            space={space}
            weight={weight}
          />
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
