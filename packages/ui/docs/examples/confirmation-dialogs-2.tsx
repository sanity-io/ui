import {Popover, Box, VStack, Text, Button, Flex} from '@sanity/ui'
import {useRef} from 'react'

function DeleteRowConfirm({onConfirm, message}: {onConfirm: () => void; message: string}) {
  // Popover is uncontrolled — the trigger opens it and the browser closes it.
  // There is no open/onClose prop, and Escape and outside-click dismissal come
  // from the browser. To close it yourself after confirming, call the native
  // popover API on the content element.
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Popover
      placement="top"
      content={
        <Box ref={contentRef} padding={3}>
          <VStack gap={3}>
            <Text size={1}>{message}</Text>
            <Flex gap={2} justifyContent="flex-end">
              <Button
                autoFocus
                text="Cancel"
                level="secondary"
                onClick={() => contentRef.current?.hidePopover()}
              />
              <Button
                text="Delete"
                tone="critical"
                onClick={() => {
                  onConfirm()
                  contentRef.current?.hidePopover()
                }}
              />
            </Flex>
          </VStack>
        </Box>
      }
    >
      <Button text="Delete" tone="critical" level="tertiary" />
    </Popover>
  )
}
