import {code, type CodeStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import type {FontCodeSize} from '@sanity/ui/theme'
import {lazy, Suspense} from 'react'

import type {ComponentType, Props} from '../../types'

const LazyRefractor = lazy(() => import('./Refractor'))

/**
 * The default HTML element type rendered by the {@link Code} component.
 *
 * @public
 */
export const DEFAULT_CODE_ELEMENT = 'pre'

/**
 * Own props for the {@link Code} component.
 *
 * @remarks
 * Extends {@link CodeStyleProps} to provide typographic control over code blocks,
 * with additional props for syntax highlighting and font sizing.
 *
 * Inherited from {@link CodeStyleProps}:
 * - `weight` – Font weight (`"regular"` | `"medium"` | `"semibold"` | `"bold"`).
 * - `flex` – Flex grow/shrink behavior.
 * - `margin`, `marginX`, `marginY`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft` – Outer margin.
 * - `maxWidth` – Maximum width constraint.
 *
 * @public
 */
export type CodeOwnProps = CodeStyleProps & {
  /**
   * Specifies the programming language for syntax highlighting.
   *
   * @remarks
   * When provided as a valid language identifier string (e.g. `"javascript"`,
   * `"typescript"`, `"json"`, `"html"`, `"css"`), the code content is parsed
   * and rendered with syntax-highlighted tokens via a lazily loaded Refractor
   * component. When omitted or set to a non-string value, the content is
   * rendered as plain text inside a `<code>` element.
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  language?: string

  /**
   * Sets the font size of the code text using the theme's code font size scale.
   *
   * @remarks
   * Uses the code font size scale defined by the theme, which is separate from
   * the text and heading font size scales. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4`
   *
   * @type {ResponsiveProp\<FontCodeSize\>}
   * @defaultValue 2
   * @optional
   */
  size?: ResponsiveProp<FontCodeSize>
}

/**
 * Accepted values for the `as` prop of the {@link Code} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Code`.
 *
 * Accepted values: `"div"` | `"pre"` | `ComponentType`
 *
 * @public
 */
export type CodeElementType = 'div' | 'pre' | ComponentType

/**
 * Props for the {@link Code} component.
 *
 * @remarks
 * Combines {@link CodeOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<pre>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link CodeElementType}.
 *
 * @public
 */
export type CodeProps<E extends CodeElementType = CodeElementType> = Props<CodeOwnProps, E>

/**
 * Renders a block of code with optional syntax highlighting.
 *
 * @remarks
 * The `Code` component renders preformatted text using the theme's code font
 * family and size scale. When a `language` prop is provided, the content is
 * syntax-highlighted using a lazily loaded Refractor component wrapped in a
 * `Suspense` boundary.
 *
 * The component renders a `<pre>` element by default and supports all margin
 * and max-width style props inherited from {@link CodeStyleProps}.
 *
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `as` | `"pre"` |
 * | `size` | `2` |
 * | `weight` | `"regular"` |
 *
 * @public
 */
export function Code<E extends CodeElementType = typeof DEFAULT_CODE_ELEMENT>(
  props: CodeProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_CODE_ELEMENT,
    children,
    className,
    language: languageProp,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    maxWidth,
    size = 2,
    weight = 'regular',
    ...rest
  } = props as CodeProps<typeof DEFAULT_CODE_ELEMENT>

  const language = typeof languageProp === 'string' ? languageProp : undefined

  return (
    <Element
      data-ui="Code"
      {...rest}
      className={code({
        className,
        margin,
        marginX,
        marginY,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        maxWidth,
        size,
        weight,
      })}
    >
      <Suspense fallback={<code>{children}</code>}>
        <LazyRefractor language={language} value={children} />
      </Suspense>
    </Element>
  )
}
