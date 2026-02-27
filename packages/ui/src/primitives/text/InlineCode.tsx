import {_splitKeys} from '@sanity/ui/core'
import {LazySyntax} from '@sanity/ui/primitives/_syntax'
import {Suspense} from 'react'

/** @public */
export const DEFAULT_INLINE_CODE_ELEMENT = 'code'

/** @public */
export interface InlineCodeProps {
  /**
   * The code content to render, optionally with syntax highlighting.
   */
  children: React.ReactNode
  /** Language to use for syntax highlighting. */
  language?: string
}

/** @public */
export function InlineCode(props: InlineCodeProps): React.JSX.Element {
  const {children, language: languageProp} = props
  const language = typeof languageProp === 'string' ? languageProp : undefined

  return (
    <Suspense fallback={<code>{children}</code>}>
      <LazySyntax language={language} value={children} />
    </Suspense>
  )
}
