import {AddCircleIcon} from '@sanity/icons'
import {Box, Card, Flex, Label, Stack} from '@sanity/ui'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack gap={1}>
        <Flex>
          <Card padding={0} shadow={1} tone="suggest">
            <Label size={5}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} shadow={1} tone="suggest">
            <Label size={4}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} shadow={1} tone="suggest">
            <Label size={3}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} shadow={1} tone="suggest">
            <Label size={2}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} shadow={1} tone="suggest">
            <Label size={1}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} shadow={1} tone="suggest">
            <Label size={0}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} shadow={1} tone="suggest">
            <Label>
              <AddCircleIcon />
            </Label>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
