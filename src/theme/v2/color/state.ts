import {ThemeColorBlendModeKey} from './_system'
import {ThemeColorAvatar_v2} from './avatar'
import {ThemeColorBadge_v2} from './badge'
import {ThemeColorKBD} from './kbd'

/**
 * @public
 */
export interface ThemeColorState_v2 {
  /** @internal */
  _blend?: ThemeColorBlendModeKey
  accent: {
    fg: string
  }
  /**
   * @internal  This may be removed in a future release
   * */
  avatar: ThemeColorAvatar_v2
  /**
   * @internal  This may be removed in a future release
   * */
  badge: ThemeColorBadge_v2
  bg: string
  border: string
  code: {
    bg: string
    fg: string
  }
  fg: string
  icon: string
  kbd: ThemeColorKBD
  link: {
    fg: string
  }
  muted: {
    bg: string
    fg: string
  }
  skeleton: {
    from: string
    to: string
  }
}
