import {ThemeColorToneKey} from '@sanity/ui/theme'

/**
 * @internal
 */
export interface CardStyleProps {
  $checkered: boolean
  $focusRing: boolean
  $muted: boolean
  // oxlint-disable-next-line no-deprecated
  $tone: ThemeColorToneKey
}
