import {Radio} from '@sanity/ui'
import {defineScope, useAction, useBoolean} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('primitives/radio', 'Radio', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  const checked = useBoolean('Checked?', false, 'Props')
  const disabled = useBoolean('Disabled?', false, 'Props')
  const id = 'radioStory'
  const name = 'radioStory'
  const onBlur = useAction('onBlur')
  const onChange = useAction('onChange')
  const onFocus = useAction('onFocus')
  const readOnly = useBoolean('Read only', false, 'Props')

  return (
    <Radio
      checked={checked}
      disabled={disabled}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      readOnly={readOnly}
    />
  )
}
