import {Button, Card, Dialog, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {useState} from 'react'

import {useThemeCodes} from './useThemeCodes'

/**
 * Where a theme code someone shared gets pasted by hand — for browsers that
 * do not hand the clipboard over, and for codes that are not on it.
 *
 * @internal
 */
export function PasteThemeDialog(props: {onClose: () => void}) {
  const {onClose} = props
  const {addThemeFromText} = useThemeCodes()
  const [text, setText] = useState('')
  const [invalid, setInvalid] = useState(false)

  const add = () => {
    if (addThemeFromText(text)) {
      onClose()
    } else {
      setInvalid(true)
    }
  }

  return (
    <Dialog
      animate
      footer={
        <Flex gap={2} justify="flex-end" padding={3}>
          <Button mode="ghost" onClick={onClose} padding={2} text="Cancel" />
          <Button
            disabled={text.trim() === ''}
            onClick={add}
            padding={2}
            text="Add theme"
            tone="primary"
          />
        </Flex>
      }
      header="Add a shared theme"
      id="themer-paste"
      onClickOutside={onClose}
      onClose={onClose}
      width={0}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault()
          add()
        }}
      >
        <Stack gap={3} padding={4}>
          <Text muted size={1}>
            Paste the code someone copied from their themer — the theme is added to your list and
            applied.
          </Text>
          <TextInput
            aria-describedby={invalid ? 'themer-paste-error' : undefined}
            aria-invalid={invalid}
            aria-label="Theme code"
            autoFocus
            customValidity={invalid ? 'That is not a theme code' : undefined}
            fontSize={1}
            onChange={(event) => {
              setText(event.currentTarget.value)
              setInvalid(false)
            }}
            placeholder="AQ…"
            value={text}
          />
          {invalid && (
            <Card id="themer-paste-error" padding={3} radius={2} role="alert" tone="critical">
              <Text size={1}>
                That is not a theme code — codes are one word, copied from a theme&apos;s menu.
              </Text>
            </Card>
          )}
        </Stack>
      </form>
    </Dialog>
  )
}
