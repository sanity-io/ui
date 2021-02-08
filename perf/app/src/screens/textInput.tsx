import {TextInput} from '@sanity/ui'
import React, {useState} from 'react'

export function TextInputScreen() {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return <TextInput data-test="text-input" onChange={handleChange} value={value} />
}
