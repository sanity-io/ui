import {code, type CodeStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import type {FontCodeSize} from '@sanity/ui/theme'
import {lazy, Suspense} from 'react'

import type {ComponentType, Props} from '../../types'

const LazyRefractor = lazy(() => import('./refractor'))

/** @public */
export const DEFAULT_CODE_ELEMENT = 'pre'

/** @public */
export type CodeOwnProps = CodeStyleProps & {
  /** Define the language to use for syntax highlighting. */
  language?: string
  size?: ResponsiveProp<FontCodeSize>
}

/** @public */
export type CodeElementType = 'div' | 'pre' | ComponentType

/** @public */
export type CodeProps<E extends CodeElementType = CodeElementType> = Props<CodeOwnProps, E>

/** @public */
export function Code<E extends CodeElementType = typeof DEFAULT_CODE_ELEMENT>(
  props: CodeProps<E>,
): React.JSX.Element {
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
    <Element data-ui="Code" {...rest} className={code({className, size, weight})}>
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </Element>
  )
}
