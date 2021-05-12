import {AddIcon} from '@sanity/icons'
import {screen} from '@testing-library/react'
import {axe} from 'jest-axe'
import React from 'react'
import {render} from '../../../test'
import {Button} from './button'

describe('atoms/button', () => {
  it('should have no violations (axe)', async () => {
    const lightResult = render(<Button icon={AddIcon} text="Label" tone="positive" />, {
      scheme: 'light',
    })

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Button icon={AddIcon} text="Label" tone="positive" />, {
      scheme: 'dark',
    })

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render text', () => {
    render(<Button text="Button text" />)

    expect(screen.getByText('Button text')).toBeInTheDocument()
  })
})
