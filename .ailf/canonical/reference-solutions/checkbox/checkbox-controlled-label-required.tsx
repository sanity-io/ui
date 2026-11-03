import {Checkbox} from '@sanity/ui'
import {useState} from 'react'

// label is a required prop — Checkbox renders its own <label>; don't add a separate one.
export function AgreeCheckbox() {
  const [agreed, setAgreed] = useState(false)
  return (
    <Checkbox
      label="I agree to the terms"
      checked={agreed}
      onChange={(e) => setAgreed(e.currentTarget.checked)}
    />
  )
}
