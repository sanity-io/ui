import {_composeClassNames, _selectable, type SelectableStyleProps} from '@sanity/ui/css'

import type {ComponentType, Props, SelectableTone} from '../../types'
import {Box, type BoxOwnProps} from '../box'

/** @internal */
export const DEFAULT_SELECTABLE_ELEMENT = 'button'

/** @internal */
export type SelectableOwnProps = BoxOwnProps &
  SelectableStyleProps & {
    disabled?: boolean
    href?: string
    tone?: SelectableTone
    type?: 'button'
  }

/** @internal */
export type SelectableElementType = 'button' | 'a' | ComponentType

/** @internal */
export type SelectableProps<E extends SelectableElementType = SelectableElementType> = Props<
  SelectableOwnProps,
  E
>

/** @internal */
export function Selectable<E extends SelectableElementType = typeof DEFAULT_SELECTABLE_ELEMENT>(
  props: SelectableProps<E>,
) {
  const {
    as = DEFAULT_SELECTABLE_ELEMENT,
    className,
    radius,
    tone,
    ...rest
  } = props as SelectableProps<typeof DEFAULT_SELECTABLE_ELEMENT>

  return (
    <Box {...rest} as={as} className={_composeClassNames(className, _selectable({radius, tone}))} />
  )
}

Selectable.displayName = 'Selectable'
