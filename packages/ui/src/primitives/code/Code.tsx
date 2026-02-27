import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {code, CODE_STYLE_PROP_KEYS, type CodeStyleProps} from '@sanity/ui/css'
import {LazySyntax} from '@sanity/ui/primitives/_syntax'
import {Suspense} from 'react'

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
 * Extends {@link CodeStyleProps} to provide code-specific styling and adds
 * syntax highlighting support via the `language` prop.
 *
 * @public
 */
export type CodeOwnProps = CodeStyleProps & {
  /**
   * The programming language to use for syntax highlighting.
   */
  language?: string
}

/**
 * Accepted values for the `as` prop of the {@link Code} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Code`.
 * The rendered element receives all applicable HTML attributes for the chosen element type.
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
 * A themed code element for displaying inline or block-level code with
 * optional syntax highlighting.
 *
 * @remarks
 * The `Code` component renders a single HTML element (default `<pre>`) styled
 * with the theme's code typography scale. When a `language` prop is provided,
 * syntax highlighting is lazily loaded and applied to the content.
 *
 * @public
 */
export function Code<E extends CodeElementType = typeof DEFAULT_CODE_ELEMENT>(
  props: CodeProps<E>,
): React.JSX.Element {
  const [styleProps, domProps] = _splitKeys(
    props as CodeProps<typeof DEFAULT_CODE_ELEMENT>,
    CODE_STYLE_PROP_KEYS,
  )

  const {
    as: Element = DEFAULT_CODE_ELEMENT,
    children,
    language: languageProp,
    ...restDomProps
  } = domProps

  const language = typeof languageProp === 'string' ? languageProp : undefined

  return (
    <Element data-ui="Code" {...restDomProps} className={code(styleProps)}>
      <Suspense fallback={<code>{children}</code>}>
        <LazySyntax language={language} value={children} />
      </Suspense>
    </Element>
  )
}
