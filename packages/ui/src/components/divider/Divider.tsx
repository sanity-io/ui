import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type DividerProps, dividerProps} from './divider.props'

const dividerClassName = suffixClassName('sui-Divider')

/** @public */
export function Divider(props: DividerProps) {
  const {className, style, ...rest} = getProps(props, dividerProps)

  return (
    <hr
      className={clsx(dividerClassName, 'sui-border-none sui-border-top', className)}
      style={style}
      data-ui="Divider"
      {...rest}
    />
  )
}

export type {DividerProps}
