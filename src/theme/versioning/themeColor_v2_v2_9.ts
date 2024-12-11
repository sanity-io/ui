import type {ThemeColorCard_v2} from '../system'

/**
 * Apply `neutral` and `suggest` if they're not already part of the color object,
 * as this was introduced in v2.9, but is not compatible with v2.0.
 *
 * @param color - The color object to upgrade
 * @returns The upgraded color object. Returns as-is if already upgraded.
 * @internal
 */
export function themeColor_v0_v2_9(color: ThemeColorCard_v2): ThemeColorCard_v2 {
  if ('neutral' in color.badge) {
    return color // Already at >= v2.9
  }

  // TypeScript narrows to `never` because the above should always be true
  const colors = color as ThemeColorCard_v2

  return {
    ...colors,
    badge: {
      ...colors.badge,
      neutral: colors.badge.default,
      suggest: colors.badge.primary,
    },
    button: {
      bleed: {
        ...colors.button.bleed,
        neutral: colors.button.bleed.default,
        suggest: colors.button.bleed.primary,
      },
      default: {
        ...colors.button.default,
        neutral: colors.button.default.default,
        suggest: colors.button.default.primary,
      },
      ghost: {
        ...colors.button.ghost,
        neutral: colors.button.ghost.default,
        suggest: colors.button.ghost.primary,
      },
    },
    selectable: {
      ...colors.selectable,
      neutral: colors.selectable.default,
      suggest: colors.selectable.primary,
    },
  }
}
