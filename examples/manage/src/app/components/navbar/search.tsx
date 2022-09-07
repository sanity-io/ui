import {Autocomplete} from '@sanity/ui'

export function Search() {
  const renderOption = () => <div>Option</div>

  return <Autocomplete id="search" options={[]} renderOption={renderOption} />
}
