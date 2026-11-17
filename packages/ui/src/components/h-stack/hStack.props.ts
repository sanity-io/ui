import type {ElementType} from 'react'

import type {Polymorphic} from '../../types/Polymorphic'
import type {FlexProps} from '../flex/flex.props'

/** @public */
export type HStackProps<T extends ElementType = 'div'> = Polymorphic<
  T,
  Pick<FlexProps<T>, 'as' | 'gap'>
>
