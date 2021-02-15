import {Card, TextInput as UITextInput} from '@sanity/ui'
import React, {createElement, useCallback, useState} from 'react'
import styled from 'styled-components'

const StyledTextInput = styled.input`
  background-color: ${({theme}) => theme.sanity.color.base.bg};
`

const COMPONENT_TYPE = 'ui'

const components: any = {
  native: 'input',
  styled: StyledTextInput,
  ui: UITextInput,
}

const component = components[COMPONENT_TYPE]

export function TextInputScreen() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  return (
    <Card data-focused={focused} padding={4}>
      {createElement(component, {
        'data-test': 'text-input',
        onBlur: handleBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        value,
      })}
    </Card>
  )
}
