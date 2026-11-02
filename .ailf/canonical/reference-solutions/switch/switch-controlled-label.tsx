import {Switch} from '@sanity/ui'
import {useState} from 'react'

// Switch sets role="switch" itself — don't add it. label is required; control with checked/onChange.
export function NotificationsSwitch() {
  const [on, setOn] = useState(true)
  return (
    <Switch
      label="Email notifications"
      checked={on}
      onChange={(e) => setOn(e.currentTarget.checked)}
    />
  )
}
