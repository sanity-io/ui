import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  Radio,
  Switch,
  Text,
  VStack,
} from '@sanity-labs/ui-poc'

import '@sanity-labs/ui-poc/styles.css'

function UiPoc() {
  return (
    <Box margin={4}>
      <Heading as="h2" marginBottom={5}>
        UI POC
      </Heading>
      <Text as="p" marginBottom={4}>
        A measure of the USS Sanity’s DOM engines
      </Text>
      <Card tone="neutral" density="loose">
        <Container size={2} marginLeft={0}>
          <VStack gap={[1, 2]}>
            <Checkbox name="checkboxes" label="Hey" defaultChecked />
            <Checkbox name="checkboxes" label="Ho" />
            <Card>
              <HStack gap={3}>
                <Radio name="radios" label="Let’s go" defaultChecked />
                <Radio name="radios" label="Let’s not go" />
              </HStack>
            </Card>
            <Switch label="Engage warp drive" />
          </VStack>
        </Container>
        <Divider marginY={4} />
        <Box marginY={3}>
          <HStack gap={3}>
            <Button density="loose" text="Make it so, Number One" />
            <Button
              density="loose"
              level="secondary"
              tone="critical"
              text="Belay that order, Commander"
            />
            <Link href="https://example.org">Refer to the Prime Directive</Link>
          </HStack>
        </Box>
      </Card>
    </Box>
  )
}

export default UiPoc
