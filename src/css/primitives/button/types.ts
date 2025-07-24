import type {ButtonMode, ElementTone} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {WidthStyleProps} from '../../props/width/types'

/** @public */
export interface ButtonStyleProps extends FlexStyleProps, RadiusStyleProps, WidthStyleProps {
  className?: string
  mode?: ButtonMode
  tone?: ElementTone
}
