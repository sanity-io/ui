import {CropIcon} from '@sanity/icons'
import {Box, Code, Stack} from '@sanity/ui'
import {FONT_CODE_SIZE} from '@sanity/ui/tokens'

import {CardWrapper} from '$workshop'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <CardWrapper width={0}>
      <Stack gap={4}>
        {FONT_CODE_SIZE.map((size) => (
          <Box key={size} display="flex" gap={2}>
            <Box flex="none" muted shadow={1}>
              <Code size={size}>
                <CropIcon />
              </Code>
            </Box>
            <Box flex={1} muted shadow={1}>
              <Code size={size}>Hamburgefonstiv M</Code>
            </Box>
          </Box>
        ))}
      </Stack>
    </CardWrapper>
  )
}
