import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type DividerProps, dividerProps} from './divider.props'

const dividerClassname = getVersionedClassname('sui-Divider')

/** @public */
export function Divider(props: DividerProps) {
  const {className, style, ...rest} = getProps(props, dividerProps)

  return (
    <hr
      className={classNames(dividerClassname, 'sui-border-none sui-border-top', className)}
      style={style}
      data-ui="Divider"
      {...rest}
    />
  )
}
