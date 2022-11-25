import {Card, Text, useTheme} from '@sanity/ui'
import {getContrast} from 'polished'
import {memo, useMemo} from 'react'
import {color} from '../../color'
import {hslToRgb, rgbToHex} from '../../lib/convert'
import {HSL} from '../../types'

export const ColorPreview = memo(function ColorPreview(props: {expanded: boolean; hsl: HSL}) {
  const {expanded, hsl} = props
  const {base, dark} = useTheme().sanity.color
  const bg = dark ? color.black.hex : color.white.hex

  const hex = rgbToHex(hslToRgb(hsl))
  const contrast = getContrast(hex, bg)

  const style = useMemo(
    () => ({
      height: expanded ? 100 : 50,
      backgroundColor: `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`,
    }),
    [expanded, hsl]
  )

  return (
    <Card flex={1} padding={2} radius={2} sizing="border" style={style}>
      <Text size={0} style={{color: contrast < 5 ? base.fg : bg}}>
        {contrast}
      </Text>
    </Card>
  )
})
