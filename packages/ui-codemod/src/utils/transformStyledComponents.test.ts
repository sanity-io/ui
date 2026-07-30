import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {type API, type FileInfo} from 'jscodeshift'
import jscodeshift from 'jscodeshift'
import {afterEach, describe, expect, it} from 'vitest'

import {getAttribute} from './getAttribute'
import {getComponentLocalNames} from './getComponentLocalNames'
import {getStyledComponentAliases} from './getStyledComponentAliases'
import {clearModuleParseCache} from './parseModule'
import {defineInlineTest} from './testUtils'
import {transformAttributes} from './transformAttributes'
import {transformStyledComponents} from './transformStyledComponents'

const DEFAULT_WARNING = 'Please double check styled-component migration below'
const CUSTOM_WARNING =
  'Please double check styled(Card) migration — update to styled(Box) manually if needed'

function transform(
  fileInfo: FileInfo,
  api: API,
  options?: {
    warning?: string
    hasCallback?: boolean
  },
): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const localNames = getComponentLocalNames(j, root, 'Card')
  const styledAliases = getStyledComponentAliases(j, root, 'Card', fileInfo.path, localNames)

  transformStyledComponents(j, root, styledAliases, (attrs) => !!getAttribute(attrs, 'margin'), {
    warning: options?.warning,
    callback: options?.hasCallback
      ? (path) =>
          transformAttributes(
            j,
            path,
            {
              insetTop: {
                type: 'rename-only',
                name: 'top',
              },
            },
            'Warning',
          )
      : undefined,
  })

  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return <RootCard margin={1} />
  }
  `,
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return <RootCard margin={1} />
  }
  `,
  'preserves component if filter matches',
)

defineInlineTest(
  transform,
  {
    hasCallback: true,
  },
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => {})

    return <RootCard margin={1} insetTop={0} />
  }
  `,
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => {})

    return <RootCard margin={1} top={0} />;
  }
  `,
  'preserves component and runs callback if filter matches',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return <RootCard padding={1} />
  }
  `,
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return (
      // UI-POC-CODEMOD TODO: ${DEFAULT_WARNING}
      <RootCard padding={1} />
    );
  }
  `,
  'adds todo warning on jsx usage when filter does not match',
)

defineInlineTest(
  transform,
  {warning: CUSTOM_WARNING},
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return <RootCard padding={1} />
  }
  `,
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return (
      // UI-POC-CODEMOD TODO: ${CUSTOM_WARNING}
      <RootCard padding={1} />
    );
  }
  `,
  'adds custom todo warning on jsx usage when filter does not match',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return (
      // UI-POC-CODEMOD TODO: ${DEFAULT_WARNING}
      <RootCard padding={1} />
    );
  }
  `,
  `
  import {Card} from '@sanity/ui'

  function Example() {
    const RootCard = styled(Card)(({theme}) => ({}))

    return (
      // UI-POC-CODEMOD TODO: ${DEFAULT_WARNING}
      <RootCard padding={1} />
    );
  }
  `,
  'does not duplicate todo warning',
)

describe('imported styled aliases', () => {
  const j = jscodeshift
  const tempDirs: string[] = []

  afterEach(() => {
    clearModuleParseCache()

    for (const dir of tempDirs.splice(0)) {
      rmSync(dir, {recursive: true, force: true})
    }
  })

  it('adds todo warning on jsx usage when filter does not match', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ui-codemod-styled-crossfile-'))

    tempDirs.push(dir)

    writeFileSync(
      join(dir, 'Component.styled.tsx'),
      `
        import {Card} from '@sanity/ui'

        export const RootCard = styled(Card)(({theme}) => ({}))
      `,
    )

    writeFileSync(
      join(dir, 'Component.tsx'),
      `
        import {RootCard} from './Component.styled'

        export function Component() {
          return <RootCard padding={1} />
        }
      `,
    )

    const importerPath = join(dir, 'Component.tsx')
    const root = j(readFileSync(importerPath, 'utf8'))
    const localNames = getComponentLocalNames(j, root, 'Card')
    const styledAliases = getStyledComponentAliases(j, root, 'Card', importerPath, localNames)

    transformStyledComponents(j, root, styledAliases, (attrs) => !!getAttribute(attrs, 'margin'), {
      warning: DEFAULT_WARNING,
    })

    expect(root.toSource()).toContain(`UI-POC-CODEMOD TODO: ${DEFAULT_WARNING}`)
    expect(root.toSource()).not.toContain('const RootCard = styled(Card)')
  })
})
