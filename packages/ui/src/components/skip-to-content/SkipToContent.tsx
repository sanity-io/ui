import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Link} from '../link/Link'
import {Text} from '../text/Text'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type SkipToContentProps, skipToContentProps} from './skipToContent.props'

const skipToContentClassName = suffixClassName('sui-SkipToContent')

/** @beta */
export function SkipToContent(props: SkipToContentProps) {
  const {className, label, style, ...rest} = getProps(props, skipToContentProps)

  return (
    <VisuallyHidden
      as={Link}
      underlined={false}
      className={clsx(
        skipToContentClassName,
        'sui-position-absolute sui-top2 sui-left2 sui-display-inline-block sui-z-index sui-py2 sui-px3 sui-radius2 sui-text-body1',
        className,
      )}
      style={style}
      data-ui="SkipToContent"
      visibleOnFocus
      {...rest}
    >
      <Text size={1}>{label}</Text>
    </VisuallyHidden>
  )
}

export type {SkipToContentProps}
