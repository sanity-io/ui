import {Theme, Theme_v2, getTheme_v2} from '@sanity/ui/theme'
import {useTheme as useStyledTheme} from '../lib/styled'

/**
 * @public
 */
export function useTheme(): Theme {
  return useStyledTheme() as Theme
}

/**
 * @public
 */
export function useTheme_v2(): Theme_v2 {
  return getTheme_v2(useStyledTheme() as Theme)
}
