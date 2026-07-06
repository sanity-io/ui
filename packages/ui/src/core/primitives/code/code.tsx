import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef, lazy, Suspense} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {
  FontWeightStyleProps,
  responsiveCodeFontStyle,
  ResponsiveFontSizeStyleProps,
} from '../../styles/internal'
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

const StyledCode = styled.pre<FontWeightStyleProps & ResponsiveFontSizeStyleProps>(
  codeBaseStyle,
  responsiveCodeFontStyle,
)

const CodeComponent = forwardRef(function Code(
  props: CodeOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLPreElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLPreElement>,
) {
  const {children, language, size = 2, weight, ...restProps} = props

  return (
    <StyledCode
      data-ui="Code"
      {...restProps}
      $size={_getArrayProp(size)}
      // oxlint-disable-next-line no-unsafe-type-assertion -- `weight` is typed as `string` in the public API; unknown weights fall back to `regular` at runtime
      $weight={weight as ThemeFontWeightKey | undefined}
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
// oxlint-disable-next-line no-unsafe-type-assertion
export const Code = CodeComponent as unknown as <E extends ElementType = 'pre'>(
  props: CodeProps<E>,
) => React.JSX.Element
