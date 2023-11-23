import {Theme} from '@sanity/ui/theme'
import {useTheme as useStyledTheme} from 'styled-components'

/**
 * @public
 */
export function useTheme(): Theme {
  return useStyledTheme() as Theme
}
