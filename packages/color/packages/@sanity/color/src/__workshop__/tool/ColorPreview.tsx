import {Card, Flex, Text} from '@sanity/ui'
import {getContrast} from 'polished'
import {memo, useMemo} from 'react'
import {color} from '../../color'
import {hslToRgb, rgbToHex} from '../../lib/convert'
import {HSL} from '../../types'

const AA_CONTRAST_THRESHOLD = 4.5

export const ColorPreview = memo(function ColorPreview(props: {expanded: boolean; hsl: HSL}) {
  const {expanded, hsl} = props

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
      height: expanded ? 84 : 52,
      backgroundColor: `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`,
    }),
    [expanded, hsl],
  )

  return (
    <Card flex={1} padding={2} radius={2} sizing="border" style={style}>
      <Flex gap={1}>
        {contrast.dark >= AA_CONTRAST_THRESHOLD && (
          <Card padding={1} radius={1} scheme="dark">
            <Text size={0} weight="bold">
              AA &middot; {contrast.dark.toFixed(1)}:1
            </Text>
          </Card>
        )}

        {contrast.light >= AA_CONTRAST_THRESHOLD && (
          <Card padding={1} radius={1} scheme="light">
            <Text size={0} weight="bold">
              AA &middot; {contrast.light.toFixed(1)}:1
            </Text>
          </Card>
        )}
      </Flex>
    </Card>
  )
})
