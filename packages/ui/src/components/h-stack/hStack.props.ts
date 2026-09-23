import type {FlexProps} from '../flex/flex.props'

/** @public */
export interface HStackProps<T extends React.ElementType = 'div'> extends Pick<
  FlexProps<T>,
  'as' | 'gap'
> {}
