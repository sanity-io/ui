import {ButtonMode, ButtonTone} from '@sanity/ui'
import {composeClassNames} from '../../composeClassNames'
import {
  display,
  DisplayStyleProps,
  flexItem,
  FlexItemStyleProps,
  radius,
  RadiusStyleProps,
  width,
  WidthStyleProps,
} from '../../styles'

export interface ButtonStyleProps
  extends DisplayStyleProps,
    FlexItemStyleProps,
    RadiusStyleProps,
    WidthStyleProps {
  mode?: ButtonMode
  tone?: ButtonTone
}

export function button(props: ButtonStyleProps): string | undefined {
  const {mode = 'default', tone = 'default'} = props

  return composeClassNames(
    'button',
    `button-mode-${mode}`,
    `button-tone-${tone}`,
    display(props),
    flexItem(props),
    radius(props),
    width(props),
  )
}

export function buttonLoadingBox(): string | undefined {
  return 'button-loading-box'
}
