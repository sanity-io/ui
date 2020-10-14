import {Autocomplete, Box, Label, Stack} from '@sanity/ui'
import Chance from 'chance'
import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import {withCentered} from '~/storybook/decorators'

interface DataItem {
  value: string
  title: string
}

const chance = new Chance()

function generateData(): DataItem[] {
  return Array.from(new Array(1000)).map(() => {
    return {value: chance.string(), title: chance.word()}
  })
}

export default {
  decorators: [withCentered],
  title: 'Components/Autosuggest',
}

export const plain = () => {
  const data = generateData()

  return <PlainExample data={data} />
}

const OptionCard = styled.a`
  outline: none;
  background-color: var(--card-bg-color);
  color: var(--card-fg-color);
  width: 100%;
  display: block;

  @media (hover: hover) {
    &:hover {
      --card-bg-color: #eee;
    }
  }

  [aria-selected='true'] > & {
    --card-bg-color: #06f;
    --card-fg-color: #fff;
  }
`

function PlainExample({data}: {data: DataItem[]}) {
  const [query, setQuery] = useState('')

  const renderOption = useCallback(
    (option: {value: string}) => {
      const item = data.find((i) => i.value === option.value)

      if (!item) return null

      return (
        <OptionCard href="#" key={item.value} role="option">
          <Box padding={3}>{item.title}</Box>
        </OptionCard>
      )
    },
    [data]
  )

  const options = data
    .filter((item) => item.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
    .map((item) => ({value: item.value}))

  return (
    <Stack space={3}>
      <Label as="label" htmlFor="plain" id="plain-label">
        Search
      </Label>
      <Autocomplete
        aria-describedby="plain-label"
        id="plain"
        onChange={setQuery}
        options={options}
        renderOption={renderOption}
        value={query}
      />
    </Stack>
  )
}
