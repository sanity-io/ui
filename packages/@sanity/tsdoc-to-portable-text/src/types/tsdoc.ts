import {PortableTextNode} from '../_lib/portable-text'
import {SanityArrayItem} from '../_lib/sanity'

/**
 * @public
 */
export interface TSDocParamBlock {
  _type: 'tsdoc.paramBlock'
  content?: PortableTextNode[]
  name: string
}

/**
 * @public
 */
export interface TSDocReturnsBlock {
  _type: 'tsdoc.returnsBlock'
  content?: PortableTextNode[]
}

/**
 * @public
 */
export interface TSDocRemarksBlock {
  _type: 'tsdoc.remarksBlock'
  content?: PortableTextNode[]
}

/**
 * @public
 */
export interface TSDocCustomBlock {
  _type: 'tsdoc.customBlock'
  content?: PortableTextNode[]
  tag: string
}

/**
 * @public
 */
export interface TSDocExampleBlock {
  _type: 'tsdoc.exampleBlock'
  content?: PortableTextNode[]
}

/**
 * @public
 */
export interface TSDocSeeBlock {
  _type: 'tsdoc.seeBlock'
  content?: PortableTextNode[]
}

/**
 * @public
 */
export interface TSDocDeprecatedBlock {
  _type: 'tsdoc.deprecatedBlock'
  content?: PortableTextNode[]
}

/**
 * @public
 */
export interface TSDocModifierTag {
  _type: 'tsdoc.modifierTag'
  name: string
}

/**
 * @public
 */
export interface TSDocComment {
  _type: 'tsdoc.docComment'
  customBlocks?: SanityArrayItem<TSDocCustomBlock>[]
  deprecated?: TSDocDeprecatedBlock
  exampleBlocks?: SanityArrayItem<TSDocExampleBlock>[]
  modifierTags?: SanityArrayItem<TSDocModifierTag>[]
  parameters?: SanityArrayItem<TSDocParamBlock>[]
  remarks?: TSDocRemarksBlock
  returns?: TSDocReturnsBlock
  seeBlocks?: SanityArrayItem<TSDocSeeBlock>[]
  summary?: SanityArrayItem<PortableTextNode>[]
}
