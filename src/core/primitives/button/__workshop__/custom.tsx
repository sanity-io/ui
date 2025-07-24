import {Button, Flex, Grid, Hotkeys, Stack, Text} from '@sanity/ui'
import {BUTTON_MODES, ELEMENT_TONES} from '@sanity/ui/theme'

export default function CustomStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Stack gap={2}>
        {BUTTON_MODES.map((mode) => (
          <Grid gridTemplateColumns={7} gap={1} key={mode}>
            {ELEMENT_TONES.map((tone) => (
              <Button key={tone} mode={mode} padding={3} tone={tone}>
                <Stack gap={2}>
                  <Text>Text</Text>
                  <Text muted>Muted</Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                  <Hotkeys keys={['Cmd', 'C']} />
                </Stack>
              </Button>
            ))}
          </Grid>
        ))}
      </Stack>
    </Flex>
  )
}
