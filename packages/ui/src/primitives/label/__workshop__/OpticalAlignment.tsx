import {CropIcon} from '@sanity/icons'
import {Box, FONT_LABEL_SIZE, Label, Stack} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <CardWrapper width={0}>
      <Stack gap={4}>
        {FONT_LABEL_SIZE.map((size) => (
          <Box key={size} display="flex" gap={2}>
            <Box flex="none" muted shadow={1}>
              <Label muted size={size}>
                <CropIcon />
              </Label>
            </Box>
            <Box flex={1} muted shadow={1}>
              <Label muted size={size} textOverflow="ellipsis">
                Hamburgefonstiv M
              </Label>
            </Box>
          </Box>
        ))}
      </Stack>
    </CardWrapper>
  )
}
