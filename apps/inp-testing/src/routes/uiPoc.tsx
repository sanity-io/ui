import {
  Box,
  Button,
  Card,
  Checkbox,
  Heading,
  Radio,
  Switch,
  Text,
  VStack,
} from '@sanity-labs/ui-poc'

function UiPoc() {
  return (
    <Box padding={4}>
      <Heading marginBottom={4}>UI POC</Heading>

      <VStack gap={4}>
        <Card>
          <VStack gap={3}>
            <Text size={1} weight="semibold">
              Radio inputs
            </Text>
            <Radio name="radios" label="Radio one" />
            <Radio name="radios" label="Radio two" />
          </VStack>
        </Card>
        <Card>
          <VStack gap={3}>
            <Text size={1} weight="semibold">
              Checkbox inputs
            </Text>
            <Checkbox name="checkboxes" label="Checkbox one" />
            <Checkbox name="checkboxes" label="Checkbox two" />
          </VStack>
        </Card>
        <Card>
          <VStack gap={3}>
            <Text size={1} weight="semibold">
              Switch inputs
            </Text>
            <Switch name="switches" label="Switch one" />
            <Switch name="switches" label="Switch two" />
          </VStack>
        </Card>
        <Card>
          <VStack gap={3}>
            <Text size={1} weight="semibold">
              Buttons
            </Text>
            <Button text="Button one" />
            <Button level="secondary" text="Button two" />
            <Button level="tertiary" text="Button three" />
          </VStack>
        </Card>
      </VStack>
    </Box>
  )
}

export default UiPoc
