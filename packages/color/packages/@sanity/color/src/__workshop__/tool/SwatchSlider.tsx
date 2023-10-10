import {memo, useCallback} from 'react'
import {ColorTintKey, HSL} from '../../types'
import {HSLSlider} from './Slider'
import {ColorToolSwatch} from './types'

export const SwatchSlider = memo(function SwatchSlider(props: {
  swatch: ColorToolSwatch
  tint: ColorTintKey
  updateSwatch: (tint: ColorTintKey, hsl: HSL) => void
}) {
  const {tint, swatch, updateSwatch} = props

  const handleChange = useCallback((hsl: HSL) => updateSwatch(tint, hsl), [updateSwatch, tint])

  return <HSLSlider onHSLChange={handleChange} value={swatch.hsl} />
})
