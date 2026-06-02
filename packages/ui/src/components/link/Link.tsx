import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {type LinkProps, linkProps} from './link.props'

/** @beta */
export function Link({underlined = true, ...props}: LinkProps) {
  const {children, className, style, openInNewTab, ...rest} = getProps(
    {underlined, ...props},
    linkProps,
  )

  return (
    <a
      className={classNames('sui-Link', className)}
      style={style}
      data-ui="Link"
      {...(openInNewTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
