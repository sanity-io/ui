import {ButtonMode} from '@sanity/ui'
import {ThemeColorCardToneKey, ThemeColorStateToneKey} from '@sanity/ui/theme'

interface StateWriteConfig {
  accent?: boolean
  avatar?: boolean
  badge?: boolean
  code?: boolean
  kbd?: boolean
  link?: boolean
  skeleton?: boolean
}

export interface WriteConfig {
  dryRun?: boolean
  tones: Partial<
    Record<
      ThemeColorCardToneKey,
      StateWriteConfig & {
        button?: StateWriteConfig & {
          modes?: Partial<
            Record<ButtonMode, Partial<Record<ThemeColorStateToneKey, StateWriteConfig>>>
          >
        }
        input?: boolean
        selectable?: Partial<Record<ThemeColorStateToneKey, StateWriteConfig>>
      }
    >
  >
}

export const config: WriteConfig = {
  dryRun: false,
  tones: {
    default: {
      accent: true,
      avatar: true,
      badge: true,
      button: {
        modes: {
          default: {
            default: {},
            neutral: {},
            primary: {},
            suggest: {},
            positive: {},
            caution: {},
            critical: {},
          },
          ghost: {
            default: {},
            neutral: {},
            primary: {},
            suggest: {},
            positive: {},
            caution: {},
            critical: {},
          },
          bleed: {
            default: {},
            neutral: {},
            primary: {},
            suggest: {},
            positive: {},
            caution: {},
            critical: {},
          },
        },
      },
      code: true,
      input: true,
      kbd: true,
      link: true,
      selectable: {
        default: {avatar: true, badge: true, kbd: true},
        neutral: {avatar: true, badge: true, kbd: true},
        primary: {avatar: true, badge: true, kbd: true},
        suggest: {avatar: true, badge: true, kbd: true},
        positive: {avatar: true, badge: true, kbd: true},
        caution: {avatar: true, badge: true, kbd: true},
        critical: {avatar: true, badge: true, kbd: true},
      },
      skeleton: true,
    },
    transparent: {},
    neutral: {},
    primary: {},
    suggest: {},
    positive: {},
    caution: {},
    critical: {},
  },
}
