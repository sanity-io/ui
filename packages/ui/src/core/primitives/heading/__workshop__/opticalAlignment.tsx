import {AddCircleIcon} from '@sanity/icons'
import {Box, Card, Flex, Heading, Stack} from '@sanity/ui'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        <Flex>
          <Card padding={0} tone="neutral">
            <Heading size={5}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Heading size={4}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Heading size={3}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Heading size={2}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Heading size={1}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} tone="neutral">
            <Heading size={0}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} tone="neutral">
            <Heading accent>
              <AddCircleIcon />
            </Heading>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
