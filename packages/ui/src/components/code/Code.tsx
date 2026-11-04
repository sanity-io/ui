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
  const Component = inline ? 'code' : 'pre'
  const content = inline ? children : <code>{children}</code>

  if (!language) {
    return (
      <Component className={clsx(codeClassName, className)} style={style} data-ui="Code" {...rest}>
        {content}
      </Component>
    )
  }

  return (
    <Component className={clsx(codeClassName, className)} style={style} data-ui="Code" {...rest}>
      <Suspense fallback={content}>
        <LazyRefractor language={language} value={children} inline={inline} fallback={content} />
      </Suspense>
    </Component>
  )
}

export type {CodeProps}
