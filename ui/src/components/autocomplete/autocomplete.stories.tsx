import {Autocomplete, Card, Label, Stack, Text} from '@sanity/ui'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useState} from 'react'
import countries from './__fixtures__/countries'

interface ExampleOption {
  value: string
  title: string
}

export default {
  decorators: [withKnobs],
  title: 'Components/Autocomplete',
}

export function _default() {
  const options = countries.map((country) => ({value: country.code}))

  return (
    <Card padding={4}>
      <Autocomplete id="default" options={options} />
    </Card>
  )
}

export const custom = () => {
  const data: ExampleOption[] = countries.map((d) => ({value: d.code, title: d.name}))

  const border = boolean('Border', true, 'Props')

  const radius = Number(
    select(
      'Radius',
      {
        '0': '0',
        '1': '1',
        '2 (default)': '2',
        '3': '3',
        '4': '4',
      },
      '2',
      'Props'
    )
  )

  const size = Number(
    select(
      'Size',
      {
        '0': '0',
        '1': '1',
        '2 (default)': '2',
        '3': '3',
        '4': '4',
      },
      '2',
      'Props'
    )
  )

  return (
    <Card padding={4}>
      <CustomExample border={border} data={data} radius={radius} size={size} />
    </Card>
  )
}

function CustomExample({
  border,
  data,
  radius,
  size,
}: {
  border: boolean
  data: ExampleOption[]
  radius: number
  size: number
}) {
  const [query, setQuery] = useState('')

  const renderOption = useCallback((option: ExampleOption) => {
    return (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={3}
      >
        <Text>{option.title}</Text>
      </Card>
    )
  }, [])

  const renderValue = useCallback((value: string, option?: ExampleOption) => {
    console.log('render value', {value, option})

    return option ? option.title : value
  }, [])

  const filterOption = useCallback((value: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(value.toLowerCase()) > -1
  }, [])

  const options = data.map((item) => ({value: item.value, title: item.title}))

  return (
    <Stack space={3}>
      <Label as="label" htmlFor="custom" id="custom-label">
        Search
      </Label>
      <Autocomplete
        aria-describedby="custom-label"
        border={border}
        filterOption={filterOption}
        id="custom"
        onChange={setQuery}
        options={options}
        radius={radius}
        renderOption={renderOption}
        renderValue={renderValue}
        size={size}
        value={query}
      />
    </Stack>
  )
}
