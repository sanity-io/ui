import {ThemeColorCardToneKey} from '@sanity/ui/theme'

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
          modes?: {
            default?: {
              default?: StateWriteConfig
              primary?: StateWriteConfig
              positive?: StateWriteConfig
              caution?: StateWriteConfig
              critical?: StateWriteConfig
              prospect?: StateWriteConfig
              explore?: StateWriteConfig
            }
            ghost?: {
              default?: StateWriteConfig
              primary?: StateWriteConfig
              positive?: StateWriteConfig
              caution?: StateWriteConfig
              critical?: StateWriteConfig
              prospect?: StateWriteConfig
              explore?: StateWriteConfig
            }
            bleed?: {
              default?: StateWriteConfig
              primary?: StateWriteConfig
              positive?: StateWriteConfig
              caution?: StateWriteConfig
              critical?: StateWriteConfig
              prospect?: StateWriteConfig
              explore?: StateWriteConfig
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
          prospect?: StateWriteConfig
          explore?: StateWriteConfig
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
            prospect: {},
            explore: {},
          },
          ghost: {
            default: {},
            primary: {},
            positive: {},
            caution: {},
            critical: {},
            prospect: {},
            explore: {},
          },
          bleed: {
            default: {},
            primary: {},
            positive: {},
            caution: {},
            critical: {},
            prospect: {},
            explore: {},
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
        prospect: {avatar: true, badge: true, kbd: true},
        explore: {avatar: true, badge: true, kbd: true},
      },
      skeleton: true,
    },
    transparent: {},
    primary: {},
    positive: {},
    caution: {},
    critical: {},
    prospect: {},
    explore: {},
  },
}
