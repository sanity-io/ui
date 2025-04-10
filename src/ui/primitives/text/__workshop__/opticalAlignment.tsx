import {AddCircleIcon} from '@sanity/icons'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        <Flex>
          <Card padding={0} tone="neutral">
            <Text size={4}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Text size={3}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Text size={2}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Text size={1}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Text size={0}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} tone="neutral">
            <Text>
              <AddCircleIcon />
            </Text>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
