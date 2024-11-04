import {composeClassNames, _selectable, SelectableStyleProps} from '@sanity/ui/css'
import {ForwardedRef, forwardRef, HTMLProps} from 'react'
import {SelectableTone} from '../../types'
import {Box, BoxProps} from '../box'

/** @internal */
export interface SelectableProps extends BoxProps, SelectableStyleProps {
  tone?: SelectableTone
}

/** @internal */
export const Selectable = forwardRef(function Selectable(
  props: SelectableProps & Omit<HTMLProps<HTMLDivElement>, 'as' | 'height' | 'wrap' | 'width'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {className, radius, tone, ...restProps} = props

  return (
    <Box
      {...restProps}
      className={composeClassNames(className, _selectable({radius, tone}))}
      ref={ref}
    />
  )
})

Selectable.displayName = 'ForwardRef(Selectable)'
