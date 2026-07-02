import {render} from '@testing-library/react'
import {createRef} from 'react'
import {expect, test} from 'vitest'

import {RocketIcon} from './exports/Rocket'
import {Icon} from './icon'

test('should render svg', () => {
  const {container} = render(<Icon symbol="rocket" />)

  expect(container.querySelector('svg[data-sanity-icon="rocket"]')).toBeInTheDocument()
})

test('should forward a ref to the underlying svg element', () => {
  const ref = createRef<SVGSVGElement>()

  render(<RocketIcon ref={ref} />)

  expect(ref.current).toBeInstanceOf(SVGSVGElement)
  expect(ref.current).toHaveAttribute('data-sanity-icon', 'rocket')
})

test('should forward a ref through the Icon wrapper', () => {
  const ref = createRef<SVGSVGElement>()

  render(<Icon symbol="rocket" ref={ref} />)

  expect(ref.current).toBeInstanceOf(SVGSVGElement)
  expect(ref.current).toHaveAttribute('data-sanity-icon', 'rocket')
})
