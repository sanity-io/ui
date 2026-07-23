import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Heading,
  Inline,
  Radio,
  Stack,
  Switch,
  Text,
  ThemeProvider,
} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'

const theme = buildTheme()

function Ui3() {
  return (
    <ThemeProvider theme={theme}>
      <Box margin={4}>
        <Box marginBottom={5}>
          <Heading as="h2">UI 3</Heading>
        </Box>
        <Box marginBottom={4}>
          <Text as="p">A measure of the USS Sanity’s DOM engines</Text>
        </Box>
        <Card tone="neutral" padding={5} radius={3} shadow={1}>
          <Container>
            <Stack gap={[1, 2]}>
              <Inline gap={3}>
                <Checkbox id="checkbox-hey" name="checkboxes" defaultChecked />
                <Text>
                  <label htmlFor="checkbox-hey">Hey</label>
                </Text>
              </Inline>
              <Inline gap={3}>
                <Checkbox id="checkbox-ho" name="checkboxes" />
                <Text>
                  <label htmlFor="checkbox-ho">Ho</label>
                </Text>
              </Inline>
              <Card padding={4} tone="transparent" radius={3} shadow={1}>
                <Inline gap={3}>
                  <Inline gap={3}>
                    <Radio id="radio-go" name="radios" defaultChecked />
                    <Text>
                      <label htmlFor="radio-go">Let’s go</label>
                    </Text>
                  </Inline>
                  <Inline gap={3}>
                    <Radio id="radio-nogo" name="radios" />
                    <Text>
                      <label htmlFor="radio-nogo">Let’s not go</label>
                    </Text>
                  </Inline>
                </Inline>
              </Card>
              <Inline gap={3}>
                <Switch id="switch-warp" />
                <Text>
                  <label htmlFor="switch-warp">Engage warp drive</label>
                </Text>
              </Inline>
            </Stack>
          </Container>
          <Box marginY={4}>
            <hr
              style={{
                border: 0,
                borderTop: '1px solid var(--card-border-color, #e3e4e8)',
                margin: 0,
              }}
            />
          </Box>
          <Box marginY={3}>
            <Inline gap={3}>
              <Button text="Make it so, Number One" />
              <Button mode="ghost" tone="critical" text="Belay that order, Commander" />
              <Text as="a" href="https://example.org">
                Refer to the Prime Directive
              </Text>
            </Inline>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default Ui3
