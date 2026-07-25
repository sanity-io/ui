import {useTheme as useStyledTheme} from 'styled-components'

import {Theme, Theme_v2} from '../../theme/system/theme'
import {getTheme_v2} from '../../theme/versioning/getTheme_v2'

/**
 * @public
 */
export function useTheme(): Theme {
  // oxlint-disable-next-line no-unnecessary-type-assertion
  return useStyledTheme() as Theme
}

/**
 * @public
 */
export function useTheme_v2(): Theme_v2 {
  // oxlint-disable-next-line no-unnecessary-type-assertion
  return getTheme_v2(useStyledTheme() as Theme)
}
