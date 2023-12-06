import {ThemeColorBaseToneKey} from '@sanity/ui/theme'

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
      ThemeColorBaseToneKey,
      StateWriteConfig & {
        button?: StateWriteConfig & {
          modes?: {
            default?: {
              default?: StateWriteConfig
              primary?: StateWriteConfig
              positive?: StateWriteConfig
              caution?: StateWriteConfig
              critical?: StateWriteConfig
            }
            ghost?: {
              default?: StateWriteConfig
              primary?: StateWriteConfig
              positive?: StateWriteConfig
              caution?: StateWriteConfig
              critical?: StateWriteConfig
            }
            bleed?: {
              default?: StateWriteConfig
              primary?: StateWriteConfig
              positive?: StateWriteConfig
              caution?: StateWriteConfig
              critical?: StateWriteConfig
            }
          }
        }
        input?: boolean
        selectable?: {
          default?: StateWriteConfig
          primary?: StateWriteConfig
          positive?: StateWriteConfig
          caution?: StateWriteConfig
          critical?: StateWriteConfig
        }
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
            primary: {},
            positive: {},
            caution: {},
            critical: {},
          },
          ghost: {
            default: {},
            primary: {},
            positive: {},
            caution: {},
            critical: {},
          },
          bleed: {
            default: {},
            primary: {},
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
        primary: {avatar: true, badge: true, kbd: true},
        positive: {avatar: true, badge: true, kbd: true},
        caution: {avatar: true, badge: true, kbd: true},
        critical: {avatar: true, badge: true, kbd: true},
      },
      skeleton: true,
    },
    transparent: {},
    primary: {},
    positive: {},
    caution: {},
    critical: {},
  },
}
