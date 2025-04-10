import {_selectable, composeClassNames, SelectableStyleProps} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {Props, SelectableTone} from '../../types'
import {Box, BoxProps} from '../box'

/** @internal */
export interface SelectableProps extends BoxProps, SelectableStyleProps {
  disabled?: boolean
  href?: string
  tone?: SelectableTone
  type?: 'button'
}

/** @internal */
export const Selectable = forwardRef(function Selectable(
  props: Props<SelectableProps, 'div'>,
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
