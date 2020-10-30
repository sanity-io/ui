import {useLocation} from '@sanity/base'
import {Preview} from '@sanity/components'
import {
  Autocomplete,
  AutocompleteOption,
  Box,
  CardProvider,
  ColorSchemeKey,
  SrOnly,
  Theme,
  useCard,
} from '@sanity/ui'
import React, {useState} from 'react'
import styled, {css} from 'styled-components'

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

const SearchOption = styled.a<{scheme: ColorSchemeKey}>(
  ({scheme, theme}: {scheme: ColorSchemeKey; theme: Theme}) => {
    const colorScheme = theme.color[scheme]
    const tone = colorScheme.card.tones.default

    return css`
      outline: none;
      background-color: var(--card-bg-color);
      color: var(--card-fg-color);
      width: 100%;
      display: block;
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          --card-bg-color: ${tone.hovered.bg};
          --card-fg-color: ${tone.hovered.fg};
          --card-muted-fg-color: ${tone.hovered.muted.fg};
        }
      }

      [aria-selected='true'] > & {
        --card-bg-color: ${tone.selected.bg};
        --card-fg-color: ${tone.selected.fg};
        --card-muted-fg-color: ${tone.selected.muted.fg};
      }
    `
  }
)

export function Search() {
  const {handleLinkClick} = useLocation()
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<AutocompleteOption[]>([])
  const card = useCard()

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
      <SearchOption href={`/?id=${item.id}`} onClick={handleLinkClick} scheme={card.scheme}>
        <Box paddingX={3} paddingY={2}>
          <Preview title={item.title} subtitle={item.title} />
        </Box>
      </SearchOption>
    )
  }

  return (
    <>
      <SrOnly>
        <label htmlFor="navbar-search" id="navbar-search-label">
          Search for documents
        </label>
      </SrOnly>

      <CardProvider scheme="light">
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
