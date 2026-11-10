import {Button, Checkbox, Flex, Popover, Select, Text, VStack} from '@sanity/ui'

// A filter panel. The Popover does not move focus when it opens, so
// autoFocus on the first control sends keyboard and screen reader users
// straight into the panel instead of leaving them on the trigger.
export function FilterPopover() {
  return (
    <Popover
      content={
        <VStack gap={3}>
          <VStack gap={1}>
            <Text as="label" size={1} htmlFor="filter-status">
              Status
            </Text>
            <Select id="filter-status" autoFocus>
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </VStack>
          <Flex alignItems="center" gap={2}>
            <Checkbox id="only-mine" />
            <Text as="label" size={1} htmlFor="only-mine">
              Only my documents
            </Text>
          </Flex>
        </VStack>
      }
    >
      <Button text="Filters" level="secondary" />
    </Popover>
  )
}
