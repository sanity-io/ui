import {
  DocBlockTag,
  DocCodeSpan,
  DocComment,
  DocErrorText,
  DocEscapedText,
  DocFencedCode,
  DocLinkTag,
  DocMemberIdentifier,
  DocMemberReference,
  DocNode,
  DocNodeTransforms,
  DocParagraph,
  DocPlainText,
  DocSection,
  StandardTags,
} from '@microsoft/tsdoc'
import {PortableTextNode} from '../sanity'
import {
  TSDocComment,
  TSDocCustomBlock,
  TSDocDeprecatedBlock,
  TSDocExampleBlock,
  TSDocModifierTag,
  TSDocParamBlock,
  TSDocRemarksBlock,
  TSDocReturnsBlock,
  TSDocSeeBlock,
} from '../types'
import {isArray, isRecord} from './helpers'

function _transformDocNode(docNode: DocNode, key: string): Record<string, unknown> | undefined {
  // Block = "Block",
  // BlockTag = "BlockTag",
  // Excerpt = "Excerpt",
  // FencedCode = "FencedCode",
  // CodeSpan = "CodeSpan",
  // Comment = "Comment",
  // DeclarationReference = "DeclarationReference",
  // ErrorText = "ErrorText",
  // EscapedText = "EscapedText",
  // HtmlAttribute = "HtmlAttribute",
  // HtmlEndTag = "HtmlEndTag",
  // HtmlStartTag = "HtmlStartTag",
  // InheritDocTag = "InheritDocTag",
  // InlineTag = "InlineTag",
  // LinkTag = "LinkTag",
  // MemberIdentifier = "MemberIdentifier",
  // MemberReference = "MemberReference",
  // MemberSelector = "MemberSelector",
  // MemberSymbol = "MemberSymbol",
  // Paragraph = "Paragraph",
  // ParamBlock = "ParamBlock",
  // ParamCollection = "ParamCollection",
  // PlainText = "PlainText",
  // Section = "Section",
  // SoftBreak = "SoftBreak"

  if (docNode.kind === 'CodeSpan') {
    return {
      _type: 'span',
      _key: key,
      marks: ['code'],
      text: (docNode as DocCodeSpan).code,
    }
  }

  if (docNode.kind === 'ErrorText') {
    return {
      _type: 'span',
      _key: key,
      marks: [],
      text: (docNode as DocErrorText).text,
    }
  }

  if (docNode.kind === 'EscapedText') {
    return {
      _type: 'span',
      _key: key,
      marks: [],
      text: (docNode as DocEscapedText).decodedText,
    }
  }

  if (docNode.kind === 'FencedCode') {
    const node = docNode as DocFencedCode

    return {
      _type: 'code',
      _key: key,
      code: node.code,
      language: node.language,
    }
  }

  if (docNode.kind === 'LinkTag') {
    const linkTag: DocLinkTag = docNode as DocLinkTag

    if (linkTag.urlDestination) {
      const linkText: string = linkTag.linkText || linkTag.urlDestination

      return {
        _type: 'span',
        _key: key,
        _markDef: {
          _type: 'link',
          href: linkTag.urlDestination,
        },
        marks: [],
        text: linkText,
      }
    } else {
      let identifier = ''

      if (linkTag.codeDestination) {
        // @todo: the library should provide a default rendering for this
        const memberReferences: ReadonlyArray<DocMemberReference> =
          linkTag.codeDestination.memberReferences

        if (memberReferences.length > 0) {
          const memberIdentifier: DocMemberIdentifier | undefined =
            memberReferences[memberReferences.length - 1].memberIdentifier

          if (memberIdentifier) {
            identifier = memberIdentifier.identifier
          }
        }
      }

      const linkText: string = linkTag.linkText || identifier || '???'

      return {
        _type: 'span',
        _key: key,
        // @todo
        // _markDef: {
        //   _type: 'link',
        //   href: '#',
        // },
        marks: [],
        text: linkText,
      }
    }
  }

  if (docNode.kind === 'Paragraph') {
    const transformedParagraph: DocParagraph = DocNodeTransforms.trimSpacesInParagraph(
      docNode as DocParagraph
    )

    const children = _transformDocCommentContent(transformedParagraph)

    if (!children) return undefined

    // Find mark defs
    const markDefs = []

    for (const child of children) {
      if (child._type === 'span' && child._markDef) {
        const markDefKey = isRecord(child._markDef) && `${child._markDef._type}${markDefs.length}`

        if (isRecord(child._markDef)) {
          child._markDef._key = markDefKey
        }

        if (isArray(child.marks)) {
          child.marks.push(markDefKey)
        }

        markDefs.push(child._markDef)
        delete child._markDef
      }
    }

    if (children.length === 0) {
      children.push({_type: 'span', _key: '0', marks: [], text: ''})
    }

    return {
      _type: 'block',
      _key: key,
      style: 'normal',
      children,
      markDefs,
    }
  }

  if (docNode.kind === 'PlainText') {
    return {
      _type: 'span',
      _key: key,
      marks: [],
      text: (docNode as DocPlainText).text,
    }
  }

  if (docNode.kind === 'SoftBreak') {
    return {
      _type: 'span',
      _key: key,
      text: '\n',
    }
  }

  if (docNode.kind === 'BlockTag') {
    const node = docNode as DocBlockTag

    return {
      _type: 'span',
      _key: key,
      marks: [],
      text: node.tagName,
    }
  }

  throw new Error(`unknown doc node type: ${docNode.kind}`)
}

