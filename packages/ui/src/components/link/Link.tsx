import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type LinkProps, linkProps} from './link.props'

/** @beta */
export function Link({underlined = true, ...props}: LinkProps) {
  const {children, className, style, openInNewTab, ...rest} = getProps(
    {underlined, ...props},
    linkProps,
  )

  return (
    <a
      className={classNames(getVersionedClassname('sui-Link'), className)}
      style={style}
      data-ui="Link"
      {...(openInNewTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
