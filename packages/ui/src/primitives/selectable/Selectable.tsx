import {selectable, SELECTABLE_STYLE_PROP_KEYS, type SelectableStyleProps} from '@sanity/ui/css'
import type {ElementTone} from '@sanity/ui/theme'

import {_splitKeys} from '../../_keys'
import type {ComponentType, Props} from '../../types'
import {type BoxOwnProps} from '../box/Box'

/** @internal */
export const DEFAULT_SELECTABLE_ELEMENT = 'button'

/** @internal */
export type SelectableOwnProps = BoxOwnProps &
  SelectableStyleProps & {
    disabled?: boolean
    href?: string
    selected?: boolean
    tone?: ElementTone
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
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_SELECTABLE_ELEMENT,
      selected,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(
    props as SelectableProps<typeof DEFAULT_SELECTABLE_ELEMENT>,
    SELECTABLE_STYLE_PROP_KEYS,
  )

  return (
    <Element
      data-ui="Selectable"
      {...domProps}
      className={selectable(styleProps)}
      data-selected={selected ? '' : props['data-selected']}
    />
  )
}
