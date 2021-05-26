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
  DocNodeContainer,
  DocNodeTransforms,
  DocParagraph,
  DocPlainText,
  StandardTags,
} from '@microsoft/tsdoc'
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

    const children = _transformContainer(transformedParagraph)

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

function _transformContainer(section: DocNodeContainer): Record<string, unknown>[] | undefined {
  if (!section.nodes.length) return undefined

  const nodes = section.nodes
    .map((node, idx) => _transformDocNode(node, String(idx)))
    .filter(Boolean) as Record<string, unknown>[]

  return nodes.length ? nodes : undefined
}

export function transformDocComment(docComment: DocComment): Record<string, unknown> {
  // Summary
  const summary = _transformContainer(docComment.summarySection)

  // Parameters
  const parameters = docComment.params.blocks.length
    ? docComment.params.blocks.map((paramBlock, idx) => ({
        _type: 'tsdoc.paramBlock',
        _key: String(idx),
        name: paramBlock.parameterName,
        content: _transformContainer(paramBlock.content),
      }))
    : undefined

  // Returns
  const returns = docComment.returnsBlock && {
    _type: 'tsdoc.returnsBlock',
    content: _transformContainer(docComment.returnsBlock.content),
  }

  // `@remarks` block
  const remarks = docComment.remarksBlock && {
    _type: 'tsdoc.remarksBlock',
    content: _transformContainer(docComment.remarksBlock.content),
  }

  // `@example` blocks
  const _exampleBlocks = docComment.customBlocks.filter(
    (x) => x.blockTag.tagNameWithUpperCase === StandardTags.example.tagNameWithUpperCase
  )
  const exampleBlocks = _exampleBlocks.length
    ? _exampleBlocks.map((exampleBlock, idx) => {
        return {
          _type: 'tsdoc.exampleBlock',
          _key: String(idx),
          content: _transformContainer(exampleBlock.content),
        }
      })
    : undefined

  // `@see` blocks
  const seeBlocks = docComment.seeBlocks.length
    ? docComment.seeBlocks.map((seeBlock, idx) => ({
        _type: 'tsdoc.seeBlock',
        _key: String(idx),
        content: _transformContainer(seeBlock.content),
      }))
    : undefined

  // `@deprecated` block
  const deprecated = docComment.deprecatedBlock && {
    _type: 'tsdoc.deprecatedBlock',
    content: _transformContainer(docComment.deprecatedBlock.content),
  }

  // Modifiers
  const modifierTags = docComment.modifierTagSet.nodes.length
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
    exampleBlocks,
    seeBlocks,
    deprecated,
    modifierTags,
  }
}
