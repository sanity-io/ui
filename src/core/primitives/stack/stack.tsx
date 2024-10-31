import {_composeClassNames, type ResponsiveProp, stack} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box'

/** @public */
export const DEFAULT_STACK_ELEMENT = 'div'

/** @public */
export type StackOwnProps = Omit<
  BoxOwnProps,
  'align' | 'columns' | 'direction' | 'display' | 'gapX' | 'gapY' | 'justify'
> & {
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
}

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
) {
  const {
    as = DEFAULT_STACK_ELEMENT,
    className,
    gap,
    space,
    ...rest
  } = props as StackProps<typeof DEFAULT_STACK_ELEMENT>

  return (
    <Box
      data-ui="Stack"
      {...rest}
      as={as}
      autoRows="min"
      className={_composeClassNames(className, stack())}
      display="grid"
      gap={gap ?? space}
    />
  )
}

Stack.displayName = 'Stack'
