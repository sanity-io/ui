import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type LinkProps, linkProps} from './link.props'

const linkClassName = suffixClassName('sui-Link')

/** @beta */
export function Link({underlined = true, ...props}: LinkProps) {
  const {children, className, style, openInNewTab, ...rest} = getProps(
    {underlined, ...props},
    linkProps,
  )

  return (
    <a
      className={clsx(linkClassName, className)}
      style={style}
      data-ui="Link"
      {...(openInNewTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      {...rest}
    >
      {children}
    </a>
  )
}

export type {LinkProps}
