import {CropIcon} from '@sanity/icons'
import {Box, Stack, Text} from '@sanity/ui'
import {elementTone, vars} from '@sanity/ui/css'
import {FONT_TEXT_SIZE} from '@sanity/ui/tokens'

import {CardWrapper} from '$workshop'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <CardWrapper width={0}>
      <Stack gap={4}>
        {FONT_TEXT_SIZE.map((size) => (
          <Box key={size} display="flex" gap={2}>
            <Box
              className={elementTone({elementTone: 'suggest'})}
              flex="none"
              muted
              style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}
            >
              <Text muted size={size}>
                <CropIcon />
              </Text>
            </Box>
            <Box
              className={elementTone({elementTone: 'suggest'})}
              flex={1}
              muted
              style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}
            >
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
