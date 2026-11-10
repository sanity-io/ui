import {marginProps} from '../../props/margin'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {CODE_SIZE, type CodeSize} from '../../types/Code'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

interface CodeBaseProps extends Omit<TypographyProps, 'align' | 'truncate' | 'tone' | 'weight'> {
  /**
   * Refractor language for syntax highlighting.
   */
  language?: string
  /**
   * Sets font size.
   */
  size?: Responsive<CodeSize>
}

/** @public */
export type CodeProps =
  | (CodeBaseProps & {
      /**
       * Render code inline or as a block.
       * @remarks Block code is wrapped in a `<pre>` tag.
       */
      inline?: false
    } & Omit<React.ComponentPropsWithRef<'pre'>, keyof CodeBaseProps>)
  | (CodeBaseProps & {
      inline: true
    } & Omit<React.ComponentPropsWithRef<'span'>, keyof CodeBaseProps>)

export const codeProps: Record<string, PropDef> = {
  inline: {
    type: 'boolean',
  },
  language: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'text-code',
    values: CODE_SIZE,
  },
  muted: typographyProps['muted'] as PropDef,
  trim: typographyProps['trim'] as PropDef,
  ...marginProps,
}
