import clsx from 'clsx'
import {type ComponentPropsWithRef, lazy, Suspense} from 'react'

import {type CodeTag} from '../../types/Code'
import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type CodeProps, codeProps} from './code.props'

const LazyRefractor = lazy(() => import('./LazyRefractor'))

const codeClassName = suffixClassName('sui-Code')

/** @public */
export function Code<T extends CodeTag = 'pre'>({
  size = 2,
  ...props
}: CodeProps<T> & Omit<ComponentPropsWithRef<T>, keyof CodeProps<T>>) {
  const {as, children, className, language, style, ...rest} = getProps({size, ...props}, codeProps)
  const Component = as || 'pre'

  if (!language) {
    return (
      <Component className={clsx(codeClassName, className)} style={style} data-ui="Code" {...rest}>
        <code>{children}</code>
      </Component>
    )
  }

  return (
    <Component className={clsx(codeClassName, className)} style={style} data-ui="Code" {...rest}>
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </Component>
  )
}

export type {CodeProps}
