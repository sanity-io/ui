import {Flex, Hotkeys, Label, Stack} from '@sanity/ui'

export default function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Stack space={3}>
        <Label>Default font size</Label>
        <Hotkeys keys={['Shift', 'Tab']} />

        <Label>Larger</Label>
        <Hotkeys fontSize={2} keys={['Ctrl', 'Shift', 'P']} />

        <Label>Ctrl+Alt+I input, shows platform-appropriate</Label>
        <Hotkeys fontSize={3} keys={['Ctrl', 'Alt', 'I']} />

        <Label>Ctrl+Option+I input, shows platform-appropriate</Label>
        <Hotkeys fontSize={3} keys={['Ctrl', 'Option', 'I']} />
      </Stack>
    </Flex>
  )
}
