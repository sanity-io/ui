import {stack} from '@sanity/ui/css'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

/** @public */
export const DEFAULT_STACK_ELEMENT = 'div'

/** @public */
export type StackOwnProps = Omit<
  BoxOwnProps,
  | 'align'
  | 'alignItems'
  | 'columns'
  | 'gridTemplateColumns'
  | 'direction'
  | 'display'
  | 'flexDirection'
  | 'flexWrap'
  | 'gapX'
  | 'gapY'
  | 'justify'
  | 'justifyContent'
  | 'rows'
  | 'gridTemplateRows'
>

/** @public */
export type StackElementType = BoxElementType

/** @public */
export type StackProps<E extends StackElementType = StackElementType> = Props<StackOwnProps, E>

/**
 * The `Stack` component is used to place elements on top of each other.
 *
 * @public
 */
export function Stack<E extends StackElementType = typeof DEFAULT_STACK_ELEMENT>(
  props: StackProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_STACK_ELEMENT,
    className,
    gap,
    ...rest
  } = props as StackProps<typeof DEFAULT_STACK_ELEMENT>

  return (
    <Box
      data-ui="Stack"
      {...rest}
      as={as}
      gridAutoRows="min"
      className={stack({className})}
      display="grid"
      gap={gap}
    />
  )
}
