import {CropIcon} from '@sanity/icons'
import {Box, Code, Stack} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {FONT_CODE_SIZE} from '@sanity/ui/theme'

export default function OpticalAlignment() {
  return (
    <Stack gap={3} padding={[4, 5, 6]}>
      {FONT_CODE_SIZE.map((size) => (
        <Box display="flex" gap={2} key={size}>
          <div style={{outline: `0.5px solid ${vars.color.tinted.suggest.border[4]}`}}>
            <Code size={size}>
              <CropIcon />
            </Code>
          </div>
          <div style={{outline: `0.5px solid ${vars.color.tinted.suggest.border[4]}`}}>
            <Code size={size}>Hamburgefonstiv M</Code>
          </div>
        </Box>
      ))}
    </Stack>
  )
}
