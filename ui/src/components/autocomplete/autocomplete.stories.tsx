import {Autocomplete, Box, Card, Label, Stack, Text} from '@sanity/ui'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useState} from 'react'
import countries from './__tests__/fixtures/countries'

interface DataItem {
  value: string
  title: string
}

export default {
  decorators: [withKnobs],
  title: 'Components/Autocomplete',
}

export const plain = () => {
  const data = countries.map((d) => ({value: d.code, title: d.name}))

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
      <PlainExample border={border} data={data} radius={radius} size={size} />
    </Card>
  )
}

function PlainExample({
  border,
  data,
  radius,
  size,
}: {
  border: boolean
  data: DataItem[]
  radius: number
  size: number
}) {
  const [query, setQuery] = useState('')

  const renderOption = useCallback(
    (option: {value: string}) => {
      const item = data.find((i) => i.value === option.value)

      if (!item) return <></>

      return (
        <Card
          as="a"
          data-qa={`option-${item.value}`}
          href="#"
          key={item.value}
          onClick={(event) => event.preventDefault()}
          padding={3}
        >
          <Text>{item.title}</Text>
        </Card>
      )
    },
    [data]
  )

  const options = data
    .filter((item) => query && item.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
    .map((item) => ({value: item.value}))

  return (
    <Stack space={3}>
      <Label as="label" htmlFor="plain" id="plain-label">
        Search
      </Label>
      <Autocomplete
        aria-describedby="plain-label"
        border={border}
        id="plain"
        onChange={setQuery}
        options={options}
        radius={radius}
        renderOption={renderOption}
        size={size}
        value={query}
      />
    </Stack>
  )
}
