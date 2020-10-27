import {axe} from 'jest-axe'
import React from 'react'
import {render} from '../../../test'
import {Button} from './button'

describe('atoms/button', () => {
  it('should have no violations (axe)', async () => {
    const result = render(<Button icon="add" text="Label" tone="positive" />)

    expect(await axe(result.container.outerHTML)).toHaveNoViolations()
  })
})
