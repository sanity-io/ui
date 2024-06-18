import {css} from '@pigment-css/react'
import {_getArrayProp, FlexValue} from '@sanity/ui'

const flexStyles = {
  none: [css({flex: 'none'})],
  initial: [css({flex: 'initial'})],
  auto: [css({flex: 'auto'})],
  1: [css({flex: 1})],
  2: [css({flex: 2})],
}

export function flexStyle(value: FlexValue | FlexValue[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    if (v === 1) return flexStyles[1][i]
    if (v === 2) return flexStyles[2][i]

    if (typeof v === 'number') return css({flex: 1})

    return flexStyles[v][i]
  })
}
