import {ButtonMode, ButtonTone} from '@sanity/ui'
import {FlexItemStyleProps, WidthStyleProps} from '@sanity/ui/css'
import {composeClassNames} from '../../composeClassNames'
import {flexItem} from '../../styles/flexItem'
import {radius, RadiusStyleProps} from '../../styles/radius'
import {width} from '../../styles/width'

export interface ButtonStyleProps extends FlexItemStyleProps, RadiusStyleProps, WidthStyleProps {
  mode?: ButtonMode
  tone?: ButtonTone
}

export function button(props: ButtonStyleProps): string {
  const {mode = 'default', tone = 'default'} = props

  return composeClassNames(
    'button',
    `button-mode-${mode}`,
    `button-tone-${tone}`,
    flexItem(props),
    radius(props),
    width(props),
  )
}

export function buttonLoadingBox(): string {
  return 'button-loading-box'
}
