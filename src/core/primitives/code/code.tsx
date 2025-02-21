import {forwardRef, lazy, Suspense} from 'react'
import {styled} from 'styled-components'
import {useArrayProp} from '../../hooks'
import {responsiveCodeFontStyle, ResponsiveFontStyleProps} from '../../styles/internal'
import {codeBaseStyle} from './styles'

const LazyRefractor = lazy(() => import('./refractor'))

/**
 * @public
 */
export type StringifiableNode =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | Iterable<StringifiableNode>
/**
 * @public
 */
export interface CodeProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  /** Define the language to use for syntax highlighting. */
  language?: string
  children: StringifiableNode
  size?: number | number[]
  weight?: string
}

const StyledCode = styled.pre<ResponsiveFontStyleProps>(codeBaseStyle, responsiveCodeFontStyle)

/**
 * @public
 */
export const Code = forwardRef(function Code(
  props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'size' | 'children'>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {children, language, size = 2, weight, ...restProps} = props

  return (
    <StyledCode data-ui="Code" {...restProps} $size={useArrayProp(size)} $weight={weight} ref={ref}>
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={stringifyChildren(children)} />
      </Suspense>
    </StyledCode>
  )
})
Code.displayName = 'ForwardRef(Code)'

function stringifyChildren(children: StringifiableNode): string {
  if (!children || typeof children === 'boolean') {
    return ''
  }

  if (Array.isArray(children)) {
    return children.map((c) => stringifyChildren(c)).join('')
  }

  return String(children)
}
