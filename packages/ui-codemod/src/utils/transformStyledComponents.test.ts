import {type API, type FileInfo} from 'jscodeshift'

import {getAttribute} from './getAttribute'
import {getComponentLocalNames} from './getComponentLocalNames'
import {getStyledComponentAliases} from './getStyledComponentAliases'
import {defineInlineTest} from './testUtils'
import {transformAttributes} from './transformAttributes'
import {transformStyledComponents} from './transformStyledComponents'

const DEFAULT_WARNING = 'Please double check styled-component migration(s) below'
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
  const styledAliases = getStyledComponentAliases(j, root, localNames)

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
    // UI-CODEMOD TODO: ${DEFAULT_WARNING}
    const RootCard = styled(Card)(({theme}) => ({}));

    return <RootCard padding={1} />
  }
  `,
  'adds todo warning on styled definition when filter does not match',
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
    // UI-CODEMOD TODO: ${CUSTOM_WARNING}
    const RootCard = styled(Card)(({theme}) => ({}));

    return <RootCard padding={1} />
  }
  `,
  'adds custom todo warning on styled definition when filter does not match',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  function Example() {
    // UI-CODEMOD TODO: ${DEFAULT_WARNING}
    const RootCard = styled(Card)(({theme}) => ({}))

    return <RootCard padding={1} />
  }
  `,
  `
  import {Card} from '@sanity/ui'

  function Example() {
    // UI-CODEMOD TODO: ${DEFAULT_WARNING}
    const RootCard = styled(Card)(({theme}) => ({}))

    return <RootCard padding={1} />
  }
  `,
  'does not duplicate todo warning',
)
