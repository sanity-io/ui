import {CSSObject, ThemeColorCard_v2, ThemeColorState_v2} from '@sanity/ui/theme'

/**
 * @internal
 */
export function _cardColorStyle(
  base: ThemeColorCard_v2,
  color: ThemeColorState_v2,
  checkered = false,
): CSSObject {
  return {
    // from base

    '--card-backdrop-color': base.backdrop,

    '--card-focus-ring-color': base.focusRing,

    '--card-shadow-outline-color': base.shadow.outline,
    '--card-shadow-umbra-color': base.shadow.umbra,
    '--card-shadow-penumbra-color': base.shadow.penumbra,
    '--card-shadow-ambient-color': base.shadow.ambient,

    // from state

    '--card-accent-fg-color': color.accent.fg,

    '--card-avatar-gray-bg-color': color.avatar.gray.bg,
    '--card-avatar-gray-fg-color': color.avatar.gray.fg,
    '--card-avatar-blue-bg-color': color.avatar.blue.bg,
    '--card-avatar-blue-fg-color': color.avatar.blue.fg,
    '--card-avatar-purple-bg-color': color.avatar.purple.bg,
    '--card-avatar-purple-fg-color': color.avatar.purple.fg,
    '--card-avatar-magenta-bg-color': color.avatar.magenta.bg,
    '--card-avatar-magenta-fg-color': color.avatar.magenta.fg,
    '--card-avatar-red-bg-color': color.avatar.red.bg,
    '--card-avatar-red-fg-color': color.avatar.red.fg,
    '--card-avatar-orange-bg-color': color.avatar.orange.bg,
    '--card-avatar-orange-fg-color': color.avatar.orange.fg,
    '--card-avatar-yellow-bg-color': color.avatar.yellow.bg,
    '--card-avatar-yellow-fg-color': color.avatar.yellow.fg,
    '--card-avatar-green-bg-color': color.avatar.green.bg,
    '--card-avatar-green-fg-color': color.avatar.green.fg,
    '--card-avatar-cyan-bg-color': color.avatar.cyan.bg,
    '--card-avatar-cyan-fg-color': color.avatar.cyan.fg,

    '--card-bg-color': color.bg,
    '--card-bg-image': checkered
      ? `repeating-conic-gradient(${color.bg} 0% 25%, ${color.muted.bg} 0% 50%)`
      : undefined,

    '--card-border-color': color.border,

    '--card-badge-default-bg-color': color.badge.default.bg,
    '--card-badge-default-dot-color': color.badge.default.dot,
    '--card-badge-default-fg-color': color.badge.default.fg,
    '--card-badge-default-icon-color': color.badge.default.icon,
    '--card-badge-neutral-bg-color': color.badge.neutral?.bg,
    '--card-badge-neutral-dot-color': color.badge.neutral?.dot,
    '--card-badge-neutral-fg-color': color.badge.neutral?.fg,
    '--card-badge-neutral-icon-color': color.badge.neutral?.icon,
    '--card-badge-primary-bg-color': color.badge.primary.bg,
    '--card-badge-primary-dot-color': color.badge.primary.dot,
    '--card-badge-primary-fg-color': color.badge.primary.fg,
    '--card-badge-primary-icon-color': color.badge.primary.icon,
    '--card-badge-suggest-bg-color': color.badge.suggest?.bg,
    '--card-badge-suggest-dot-color': color.badge.suggest?.dot,
    '--card-badge-suggest-fg-color': color.badge.suggest?.fg,
    '--card-badge-suggest-icon-color': color.badge.suggest?.icon,
    '--card-badge-positive-bg-color': color.badge.positive.bg,
    '--card-badge-positive-dot-color': color.badge.positive.dot,
    '--card-badge-positive-fg-color': color.badge.positive.fg,
    '--card-badge-positive-icon-color': color.badge.positive.icon,
    '--card-badge-caution-bg-color': color.badge.caution.bg,
    '--card-badge-caution-dot-color': color.badge.caution.dot,
    '--card-badge-caution-fg-color': color.badge.caution.fg,
    '--card-badge-caution-icon-color': color.badge.caution.icon,
    '--card-badge-critical-bg-color': color.badge.critical.bg,
    '--card-badge-critical-dot-color': color.badge.critical.dot,
    '--card-badge-critical-fg-color': color.badge.critical.fg,
    '--card-badge-critical-icon-color': color.badge.critical.icon,

    '--card-code-bg-color': color.code.bg,
    '--card-code-fg-color': color.code.fg,

    '--card-fg-color': color.fg,

    '--card-icon-color': color.icon,

    '--card-kbd-bg-color': color.kbd.bg,
    '--card-kbd-border-color': color.kbd.border,
    '--card-kbd-fg-color': color.kbd.fg,

    '--card-link-fg-color': color.link.fg,

    '--card-muted-bg-color': color.muted.bg,
    '--card-muted-fg-color': color.muted.fg,

    '--card-skeleton-color-from': color.skeleton.from,
    '--card-skeleton-color-to': color.skeleton.to,

    // deprecated variables (kept for legacy)

    '--card-bg2-color': color.muted.bg,
    '--card-link-color': color.link.fg,
    '--card-hairline-soft-color': color.border,
    '--card-hairline-hard-color': color.border,
  }
}
