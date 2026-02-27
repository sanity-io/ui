import * as fs from 'node:fs'
import * as path from 'node:path'
import ts from 'typescript'
import {describe, expect, it} from 'vitest'

const SRC_DIR = path.resolve(__dirname, '../src')

const TARGET_DIRS = ['primitives', 'components', 'root']

/**
 * File path substrings to exclude from scanning.
 * These are internal implementation files that don't define component props.
 */
const EXCLUDED_PATH_PATTERNS = [
  '__workshop__',
  '.test.',
  '.stories.',
  'reducer.',
  'helpers.',
  'constants.',
  'toastState.',
  'isTargetWithinScope.',
]

/**
 * Type/interface names to include when checking for documented props.
 * Matches names ending with `OwnProps`, `Props`, or `Params`,
 * plus the `VirtualListChangeOpts` type.
 */
function isPropsType(name: string): boolean {
  return (
    name.endsWith('OwnProps') ||
    name.endsWith('Props') ||
    name.endsWith('Params') ||
    name === 'VirtualListChangeOpts'
  )
}

/**
 * Type/interface names to always skip, even if they match the above patterns.
 * These are generic wrapper types that don't define inline props
 * (they use `Props<OwnProps, E>` generics), or internal context/state types
 * that happen to end in "Props".
 */
const SKIPPED_TYPE_NAMES = new Set([
  // Generic wrapper types – no inline property signatures
  'BoxProps',
  'FlexProps',
  'StackProps',
  'GridProps',
  'CardProps',
  'ContainerProps',
  'ButtonProps',
  'TextProps',
  'HeadingProps',
  'LabelProps',
  'CodeProps',
  'KBDProps',
  'AvatarProps',
  'BadgeProps',
  'CheckboxProps',
  'RadioProps',
  'SelectProps',
  'SpinnerProps',
  'SrOnlyProps',
  'SwitchProps',
  'InlineProps',
  'LayerProps',
  'PopoverProps',
  'TooltipProps',
  'SkeletonProps',
  'CodeSkeletonProps',
  'HeadingSkeletonProps',
  'LabelSkeletonProps',
  'TextSkeletonProps',
  'TextAreaProps',
  'TextInputProps',
  'SelectableProps',
  'MenuProps',
  'MenuDividerProps',
  'MenuGroupProps',
  'MenuItemProps',
  'DialogProps',
  'TabProps',
  'TabListProps',
  'TabPanelProps',
  'HotkeysProps',
  'BreadcrumbsProps',
  'TreeProps',
  'TreeItemProps',
  'VirtualListProps',
  'AutocompleteProps',
  'RootProps',
  'ToastProps',
])

function getSourceFiles(): string[] {
  const files: string[] = []

  for (const dir of TARGET_DIRS) {
    const dirPath = path.join(SRC_DIR, dir)
    if (!fs.existsSync(dirPath)) continue

    const entries = fs.readdirSync(dirPath, {recursive: true, encoding: 'utf-8'})
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry)
      if (!fullPath.endsWith('.ts') && !fullPath.endsWith('.tsx')) continue
      if (EXCLUDED_PATH_PATTERNS.some((p) => fullPath.includes(p))) continue

      const stat = fs.statSync(fullPath)
      if (stat.isFile()) files.push(fullPath)
    }
  }

  return files
}

function hasJsDocComment(node: ts.Node, sourceFile: ts.SourceFile): boolean {
  const fullText = sourceFile.getFullText()
  const commentRanges = ts.getLeadingCommentRanges(fullText, node.getFullStart())
  if (!commentRanges || commentRanges.length === 0) return false
  return commentRanges.some((range) => {
    const comment = fullText.slice(range.pos, range.end)
    return comment.startsWith('/**')
  })
}

function isExported(node: ts.Node): boolean {
  if (!ts.canHaveModifiers(node)) return false
  const modifiers = ts.getModifiers(node)
  return modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false
}

interface UndocumentedProp {
  file: string
  typeName: string
  propName: string
  line: number
}

function collectPropertySignatures(
  typeNode: ts.TypeNode,
  sourceFile: ts.SourceFile,
  typeName: string,
  relativePath: string,
  results: UndocumentedProp[],
): void {
  if (ts.isTypeLiteralNode(typeNode)) {
    for (const member of typeNode.members) {
      if (ts.isPropertySignature(member) && member.name) {
        const propName = member.name.getText(sourceFile)
        if (!hasJsDocComment(member, sourceFile)) {
          const {line} = sourceFile.getLineAndCharacterOfPosition(member.getStart(sourceFile))
          results.push({file: relativePath, typeName, propName, line: line + 1})
        }
      }
    }
  } else if (ts.isIntersectionTypeNode(typeNode)) {
    for (const subType of typeNode.types) {
      collectPropertySignatures(subType, sourceFile, typeName, relativePath, results)
    }
  }
}

function findUndocumentedProps(filePath: string): UndocumentedProp[] {
  const results: UndocumentedProp[] = []
  const content = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true)
  const relativePath = path.relative(path.resolve(__dirname, '..'), filePath)

  function visit(node: ts.Node): void {
    // Exported interface declarations
    if (ts.isInterfaceDeclaration(node) && isExported(node)) {
      const typeName = node.name.getText(sourceFile)
      if (isPropsType(typeName) && !SKIPPED_TYPE_NAMES.has(typeName)) {
        for (const member of node.members) {
          if (ts.isPropertySignature(member) && member.name) {
            const propName = member.name.getText(sourceFile)
            if (!hasJsDocComment(member, sourceFile)) {
              const {line} = sourceFile.getLineAndCharacterOfPosition(member.getStart(sourceFile))
              results.push({file: relativePath, typeName, propName, line: line + 1})
            }
          }
        }
      }
    }

    // Exported type alias declarations
    if (ts.isTypeAliasDeclaration(node) && isExported(node)) {
      const typeName = node.name.getText(sourceFile)
      if (isPropsType(typeName) && !SKIPPED_TYPE_NAMES.has(typeName)) {
        collectPropertySignatures(node.type, sourceFile, typeName, relativePath, results)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return results
}

describe('TypeDoc coverage', () => {
  it('all props in exported types and interfaces should have JSDoc comments', () => {
    const files = getSourceFiles()
    const allUndocumented: UndocumentedProp[] = []

    for (const file of files) {
      const undocumented = findUndocumentedProps(file)
      allUndocumented.push(...undocumented)
    }

    if (allUndocumented.length > 0) {
      const grouped = new Map<string, UndocumentedProp[]>()
      for (const prop of allUndocumented) {
        const key = `${prop.file} → ${prop.typeName}`
        if (!grouped.has(key)) grouped.set(key, [])
        grouped.get(key)!.push(prop)
      }

      const lines: string[] = []
      for (const [key, props] of grouped) {
        lines.push(`  ${key}`)
        for (const p of props) {
          lines.push(`    L${p.line}: ${p.propName}`)
        }
      }

      expect.fail(`Found ${allUndocumented.length} undocumented prop(s):\n\n${lines.join('\n')}`)
    }
  })
})
