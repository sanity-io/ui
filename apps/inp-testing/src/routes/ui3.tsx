import {
  Button,
  Card,
  Checkbox,
  Heading,
  Radio,
  Switch,
  Text,
  Stack,
  ThemeProvider,
  Inline,
} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'

function Ui3() {
  const theme = buildTheme()
  return (
    <ThemeProvider theme={theme}>
      <Stack padding={4} gap={4}>
        <Heading>UI 3</Heading>

        <Stack gap={4}>
          <Card tone="neutral" padding={3}>
            <Stack gap={3}>
              <Text size={1} weight="semibold">
                Radio inputs
              </Text>
              <Inline gap={3}>
                <Radio name="radios" id="radio1" />
                <Text>
                  <label htmlFor="radio1">Radio one</label>
                </Text>
              </Inline>
              <Inline gap={3}>
                <Radio name="radios" id="radio2" />
                <Text>
                  <label htmlFor="radio2">Radio two</label>
                </Text>
              </Inline>
            </Stack>
          </Card>
          <Card tone="neutral" padding={3}>
            <Stack gap={3}>
              <Text size={1} weight="semibold">
                Radio inputs
              </Text>
              <Inline gap={3}>
                <Checkbox id="check1" />
                <Text>
                  <label htmlFor="check1">Checkbox one</label>
                </Text>
              </Inline>
              <Inline gap={3}>
                <Checkbox id="check2" />
                <Text>
                  <label htmlFor="check2">Checkbox two</label>
                </Text>
              </Inline>
            </Stack>
          </Card>
          <Card tone="neutral" padding={3}>
            <Stack gap={3}>
              <Text size={1} weight="semibold">
                Switch inputs
              </Text>
              <Inline gap={3}>
                <Switch id="switch1" />
                <Text>
                  <label htmlFor="switch1">Switch one</label>
                </Text>
              </Inline>
              <Inline gap={3}>
                <Switch id="switch2" />
                <Text>
                  <label htmlFor="switch2">Switch two</label>
                </Text>
              </Inline>
            </Stack>
          </Card>
          <Card tone="neutral" padding={3}>
            <Stack gap={3}>
              <Text size={1} weight="semibold">
                Buttons
              </Text>
              <Button text="Button one" />
              <Button mode="bleed" text="Button two" />
              <Button mode="ghost" text="Button three" />
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default Ui3
