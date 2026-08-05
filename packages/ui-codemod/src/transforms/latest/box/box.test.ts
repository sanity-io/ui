import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {afterEach, describe, expect, it} from 'vitest'

const applyTransform = require('jscodeshift/dist/testUtils').applyTransform

import {clearModuleParseCache} from '../../../utils/parseModule'
import {defineInlineTest} from '../../../utils/testUtils'
import transform from './box'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'

  <Box />
  `,
  `
  import {Box} from "@sanity/ui"

  <Box />
  `,
  'updates Box import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Box
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  `
  <Box
    style={{
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    }} />
  `,
  'moves flex props to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Box
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  `
  <Box
    style={{
      gridAutoColumns: "auto",
      gridAutoFlow: "row",
      gridAutoRows: "auto"
    }} />
  `,
  'moves grid props to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Box
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Box
    style={{
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    }} />
  `,
  'moves grid props to style and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  import {Box} from '@sanity/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return <RootBox alignItems="center" />
  }
  `,
  `
  import {Box} from '@sanity/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return (
      <RootBox style={{
        alignItems: "center"
      }} />
    );
  }
  `,
  'transforms attributes on styled component',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return <RootBox alignItems="center" />
  }
  `,
  `
  import {Box} from "@sanity/ui"

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return (
      <RootBox style={{
        alignItems: "center"
      }} />
    );
  }
  `,
  'transforms attributes on styled component and updates import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  import {Box as ImportedBox} from '@sanity/ui'

  <ImportedBox alignItems="center" />
  `,
  `
  import {Box as ImportedBox} from '@sanity/ui'

  <ImportedBox style={{
    alignItems: "center"
  }} />
  `,
  'transforms attributes on aliased import',
)

defineInlineTest(
  transform,
  {},
  `
  <Box display="flex" alignItems="center" />
  `,
  `
  <Flex display="flex" alignItems="center" />
  `,
  'replaces Box with Flex when display is flex',
)

defineInlineTest(
  transform,
  {},
  `
  <Box display="grid" gridAutoFlow="row" />
  `,
  `
  <Grid display="grid" gridAutoFlow="row" />
  `,
  'replaces Box with Grid when display is grid',
)

defineInlineTest(
  transform,
  {},
  `
  import {Box} from '@sanity/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return <RootBox display="flex" alignItems="center" />
  }
  `,
  `
  import {Box} from '@sanity/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return (
      // UI-CODEMOD TODO: Please double check styled(Box) migration below
      <RootBox display="flex" alignItems="center" />
    );
  }
  `,
  'warns and does not transform attributes if styled Box should be replaced',
)

const tempDirs: string[] = []

afterEach(() => {
  clearModuleParseCache()

  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, {recursive: true, force: true})
  }
})

describe('cross-file styled aliases', () => {
  it('transforms attributes on imported styled Box wrappers', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ui-codemod-box-crossfile-'))

    tempDirs.push(dir)

    writeFileSync(
      join(dir, 'Component.styled.tsx'),
      `
        import {Box} from '@sanity/ui'

        export const RootBox = styled(Box)(({theme}) => ({}))
      `,
    )

    writeFileSync(
      join(dir, 'Component.tsx'),
      `
        import {RootBox} from './Component.styled'

        export function Component() {
          return <RootBox alignItems="center" />
        }
      `,
    )

    const importerPath = join(dir, 'Component.tsx')
    const source = readFileSync(importerPath, 'utf8')
    const output = applyTransform(transform, {}, {source, path: importerPath}, {parser: 'tsx'})

    expect(output).toContain('alignItems: "center"')
    expect(output).not.toContain('<RootBox alignItems="center" />')
  })

  it('adds todo warning on when imported styled Box wrapper should be replaced', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ui-codemod-box-crossfile-todo-'))

    tempDirs.push(dir)

    writeFileSync(
      join(dir, 'Component.styled.tsx'),
      `
        import {Box} from '@sanity/ui'

        export const RootBox = styled(Box)(({theme}) => ({}))
      `,
    )

    writeFileSync(
      join(dir, 'Component.tsx'),
      `
        import {RootBox} from './Component.styled'

        export function Component() {
          return <RootBox display="flex" alignItems="center" />
        }
      `,
    )

    const importerPath = join(dir, 'Component.tsx')
    const source = readFileSync(importerPath, 'utf8')
    const output = applyTransform(transform, {}, {source, path: importerPath}, {parser: 'tsx'})

    expect(output).toContain('UI-CODEMOD TODO: Please double check styled(Box) migration below')
    expect(output).toContain('<RootBox display="flex" alignItems="center" />')
    expect(output).not.toContain('const RootBox = styled(Box)')
  })
})
