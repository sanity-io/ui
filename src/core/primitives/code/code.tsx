import {code, composeClassNames, FontStyleProps} from '@sanity/ui/css'
import {ForwardedRef, forwardRef, lazy, Suspense} from 'react'

import {Props} from '../../types'

const LazyRefractor = lazy(() => import('./refractor'))

/**
 * @public
 */
export interface CodeProps extends Omit<FontStyleProps, 'align'> {
  /** Define the language to use for syntax highlighting. */
  language?: string
  size?: number | number[]
}

/**
 * @public
 */
export const Code = forwardRef(function Code(
  props: Props<CodeProps, 'pre'>,
  ref: ForwardedRef<HTMLPreElement>,
) {
  const {
    as: As = 'pre',
    children,
    className,
    language: languageProp,
    size = 1,
    weight,
    ...restProps
  } = props
  const language = typeof languageProp === 'string' ? languageProp : undefined

  return (
    <As
      data-ui="Code"
      {...restProps}
      className={composeClassNames(className, code({size, weight}))}
      ref={ref}
    >
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </As>
  )
})

Code.displayName = 'ForwardRef(Code)'
