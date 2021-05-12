import {useTheme as useStyledTheme} from 'styled-components'

import {Theme} from './types'

export function useTheme(): Theme {
  return useStyledTheme() as Theme
}
