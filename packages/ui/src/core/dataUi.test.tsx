/** @vitest-environment jsdom */

import {describe, expect, it} from 'vitest'

import {render} from '../../test/utils'
import {
  Arrow,
  CodeSkeleton,
  HeadingSkeleton,
  LabelSkeleton,
  Skeleton,
  TextSkeleton,
} from '../exports'
import {MenuDivider} from '../exports/menu'

describe('component identifiers', () => {
  it('identifies exported components with data-ui attributes', () => {
    const {container} = render(
      <>
        <Arrow height={5} width={10} />
        <Skeleton />
        <TextSkeleton />
        <LabelSkeleton />
        <HeadingSkeleton />
        <CodeSkeleton />
        <MenuDivider />
      </>,
    )

    for (const componentName of [
      'Arrow',
      'Skeleton',
      'TextSkeleton',
      'LabelSkeleton',
      'HeadingSkeleton',
      'CodeSkeleton',
      'MenuDivider',
    ]) {
      expect(container.querySelector(`[data-ui="${componentName}"]`)).not.toBeNull()
    }
  })
})
