import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'min-w-0', {minWidth: '0'})
_responsiveRule(util, 'min-w-auto', {minWidth: 'auto'})
_responsiveRule(util, 'min-w-full', {minWidth: '100%'})
_responsiveRule(util, 'min-w-min', {minWidth: 'min-content'})
_responsiveRule(util, 'min-w-max', {minWidth: 'max-content'})
_responsiveRule(util, 'min-w-fit', {minWidth: 'fit-content'})

export const minWidthStyle: Style = {layers: {util}}
