import {ThemeColorBlendModeKey} from '../../color/_system'

/**
 * @public
 * @deprecated Use `ThemeColorState_v2` instead.
 */
export interface ThemeColorGenericState {
  /** @internal */
  _blend?: ThemeColorBlendModeKey
  bg: string
  /**
   * @beta
   */
  bg2?: string
  border: string
  fg: string
  icon: string
  muted: {
    fg: string
  }
  accent: {
    fg: string
  }
  link: {
    fg: string
  }
  code: {
    bg: string
    fg: string
  }
  skeleton?: {
    from: string
    to: string
  }
}
