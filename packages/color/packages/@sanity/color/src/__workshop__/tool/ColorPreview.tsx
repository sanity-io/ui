import {Box, Card, Flex, Text, useTheme} from '@sanity/ui'
import {getContrast} from 'polished'
import {memo, useMemo} from 'react'
import {color} from '../../color'
import {hslToRgb, rgbToHex} from '../../lib/convert'
import {HSL} from '../../types'

const AA_CONTRAST_THRESHOLD = 4.5

export const ColorPreview = memo(function ColorPreview(props: {
  expanded: boolean
  hsl: HSL
  showAABadges?: boolean
  showContrast?: boolean
}) {
  const {expanded, hsl, showAABadges, showContrast} = props
  const {dark} = useTheme().sanity.color

  const hex = rgbToHex(hslToRgb(hsl))

  const contrast = useMemo(
    () => ({
      dark: getContrast(hex, color.black.hex),
      light: getContrast(hex, color.white.hex),
    }),
    [hex],
  )

  const style = useMemo(
    () => ({
      height: 31,
      // height: expanded ? 84 : 52,
      backgroundColor: `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`,
    }),
    [expanded, hsl],
  )

  return (
    <Card
      flex={1}
      padding={2}
      // radius={2}
      sizing="border"
      style={style}
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
              <Text size={0} weight="bold">
                {contrast[dark ? 'dark' : 'light'].toFixed(2)}:1
              </Text>
            </Box>
          )}
        </Flex>
      )}
    </Card>
  )
})
