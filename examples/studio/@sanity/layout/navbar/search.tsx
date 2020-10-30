import {useLocation} from '@sanity/base'
import {Preview} from '@sanity/components'
import {Autocomplete, AutocompleteOption, Box, Card, CardProvider, SrOnly} from '@sanity/ui'
import React, {useState} from 'react'

const data = [
  {id: 'breeze', title: 'Breeze'},
  {id: 'over', title: 'Over Here'},
  {id: 'golden', title: 'Golden Reservoir'},
  {id: 'you', title: 'You'},
  {id: 'clouds', title: 'The Clouds Cleared the Way'},
  {id: 'voodoo', title: 'Voodoo on Gold'},
  {id: 'little', title: 'Little League'},
  {id: 'confidence', title: 'Some Kind of Confidence'},
  {id: 'leave', title: 'Leave This World'},
  {id: 'guai', title: 'Guai'},
  {id: 'lewis', title: 'Lewis'},
  {id: 'light', title: 'Light Headed Overview'},
  {id: 'happily', title: 'Happily Depressed'},
]

export function Search() {
  const {handleLinkClick} = useLocation()
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<AutocompleteOption[]>([])

  const handleInputChange = (v: string) => {
    setValue(v)

    if (v) {
      setOptions(
        data
          .filter((item) => item.title.toLowerCase().indexOf(v.toLowerCase()) > -1)
          .map((item) => ({value: item.id}))
      )
    } else {
      setOptions([])
    }
  }

  const renderOption = (option: AutocompleteOption) => {
    const item = data.find((i) => i.id === option.value)

    if (!item) return null

    return (
      <Card as="button" href={`/?id=${item.id}`} onClick={handleLinkClick}>
        <Box paddingX={3} paddingY={2}>
          <Preview title={item.title} subtitle={item.title} />
        </Box>
      </Card>
    )
  }

  return (
    <>
      <SrOnly>
        <label htmlFor="navbar-search" id="navbar-search-label">
          Search for documents
        </label>
      </SrOnly>

      <CardProvider scheme="light" tone="default">
        <Autocomplete
          aria-describedby="navbar-search-label"
          border={false}
          id="navbar-search"
          onChange={handleInputChange}
          options={options}
          placeholder="Search documents…"
          renderOption={renderOption}
          value={value}
        />
      </CardProvider>
    </>
  )
}
