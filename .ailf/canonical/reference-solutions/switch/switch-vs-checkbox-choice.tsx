import {Switch} from '@sanity/ui'
import {useState} from 'react'

// Use Switch for a setting that applies immediately (on/off state), not Checkbox
// (which suits form selection / submit-on-save). Both take a required `label`.
// Word the label for the ON state as a present-tense verb phrase, and commit the
// change in onChange — a Switch never pairs with a Save/confirm button.
export function DarkModeSetting() {
  const [enabled, setEnabled] = useState(false)
  return (
    <Switch
      label="Enable dark mode"
      checked={enabled}
      onChange={(e) => setEnabled(e.currentTarget.checked)}
    />
  )
}
