import {_getArrayProp, GridItemColumn} from '@sanity/ui'
import {getMedia} from '../helpers'
import {styles} from './column.css'

export function column(value?: GridItemColumn | GridItemColumn[]): string[] {
  return _getArrayProp(value)
    .map((v, i) => {
      if (v === 'auto') return styles[`auto_${getMedia(i)}`]
      if (v === 'full') return styles[`full_${getMedia(i)}`]

      // todo: number
      if (v === 1) return styles[`1_${getMedia(i)}`]
      if (v === 2) return styles[`2_${getMedia(i)}`]
      if (v === 3) return styles[`3_${getMedia(i)}`]

      return undefined
    })
    .filter(Boolean) as string[]
}
