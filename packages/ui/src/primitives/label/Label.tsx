import {
  label,
  LABEL_STYLE_PROP_KEYS,
  type LabelStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui-css'

import {_splitKeys} from '../../core/_keys'
import type {ComponentType, Props} from '../../core/types'

/** @public */
export const DEFAULT_LABEL_ELEMENT = 'div'

/** @public */
export type LabelOwnProps = LabelStyleProps & TextOverflowStyleProps

/** @public */
export type LabelElementType =
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'li'
  | 'p'
  | 'span'
  | ComponentType

/** @public */
export type LabelProps<E extends LabelElementType = LabelElementType> = Props<LabelOwnProps, E>

/**
 * Typographic labels.
 *
 * @public
 */
export function Label<E extends LabelElementType = typeof DEFAULT_LABEL_ELEMENT>(
  props: LabelProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_LABEL_ELEMENT,
      children: childrenProp,
      textOverflow: textOverflowProp,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as LabelProps<typeof DEFAULT_LABEL_ELEMENT>, LABEL_STYLE_PROP_KEYS)

  let children = childrenProp

  if (textOverflowProp) {
    children = <span className={textOverflow({textOverflow: textOverflowProp})}>{children}</span>
  }

  return (
    <Element data-ui="Label" {...domProps} className={label(styleProps)}>
      {children}
    </Element>
  )
}
