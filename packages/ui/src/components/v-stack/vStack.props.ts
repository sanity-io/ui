import type {FlexProps} from '../flex/flex.props'

/** @public */
export interface VStackProps<T extends React.ElementType = 'div'> extends Pick<
  FlexProps<T>,
  'as' | 'gap'
> {}
