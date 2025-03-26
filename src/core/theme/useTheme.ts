import {getTheme_v2, Theme, Theme_v2} from '@sanity/ui/theme'
import {useTheme as useStyledTheme} from 'styled-components'

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
