import {lazy, Suspense} from 'react'
import {styled} from 'styled-components'

import {ThemeFontWeightKey} from '../../../theme/system/font'
import {_fontWeight, _responsiveFontSize} from '../../styles/font/responsiveFont'
import {FontWeightStyleProps, ResponsiveFontSizeStyleProps} from '../../styles/font/types'
import {_getArrayProp} from '../../styles/helpers'
import {ElementType, Props} from '../../types/component'
import {codeBaseStyle, codeSyntaxStyle} from './styles'

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

const CodeBase = styled.pre`@layer u-styled {
  ${codeBaseStyle}
}`

const CodeSyntax = styled(CodeBase)`@layer u-styled {
  ${codeSyntaxStyle}
}`

const StyledCode = styled(CodeSyntax)<
  FontWeightStyleProps & ResponsiveFontSizeStyleProps
>`@layer u-styled {
  ${(props) => _fontWeight('code', props)}
  ${(props) => _responsiveFontSize('code', props)}
}`

function CodeComponent(
  props: CodeOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLPreElement>, 'as' | 'size'>,
) {
  const {children, language, ref, size = 2, weight, ...restProps} = props

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
}

/**
 * @public
 */
export const Code: <E extends ElementType = 'pre'>(props: CodeProps<E>) => React.JSX.Element =
  CodeComponent
