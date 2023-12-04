import {buildTheme} from './build'

export * from './build'
export * from './config'
export * from './getScopedTheme'
export * from './system'
export * from './versioning'

/**
 * @public
 */
export const defaultTheme = buildTheme()
