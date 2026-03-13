import {CropIcon} from '@sanity/icons'
import {Box, Heading, Stack} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {FONT_HEADING_SIZE} from '@sanity/ui/tokens'

import {CardWrapper} from '$workshop'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <CardWrapper width={1}>
      <Stack gap={4}>
        {FONT_HEADING_SIZE.map((size) => (
          <Box key={size} display="flex" gap={3}>
            <Box flex="none" muted style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}>
              <Heading muted size={size} weight="semibold">
                <CropIcon />
              </Heading>
            </Box>
            <Box flex={1} muted style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}>
              <Heading muted size={size} textOverflow="ellipsis" weight="semibold">
                Hamburgefonstiv M
              </Heading>
            </Box>
          </Box>
        ))}
      </Stack>
    </CardWrapper>
  )
}
