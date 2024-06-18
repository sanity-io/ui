import {_getArrayProp, FlexValue} from '@sanity/ui'
import {clamp} from '../../lib/clamp'
import {styles} from './flex.css'

export function flex(value?: FlexValue | FlexValue[]): string[] {
  return _getArrayProp(value)
    .map((v, i) => {
      const _i = clamp(i, 0, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6

      if (v === 'none') return styles[`none_${_i}`]
      if (v === 'auto') return styles[`auto_${_i}`]
      if (v === 'initial') return styles[`initial_${_i}`]

      if (typeof v === 'number') {
        return styles[`${clamp(v, 0, 9) as 1 | 2 | 3}_${_i}`]
      }

      return undefined
    })
    .filter(Boolean) as string[]
}
