import {Autocomplete, Box, Card, SrOnly, ThemeColorProvider} from '@sanity/ui'
import {useLocation} from '$sanity/base'
import {Preview} from '$sanity/components'

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

interface AutocompleteOption {
  value: string
  title: string
}

export function Search() {
  const {handleLinkClick} = useLocation()
  const options: AutocompleteOption[] = data.map((d) => ({value: d.id, title: d.title}))

  const renderOption = (option: AutocompleteOption) => {
    return (
      <Card as="button" href={`/?id=${option.value}`} onClick={handleLinkClick}>
        <Box paddingX={3} paddingY={2}>
          <Preview title={option.title} subtitle={option.title} />
        </Box>
      </Card>
    )
  }

  const filterOption = (query: string, option: AutocompleteOption) => {
    return option.title.toLowerCase().includes(query.toLowerCase())
  }

  return (
    <>
      <SrOnly>
        <label htmlFor="navbar-search" id="navbar-search-label">
          Search for documents
        </label>
      </SrOnly>

      <ThemeColorProvider scheme="light">
        <Autocomplete
          aria-describedby="navbar-search-label"
          border={false}
          filterOption={filterOption}
          id="navbar-search"
          options={options}
          placeholder="Search documents…"
          renderOption={renderOption}
        />
      </ThemeColorProvider>
    </>
  )
}
