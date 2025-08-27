import {type ResponsiveProp, spinner} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {ComponentType, Props} from '../../types'
import {Text} from '../text/Text'
import {AnimatedSpinnerIcon} from './AnimatedSpinnerIcon'

/** @public */
export const DEFAULT_SPINNER_ELEMENT = 'div'

/** @public */
export type SpinnerOwnProps = {
  muted?: boolean
  size?: ResponsiveProp<FontTextSize>
}

/** @public */
export type SpinnerElementType = 'div' | 'span' | ComponentType

/** @public */
export type SpinnerProps<E extends SpinnerElementType = SpinnerElementType> = Props<
  SpinnerOwnProps,
  E
>

/**
 * Indicate that something is loading for an indeterminate amount of time.
 *
 * @public
 */
export function Spinner<E extends SpinnerElementType = typeof DEFAULT_SPINNER_ELEMENT>(
  props: SpinnerProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_SPINNER_ELEMENT,
    className,
    ...rest
  } = props as SpinnerProps<typeof DEFAULT_SPINNER_ELEMENT>

  return (
    <Text as={as} data-ui="Spinner" {...rest} className={spinner({className})}>
      <AnimatedSpinnerIcon />
    </Text>
  )
}
