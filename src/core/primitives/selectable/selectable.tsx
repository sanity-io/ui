import {_selectable, type SelectableStyleProps} from '@sanity/ui/css'
import type {ThemeColorStateToneKey} from '@sanity/ui/theme'

import type {ComponentType, Props} from '../../types/props'
import {Box, type BoxOwnProps} from '../box/box'

/** @internal */
export const DEFAULT_SELECTABLE_ELEMENT = 'button'

/** @internal */
export type SelectableOwnProps = BoxOwnProps &
  SelectableStyleProps & {
    disabled?: boolean
    href?: string
    selected?: boolean
    tone?: ThemeColorStateToneKey
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
    selected,
    tone,
    ...rest
  } = props as SelectableProps<typeof DEFAULT_SELECTABLE_ELEMENT>

  return (
    <Box
      {...rest}
      as={as}
      className={_selectable({className, radius, tone})}
      data-selected={selected ? '' : undefined}
    />
  )
}
