import {type API, type FileInfo} from 'jscodeshift'

import {getComponentLocalNames} from './getComponentLocalNames'
import {replaceStyledComponent} from './replaceStyledComponent'
import {defineInlineTest} from './testUtils'

function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  replaceStyledComponent(j, root, {element: 'Card'}, 'Box')

  return root.toSource()
}

function transformWithLocalNames(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const localNames = getComponentLocalNames(j, root, 'Card')

  replaceStyledComponent(j, root, {element: 'Card', localNames}, 'Box')

  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  const RootCard = styled(Card)(({theme}) => {})
  `,
  `
  import {Box} from '@sanity/ui'

  const RootCard = styled(Box)(({theme}) => {})
  `,
  'replaces styled component',
)

defineInlineTest(
  transformWithLocalNames,
  {},
  `
  import {Card as LegacyCard} from '@sanity/ui'

  const RootCard = styled(LegacyCard)(({theme}) => {})
  `,
  `
  // UI-POC-CODEMOD TODO: Consider renaming LegacyCard to Box
  import { Box as LegacyCard } from '@sanity/ui';

  const RootCard = styled(LegacyCard)(({theme}) => {})
  `,
  'preserves aliased styled import and rewrites import',
)
