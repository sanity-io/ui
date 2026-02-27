import {CropIcon} from '@sanity/icons'
import {Box, Code, Stack} from '@sanity/ui'
import {elementTone, vars} from '@sanity/ui/css'
import {FONT_CODE_SIZE} from '@sanity/ui/theme'

import {CardWrapper} from '$workshop'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <CardWrapper width={0}>
      <Stack gap={4}>
        {FONT_CODE_SIZE.map((size) => (
          <Box key={size} display="flex" gap={2}>
            <Box
              className={elementTone({elementTone: 'suggest'})}
              flex="none"
              muted
              style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}
            >
              <Code size={size}>
                <CropIcon />
              </Code>
            </Box>
            <Box
              className={elementTone({elementTone: 'suggest'})}
              flex={1}
              muted
              style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}
            >
              <Code size={size}>Hamburgefonstiv M</Code>
            </Box>
          </Box>
        ))}
      </Stack>
    </CardWrapper>
  )
}
