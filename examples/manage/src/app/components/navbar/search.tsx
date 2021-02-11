import {Autocomplete} from '@sanity/ui'
import React from 'react'

export function Search() {
  const renderOption = () => <div>Option</div>

  return <Autocomplete id="search" options={[]} renderOption={renderOption} />
}
