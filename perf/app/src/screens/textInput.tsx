import {Card, TextInput} from '@sanity/ui'
import React, {useState} from 'react'

export function TextInputScreen() {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return (
    <Card padding={4}>
      <TextInput data-test="text-input" onChange={handleChange} value={value} />
    </Card>
  )
}
