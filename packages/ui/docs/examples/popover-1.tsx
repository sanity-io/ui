import {Button, Checkbox, Flex, Popover, Select, Text, VStack} from '@sanity/ui'
import {type ReactNode, useEffect, useRef} from 'react'

// Focuses the first control inside the panel. Popover keeps its content mounted
// while it is closed, and the effect runs again each time the panel opens. Popover
// does not move focus on its own, so this keeps keyboard and screen reader users
// from being left on the trigger.
function FocusOnOpen({children}: {children: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('select, input, button')?.focus()
  }, [])

  return <div ref={ref}>{children}</div>
}

// A filter panel. Opening it moves focus to the first filter.
export function FilterPopover() {
  return (
    <Popover
      content={
        <FocusOnOpen>
          <VStack gap={3}>
            <VStack gap={1}>
              <Text as="label" size={1} htmlFor="filter-status">
                Status
              </Text>
              <Select id="filter-status">
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
        </FocusOnOpen>
      }
    >
      <Button text="Filters" level="secondary" />
    </Popover>
  )
}
