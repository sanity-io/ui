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
import {toneMap, variantMap} from './_constants'

export interface ButtonStyleProps
  extends DisplayStyleProps,
    FlexItemStyleProps,
    RadiusStyleProps,
    WidthStyleProps {
  mode?: ButtonMode
  tone?: ButtonTone
}

export function button(props: ButtonStyleProps): string | undefined {
  const {mode, tone} = props

  return composeClassNames(
    'button',
    variantMap[mode ?? 'default'],
    toneMap[tone ?? 'default'],
    display(props),
    flexItem(props),
    radius(props),
    width(props),
  )
}

export function buttonLoadingBox(): string | undefined {
  return 'button-loading-box'
}