export function _transformDocCommentContent(
  section: DocSection | DocParagraph
): PortableTextNode[] | undefined {
  if (!section.nodes.length) return undefined

  const nodes = section.nodes
    .map((node, idx) => _transformDocNode(node, String(idx)))
    .filter(Boolean) as Record<string, unknown>[]

  return nodes.length ? nodes : undefined
}

export function transformDocComment(docComment: DocComment): TSDocComment {
  // Summary
  const summary = _transformDocCommentContent(docComment.summarySection)

  // Parameters
  const parameters: TSDocParamBlock[] | undefined = docComment.params.blocks.length
    ? docComment.params.blocks.map((paramBlock, idx) => ({
        _type: 'tsdoc.paramBlock',
        _key: String(idx),
        name: paramBlock.parameterName,
        content: _transformDocCommentContent(paramBlock.content),
      }))
    : undefined

  // Returns
  const returns: TSDocReturnsBlock | undefined = docComment.returnsBlock && {
    _type: 'tsdoc.returnsBlock',
    content: _transformDocCommentContent(docComment.returnsBlock.content),
  }

  // `@remarks` block
  const remarks: TSDocRemarksBlock | undefined = docComment.remarksBlock && {
    _type: 'tsdoc.remarksBlock',
    content: _transformDocCommentContent(docComment.remarksBlock.content),
  }

  const exampleBlocks: TSDocExampleBlock[] = []
  const customBlocks: TSDocCustomBlock[] = []

  // Custom blocks
  for (let i = 0; i < docComment.customBlocks.length; i += 1) {
    const customBlock = docComment.customBlocks[i]

    // This is a `@example` block
    if (customBlock.blockTag.tagNameWithUpperCase === StandardTags.example.tagNameWithUpperCase) {
      exampleBlocks.push({
        _type: 'tsdoc.exampleBlock',
        _key: String(i),
        content: _transformDocCommentContent(customBlock.content),
      })
    } else {
      customBlocks.push({
        _type: 'tsdoc.customBlock',
        _key: String(i),
        tag: customBlock.blockTag.tagName,
        content: _transformDocCommentContent(customBlock.content),
      })
    }
  }

  // `@see` blocks
  const seeBlocks: TSDocSeeBlock[] | undefined = docComment.seeBlocks.length
    ? docComment.seeBlocks.map((seeBlock, idx) => ({
        _type: 'tsdoc.seeBlock',
        _key: String(idx),
        content: _transformDocCommentContent(seeBlock.content),
      }))
    : undefined

  // `@deprecated` block
  const deprecated: TSDocDeprecatedBlock | undefined = docComment.deprecatedBlock && {
    _type: 'tsdoc.deprecatedBlock',
    content: _transformDocCommentContent(docComment.deprecatedBlock.content),
  }

  // Modifiers
  const modifierTags: TSDocModifierTag[] | undefined = docComment.modifierTagSet.nodes.length
    ? docComment.modifierTagSet.nodes.map((modifierTag, idx) => ({
        _type: 'tsdoc.modifierTag',
        _key: String(idx),
        name: modifierTag.tagName,
      }))
    : undefined

  return {
    _type: 'tsdoc.docComment',
    summary,
    parameters,
    returns,
    remarks,
    customBlocks: customBlocks.length > 0 ? customBlocks : undefined,
    exampleBlocks: exampleBlocks.length > 0 ? exampleBlocks : undefined,
    seeBlocks,
    deprecated,
    modifierTags,
  }
}
