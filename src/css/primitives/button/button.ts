import {ButtonMode, ButtonTone} from '@sanity/ui'
import {WidthStyleProps} from '@sanity/ui/css'
import {composeClassNames} from '../../composeClassNames'
import {radius, RadiusStyleProps} from '../../styles/radius'
import {width} from '../../styles/width'

export interface ButtonStyleProps extends RadiusStyleProps, WidthStyleProps {
  mode?: ButtonMode
  tone?: ButtonTone
}

export function button(props: ButtonStyleProps): string {
  const {mode = 'default', tone = 'default'} = props

  return composeClassNames(
    'button',
    `button-mode-${mode}`,
    `button-tone-${tone}`,
    radius(props),
    width(props),
  )
}

export function buttonLoadingBox(): string {
  return 'button-loading-box'
}
