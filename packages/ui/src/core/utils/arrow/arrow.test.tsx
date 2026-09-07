/** @vitest-environment jsdom */

import {describe, expect, it} from 'vitest'

import {render} from '../../../../test/utils'
import {Arrow} from './arrow'

describe('utils/arrow', () => {
  it('gives each instance a unique stroke mask id', () => {
    const {container} = render(
      <>
        <Arrow height={8} width={16} />
        <Arrow height={8} width={16} />
      </>,
    )

    const masks = container.querySelectorAll('mask')
    const ids = [...masks].map((mask) => mask.getAttribute('id'))

    expect(ids).toHaveLength(2)
    expect(ids[0]).toMatch(/^stroke-mask-/)
    expect(ids[1]).toMatch(/^stroke-mask-/)
    expect(ids[0]).not.toBe(ids[1])

    const strokePaths = container.querySelectorAll('path[mask]')
    const maskRefs = [...strokePaths].map((path) => path.getAttribute('mask'))

    expect(maskRefs).toEqual(ids.map((id) => `url(#${id})`))
  })
})
