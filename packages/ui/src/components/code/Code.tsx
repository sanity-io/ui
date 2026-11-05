import clsx from 'clsx'
import {lazy, Suspense} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type CodeProps, codeProps} from './code.props'

const LazyRefractor = lazy(() => import('./LazyRefractor'))

const codeClassName = suffixClassName('sui-Code')

/** @public */
export function Code({size = 2, ...props}: CodeProps) {
  const {children, className, inline, language, style, ...rest} = getProps(
    {size, ...props},
    codeProps,
  )
  /*
   * The span wrapper for inline code is necessary because react-refractor does not
   * support any attributes other than className
   */
  const Component = inline ? 'span' : 'pre'

  return (
    <Component className={clsx(codeClassName, className)} style={style} data-ui="Code" {...rest}>
      {language ? (
        <Suspense fallback={<code>{children}</code>}>
          <LazyRefractor language={language} value={children} />
        </Suspense>
      ) : (
        <code>{children}</code>
      )}
    </Component>
  )
}

export type {CodeProps}
