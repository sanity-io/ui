import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {code, CODE_STYLE_PROP_KEYS, type CodeStyleProps} from '@sanity/ui/css'
import {lazy, Suspense} from 'react'

const LazyRefractor = lazy(() => import('../_syntax/LazySyntax'))

/** @public */
export const DEFAULT_CODE_ELEMENT = 'pre'

/** @public */
export type CodeOwnProps = CodeStyleProps & {
  /** Define the language to use for syntax highlighting. */
  language?: string
}

/** @public */
export type CodeElementType = 'div' | 'pre' | ComponentType

/** @public */
export type CodeProps<E extends CodeElementType = CodeElementType> = Props<CodeOwnProps, E>

/** @public */
export function Code<E extends CodeElementType = typeof DEFAULT_CODE_ELEMENT>(
  props: CodeProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_CODE_ELEMENT,
      children,
      language: languageProp,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as CodeProps<typeof DEFAULT_CODE_ELEMENT>, CODE_STYLE_PROP_KEYS)

  const language = typeof languageProp === 'string' ? languageProp : undefined

  return (
    <Element data-ui="Code" {...domProps} className={code(styleProps)}>
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </Element>
  )
}
