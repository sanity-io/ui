import {ColorBlendModeValue} from '../../../system'

/**
 * @public
 */
export interface ThemeColorGenericState {
  /** @internal */
  _blend?: ColorBlendModeValue
  bg: string
  /**
   * @beta
   */
  bg2?: string
  border: string
  fg: string
  iconColor: string
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
