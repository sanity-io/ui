import {marginProps} from '../../props/margin'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {CODE_SIZE, CODE_TAG, type CodeSize, type CodeTag} from '../../types/Code'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface CodeProps<T extends CodeTag = 'pre'> extends Omit<
  TypographyProps,
  'align' | 'truncate' | 'tone'
> {
  /** Element to render */
  as?: T
  /** Refractor language for syntax highlighting */
  language?: string
  /** CSS **font-size** property */
  size?: Responsive<CodeSize>
}

export const codeProps: Record<string, PropDef> = {
  as: {
    type: 'union',
    values: CODE_TAG,
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
  weight: typographyProps['weight'] as PropDef,
  ...marginProps,
}
