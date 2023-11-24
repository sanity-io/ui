import {ThemeColorBaseToneKey, ThemeColorStateKey} from '@sanity/ui/theme'

export interface WriteConfig {
  tones: Partial<
    Record<
      ThemeColorBaseToneKey,
      {
        avatar?: boolean
        badge?: boolean
        button?: boolean
        card?: Partial<Record<ThemeColorStateKey, boolean>>
        input?: boolean
        kbd?: boolean
        selectable?: boolean
      }
    >
  >
}

export const config: WriteConfig = {
  tones: {
    default: {
      avatar: true,
      badge: true,
      button: true,
      card: {
        enabled: true,
      },
      input: true,
      kbd: true,
      selectable: true,
    },
    transparent: {
      card: {
        enabled: true,
      },
    },
    primary: {
      card: {
        enabled: true,
      },
    },
    positive: {
      card: {
        enabled: true,
      },
    },
    caution: {
      card: {
        enabled: true,
      },
    },
    critical: {
      card: {
        enabled: true,
      },
    },
  },
}
