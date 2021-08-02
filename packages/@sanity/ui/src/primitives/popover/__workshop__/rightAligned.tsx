import {CalendarIcon} from '@sanity/icons'
import {Box, Button, Flex, Inline, Popover, Text, useClickOutside} from '@sanity/ui'
import React, {useCallback, useState} from 'react'

export default function RightAlignedStory() {
  const [open, setOpen] = useState(false)
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
  const content = (
    <Box padding={3}>
      <Inline space={3}>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
      </Inline>
    </Box>
  )

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  useClickOutside(handleClose, [popoverElement])

  return (
    <Flex justify="flex-end" padding={[4, 5, 6]}>
      <Popover content={content} open={open} portal preventOverflow ref={setPopoverElement}>
        <Button icon={CalendarIcon} mode="ghost" onClick={handleOpen} selected={open} />
      </Popover>
    </Flex>
  )
}
