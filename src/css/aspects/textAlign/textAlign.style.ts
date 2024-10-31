import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

export const util: StyleRules = {}

_responsiveRule(util, `text-align-initial`, {
  textAlign: 'initial',
})

_responsiveRule(util, `text-align-left`, {
  textAlign: 'left',
})

_responsiveRule(util, `text-align-center`, {
  textAlign: 'center',
})

_responsiveRule(util, `text-align-right`, {
  textAlign: 'right',
})

_responsiveRule(util, `text-align-justify`, {
  textAlign: 'justify',
})

export const textAlignStyle: Style = {layers: {util}}
