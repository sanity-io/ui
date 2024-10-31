import {_composeClassNames, code, type FontStyleProps} from '@sanity/ui/css'
import {lazy, Suspense} from 'react'

import type {ComponentType, Props} from '../../types'

const LazyRefractor = lazy(() => import('./refractor'))

/** @public */
export const DEFAULT_CODE_ELEMENT = 'pre'

/** @public */
export type CodeOwnProps = Omit<FontStyleProps, 'align'> & {
  /** Define the language to use for syntax highlighting. */
  language?: string
  size?: number | number[]
}

/** @public */
export type CodeElementType = 'div' | 'pre' | ComponentType

/** @public */
export type CodeProps<E extends CodeElementType = CodeElementType> = Props<CodeOwnProps, E>

/** @public */
export function Code<E extends CodeElementType = typeof DEFAULT_CODE_ELEMENT>(props: CodeProps<E>) {
  const {
    as: Element = DEFAULT_CODE_ELEMENT,
    children,
    className,
    language: languageProp,
    size = 2,
    weight = 'regular',
    ...rest
  } = props as CodeProps<typeof DEFAULT_CODE_ELEMENT>

  const language = typeof languageProp === 'string' ? languageProp : undefined

  return (
    <Element
      data-ui="Code"
      {...rest}
      className={_composeClassNames(className, code({size, weight}))}
    >
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </Element>
  )
}

Code.displayName = 'Code'
