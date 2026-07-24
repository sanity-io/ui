import {black, HSL, hslToRgb, rgbToHex, white} from '@sanity/color'
import {Box, Card, Flex, Text, useRootTheme} from '@sanity/ui'
import {getContrastRatio} from '@sanity/ui/theme'

import {AA_CONTRAST_THRESHOLD} from '../contrast'

export function ColorPreview(props: {hsl: HSL; showAABadges?: boolean; showContrast?: boolean}) {
  const {hsl, showAABadges, showContrast} = props
  const dark = useRootTheme().scheme === 'dark'

  const hex = rgbToHex(hslToRgb(hsl))

  const contrast = {
    dark: getContrastRatio(hex, black.hex),
    light: getContrastRatio(hex, white.hex),
  }

  return (
    <Card
      flex={1}
      padding={2}
      sizing="border"
      style={{height: 31, backgroundColor: `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`}}
    >
      {(showAABadges || showContrast) && (
        <Flex gap={1}>
          {showAABadges && (
            <>
              {contrast.dark >= AA_CONTRAST_THRESHOLD && (
                <Card padding={1} radius={1} scheme="dark">
                  <Text size={0} weight="bold">
                    AA
                  </Text>
                </Card>
              )}

              {contrast.light >= AA_CONTRAST_THRESHOLD && (
                <Card padding={1} radius={1} scheme="light">
                  <Text size={0} weight="bold">
                    AA
                  </Text>
                </Card>
              )}
            </>
          )}

          {showContrast && (
            <Box padding={1}>
              {/* Color by tint lightness: the Card behind is the swatch color,
                  not a theme background */}
              <Text size={0} style={{color: hsl[2] < 50 ? white.hex : black.hex}} weight="bold">
                {contrast[dark ? 'dark' : 'light'].toFixed(2)}:1
              </Text>
            </Box>
          )}
        </Flex>
      )}
    </Card>
  )
}
