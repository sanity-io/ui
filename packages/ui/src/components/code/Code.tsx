import classNames from 'classnames'
import {lazy, Suspense} from 'react'

import {getProps} from '../../utils/getProps'
import {type CodeProps, codeProps} from './code.props'

const LazyRefractor = lazy(() => import('./LazyRefractor'))

/** @public */
export function Code<T extends React.ElementType = 'pre'>({
  size = 2,
  ...props
}: CodeProps & Omit<React.ComponentPropsWithRef<T>, keyof CodeProps>) {
  const {as, children, className, language, style, ...rest} = getProps({size, ...props}, codeProps)
  const Component = as || 'pre'

  if (!language) {
    return (
      <Component
        className={classNames('sui-Code', className)}
        style={style}
        data-ui="Code"
        {...rest}
      >
        <code>{children}</code>
      </Component>
    )
  }

  return (
    <Component className={classNames('sui-Code', className)} style={style} data-ui="Code" {...rest}>
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </Component>
  )
}
