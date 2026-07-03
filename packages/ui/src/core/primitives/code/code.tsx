import {forwardRef, lazy, Suspense} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {responsiveCodeFontStyle, ResponsiveFontStyleProps} from '../../styles/internal'
import {ElementType, Props} from '../../types'
import {codeBaseStyle} from './styles'

const LazyRefractor = lazy(() => import('./refractor'))

/**
 * @public
 */
export interface CodeOwnProps {
  /** Define the language to use for syntax highlighting. */
  language?: string
  size?: number | number[]
  weight?: string
}

/**
 * @public
 */
export type CodeProps<E extends ElementType = 'pre'> = Props<CodeOwnProps, E>

const StyledCode = styled.pre<ResponsiveFontStyleProps>(codeBaseStyle, responsiveCodeFontStyle)

const CodeComponent = forwardRef(function Code(
  props: CodeOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {children, language, size = 2, weight, ...restProps} = props

  return (
    <StyledCode
      data-ui="Code"
      {...restProps}
      $size={_getArrayProp(size)}
      $weight={weight}
      ref={ref}
    >
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </StyledCode>
  )
})
CodeComponent.displayName = 'ForwardRef(Code)'

/**
 * @public
 */
export const Code = CodeComponent as unknown as <E extends ElementType = 'pre'>(
  props: CodeProps<E>,
) => React.JSX.Element
