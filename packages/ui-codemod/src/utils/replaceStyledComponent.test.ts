import {type API, type FileInfo} from 'jscodeshift'

import {getComponentLocalNames} from './getComponentLocalNames'
import {replaceStyledComponent} from './replaceStyledComponent'
import {defineInlineTest} from './testUtils'

function transform(
  fileInfo: FileInfo,
  api: API,
  options?: {
    setLocalNames?: boolean
    unsetLocalNames?: boolean
  },
): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const localNames = options?.unsetLocalNames
    ? (new Set() as Set<string>)
    : options?.setLocalNames
      ? getComponentLocalNames(j, root, 'Card')
      : undefined

  replaceStyledComponent(
    j,
    root,
    {
      element: 'Card',
      ...(localNames !== undefined ? {localNames} : {}),
    },
    'Box',
  )

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
  transform,
  {setLocalNames: true},
  `
  import {Card as LegacyCard} from '@sanity/ui'

  const RootCard = styled(LegacyCard)(({theme}) => {})
  `,
  `
  // UI-CODEMOD TODO: Consider renaming LegacyCard to Box
  import { Box as LegacyCard } from '@sanity/ui';

  const RootCard = styled(LegacyCard)(({theme}) => {})
  `,
  'preserves aliased styled import and rewrites import',
)

defineInlineTest(
  transform,
  {unsetLocalNames: true},
  `
  import {Card} from '@sanity/ui'

  const RootCard = styled(Card)(({theme}) => {})
  `,
  `
  import {Card} from '@sanity/ui'

  const RootCard = styled(Card)(({theme}) => {})
  `,
  'does not match styled component when localNames is empty',
)
