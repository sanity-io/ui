import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {type DividerProps, dividerProps} from './divider.props'

/** @public */
export function Divider(props: DividerProps) {
  const {className, style, ...rest} = getProps(props, dividerProps)

  return (
    <hr
      className={clsx('sui-Divider sui-border-none sui-border-top', className)}
      style={style}
      data-ui="Divider"
      {...rest}
    />
  )
}
