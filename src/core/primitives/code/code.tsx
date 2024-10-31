/* eslint-disable @typescript-eslint/no-explicit-any */

import {code, composeClassNames, FontStyleProps} from '@sanity/ui/css'
import {forwardRef} from 'react'
import Refractor from 'react-refractor'

/**
 * @public
 */
export interface CodeProps extends Omit<FontStyleProps, 'align'> {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  /** Define the language to use for syntax highlighting. */
  language?: string
  size?: number | number[]
}

/**
 * @public
 */
export const Code = forwardRef(function Code(
  props: CodeProps & Omit<React.HTMLProps<HTMLPreElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLPreElement>,
) {
  const {
    as: As = 'pre',
    children,
    className,
    language: languageProp,
    size = 2,
    weight,
    ...restProps
  } = props
  const language = typeof languageProp === 'string' ? languageProp : undefined
  const registered = language ? Refractor.hasLanguage(language as any) : false

  return (
    <As
      data-ui="Code"
      {...restProps}
      className={composeClassNames(className, code({size, weight}))}
      ref={ref}
    >
      {!(language && registered) && <code>{children}</code>}
      {language && registered && <Refractor inline language={language} value={String(children)} />}
    </As>
  )
})

Code.displayName = 'ForwardRef(Code)'
