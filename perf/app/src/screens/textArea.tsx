import {Card, TextArea} from '@sanity/ui'
import React, {useState} from 'react'

export function TextAreaScreen() {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  return (
    <Card padding={4}>
      <TextArea data-test="text-area" onChange={handleChange} value={value} />
    </Card>
  )
}
