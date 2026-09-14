import {type API, type FileInfo} from 'jscodeshift'

import type {AttributeMods} from '../types/AttributeMods'
import {defineInlineTest} from '../utils/testUtils'
import {getAttribute} from './getAttribute'
import {getComponentLocalNames} from './getComponentLocalNames'
import {replaceElement} from './replaceElement'
import {transformAttributes} from './transformAttributes'

const FROM_MOD: AttributeMods = {
  insetTop: {
    type: 'rename-only',
    name: 'top',
  },
}

const TO_MOD: AttributeMods = {
  insetBottom: {
    type: 'rename-only',
    name: 'bottom',
  },
}

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

  replaceElement(
    j,
    root,
    (attrs) => !getAttribute(attrs, 'margin'),
    {
      element: 'Card',
      ...(localNames !== undefined ? {localNames} : {}),
      callback: (path) => transformAttributes(j, path, FROM_MOD, 'Warning'),
    },
    {
      element: 'Box',
      callback: (path) => transformAttributes(j, path, TO_MOD, 'Warning'),
    },
  )

  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  <Card margin={1} />
  `,
  `
  <Card margin={1} />
  `,
  'preserves element if filter returns false',
)

defineInlineTest(
  transform,
  {},
  `
  <Card padding={1} />
  `,
  `
  <Box padding={1} />
  `,
  'replaces element if filter returns true',
)

defineInlineTest(
  transform,
  {},
  `
  <Card padding={1}>Content</Card>
  `,
  `
  <Box padding={1}>Content</Box>
  `,
  'replaces element and updates closing tag',
)

defineInlineTest(
  transform,
  {},
  `
  <Card margin={1} insetTop={1} />
  `,
  `
  <Card margin={1} top={1} />
  `,
  'preserves element and runs from callback',
)

defineInlineTest(
  transform,
  {},
  `
  <Card padding={1} insetBottom={1} />
  `,
  `
  <Box padding={1} bottom={1} />
  `,
  'preserves element and runs to callback',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  <Card padding={1}>Content</Card>
  `,
  `
  import {Box} from '@sanity/ui'

  <Box padding={1}>Content</Box>
  `,
  'replaces element and import',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  <>
    <Card margin={1} />
    <Card padding={1}>Content</Card>
  </>
  `,
  `
  import { Card, Box } from '@sanity/ui';

  <>
    <Card margin={1} />
    <Box padding={1}>Content</Box>
  </>
  `,
  'replaces element and combines imports',
)

defineInlineTest(
  transform,
  {setLocalNames: true},
  `
  import {Card as LegacyCard} from '@sanity/ui'

  <LegacyCard padding={1}>Content</LegacyCard>
  `,
  `
  // UI-CODEMOD TODO: Consider renaming LegacyCard to Box
  import { Box as LegacyCard } from '@sanity/ui';

  <LegacyCard padding={1}>Content</LegacyCard>
  `,
  'preserves aliased jsx name and rewrites import',
)

defineInlineTest(
  transform,
  {unsetLocalNames: true},
  `
  <Card padding={1} />
  `,
  `
  <Card padding={1} />
  `,
  'does not match bare element when localNames is empty',
)
