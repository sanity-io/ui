import {Suspense} from 'react'

import {LazySyntax} from '../_syntax/LazySyntax'

/** @public */
export const DEFAULT_INLINE_CODE_ELEMENT = 'code'

/** @public */
export interface InlineCodeProps {
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
