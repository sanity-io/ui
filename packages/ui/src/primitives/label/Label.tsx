import {
  label,
  type LabelStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

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
  const {
    align,
    as: Element = DEFAULT_LABEL_ELEMENT,
    children,
    className,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    maxWidth,
    muted = false,
    size = 1,
    textOverflow: textOverflowProp,
    weight = 'regular',
    ...rest
  } = props

  return (
    <Element
      data-ui="Label"
      {...rest}
      className={label({
        className,
        align,
        margin,
        marginX,
        marginY,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        maxWidth,
        muted,
        size,
        weight,
      })}
    >
      <span
        className={textOverflow({
          textOverflow: textOverflowProp,
        })}
      >
        {children}
      </span>
    </Element>
  )
}
