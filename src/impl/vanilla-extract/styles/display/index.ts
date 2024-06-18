import {_getArrayProp, BoxDisplay} from '@sanity/ui'
import {getMedia} from '../helpers'
import {styles} from './display.css'

export function display(value?: BoxDisplay | BoxDisplay[]): string[] {
  return _getArrayProp(value)
    .map((v, i) => {
      if (v === 'none') return styles[`none_${getMedia(i)}`]
      if (v === 'block') return styles[`block_${getMedia(i)}`]
      if (v === 'grid') return styles[`grid_${getMedia(i)}`]
      if (v === 'flex') return styles[`flex_${getMedia(i)}`]
      if (v === 'inline-block') return styles[`inline-block_${getMedia(i)}`]

      return undefined
    })
    .filter(Boolean) as string[]
}
