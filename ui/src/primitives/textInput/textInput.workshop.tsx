import {icons, IconSymbol} from '@sanity/icons'
import {
  Button,
  Card,
  Container,
  Flex,
  Stack,
  Text,
  TextInput,
  TextInputType,
  ThemeFontWeightKey,
} from '@sanity/ui'
import {defineScope, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'

export default defineScope('primitives/text-input', 'TextInput', [
  {name: 'plain', title: 'Plain', component: PlainStory},
  {name: 'custom-validity', title: 'Custom validity', component: CustomValidityStory},
  {name: 'types', title: 'Types', component: TypedStory},
  {name: 'tones', title: 'Tones', component: TonesStory},
  {name: 'clear-button', title: 'Clear button', component: ClearButtonStory},
  {name: 'read-only', title: 'Read only', component: ReadOnlyStory},
  {name: 'multiple-tones', title: 'Multiple tones', component: MultipleTonesStory},
])

const ICON_SYMBOL_OPTIONS = Object.keys(icons).reduce(
  (acc: {[key: string]: string}, key) => {
    acc[key] = key

    return acc
  },
  {'(none)': ''}
)

const FONT_SIZE_OPTIONS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4}

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

const FONT_WEIGHT_OPTIONS: {[key: string]: ThemeFontWeightKey} = {
  Regular: 'regular',
  Medium: 'medium',
  Semibold: 'semibold',
  Bold: 'bold',
}

const TEXT_INPUT_TYPE_OPTIONS: {[key: string]: TextInputType} = {
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
}

function PlainStory() {
  const border = useBoolean('Border', true, 'Props')
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', FONT_SIZE_OPTIONS, 2, 'Props')
  const icon = useSelect('Icon', ICON_SYMBOL_OPTIONS, 'add-circle', 'Props') as IconSymbol
  const iconRight = useSelect(
    'Icon (right)',
    ICON_SYMBOL_OPTIONS,
    'add-circle',
    'Props'
  ) as IconSymbol
  const padding = useSelect('Padding', SPACE_OPTIONS, 3, 'Props')
  const placeholder = useText('Placeholder', '', 'Props') || undefined
  const radius = useSelect('Radius', RADIUS_OPTIONS, 0, 'Props')
  const readOnly = useBoolean('Read only', false, 'Props')
  const space = useSelect('Space', SPACE_OPTIONS, 3, 'Props')
  const weight = useSelect('Weight', FONT_WEIGHT_OPTIONS, '', 'Props') || undefined

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
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
            name="email"
            padding={padding}
            placeholder={placeholder}
            radius={radius}
            readOnly={readOnly}
            space={space}
            weight={weight}
          />
        </Stack>
      </Container>
    </Flex>
  )
}

function CustomValidityStory() {
  const customValidity = useText('Custom validity', 'Invalid value', 'Props') || undefined

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

function TypedStory() {
  const type = useSelect('Type', TEXT_INPUT_TYPE_OPTIONS, 'text', 'Props')

  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  return <TextInput onChange={handleChange} type={type} value={value} />
}

function TonesStory() {
  return (
    <Stack space={4}>
      <Card padding={3}>
        <TextInput placeholder="default" />
      </Card>
      <Card padding={3} tone="transparent">
        <TextInput placeholder="transparent" />
      </Card>
      <Card padding={3} tone="primary">
        <TextInput placeholder="primary" />
      </Card>
      <Card padding={3} tone="positive">
        <TextInput placeholder="positive" />
      </Card>
      <Card padding={3} tone="caution">
        <TextInput placeholder="caution" />
      </Card>
      <Card padding={3} tone="critical">
        <TextInput placeholder="critical" />
      </Card>
    </Stack>
  )
}

function ClearButtonStory() {
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

function ReadOnlyStory() {
  return <TextInput id="text-input-example" readOnly />
}

function MultipleTonesStory() {
  return (
    <Stack>
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
