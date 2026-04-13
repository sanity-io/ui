import {CropIcon} from '@sanity/icons'
import {Box, Stack, Text} from '@sanity/ui'
import {FONT_TEXT_SIZE} from '@sanity/ui/tokens'

import {CardWrapper} from '$workshop'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <CardWrapper width={0}>
      <Stack gap={4}>
        {FONT_TEXT_SIZE.map((size) => (
          <Box key={size} display="flex" gap={2}>
            <Box flex="none" muted shadow={1}>
              <Text muted size={size}>
                <CropIcon />
              </Text>
            </Box>
            <Box flex={1} muted shadow={1}>
              <Text muted size={size} textOverflow="ellipsis">
                Hamburgefonstiv M
              </Text>
            </Box>
          </Box>
        ))}
      </Stack>
    </CardWrapper>
  )
}
