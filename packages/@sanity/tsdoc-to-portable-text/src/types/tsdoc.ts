import {PortableTextNode} from '../sanity'

/**
 * @public
 */
export interface TSDocParamBlock {
  _key: string
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
  _key: string
  _type: 'tsdoc.customBlock'
  content?: PortableTextNode[]
  tag: string
}

/**
 * @public
 */
export interface TSDocExampleBlock {
  _key: string
  _type: 'tsdoc.exampleBlock'
  content?: PortableTextNode[]
}

/**
 * @public
 */
export interface TSDocSeeBlock {
  _key: string
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
  customBlocks?: TSDocCustomBlock[]
  deprecated?: TSDocDeprecatedBlock
  exampleBlocks?: TSDocExampleBlock[]
  modifierTags?: TSDocModifierTag[]
  parameters?: TSDocParamBlock[]
  remarks?: TSDocRemarksBlock
  returns?: TSDocReturnsBlock
  seeBlocks?: TSDocSeeBlock[]
  summary?: PortableTextNode[]
}
