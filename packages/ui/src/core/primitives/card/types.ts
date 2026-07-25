import {ThemeColorToneKey} from '../../../theme/system/v0/color/_system'

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
