import {CropIcon} from '@sanity/icons'
import {Box, Stack, Text} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {FONT_TEXT_SIZE} from '@sanity/ui/theme'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <Stack gap={4} padding={[4, 5, 6]}>
      {FONT_TEXT_SIZE.map((size) => (
        <Box display="flex" gap={2} key={size}>
          <div style={{outline: `0.5px solid ${vars.color.tinted.suggest.border[4]}`}}>
            <Text size={size}>
              <CropIcon />
            </Text>
          </div>
          <div style={{outline: `0.5px solid ${vars.color.tinted.suggest.border[4]}`}}>
            <Text size={size}>Hamburgefonstiv M</Text>
          </div>
        </Box>
      ))}
    </Stack>
  )
}
