import {Button, Popover, Text, TextInput, VStack} from '@sanity/ui'
import {useRef, useState} from 'react'

// Close the popover from code once the form inside it is submitted.
// The ref on Popover reaches the native popover element, so the browser's own
// showPopover(), hidePopover() and togglePopover() are available on it.
export function RenamePopover({name, onRename}: {name: string; onRename: (next: string) => void}) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(name)

  return (
    <Popover
      ref={popoverRef}
      content={
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onRename(value)
            popoverRef.current?.hidePopover()
          }}
        >
          <VStack gap={2}>
            <Text as="label" size={1} htmlFor="rename">
              Name
            </Text>
            <TextInput
              autoFocus
              id="rename"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <Button type="submit" text="Save" />
          </VStack>
        </form>
      }
    >
      <Button level="secondary" text="Rename" />
    </Popover>
  )
}
