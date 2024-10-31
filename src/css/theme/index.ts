import {buildTheme_v3} from '@sanity/ui/theme'

import {resolveTheme} from './resolveTheme'

const result = resolveTheme({theme: buildTheme_v3()})

/** @public */
export const vars = result.vars

/** @public */
export const varNames = result.varNames

/** @public */
export const properties = result.properties
