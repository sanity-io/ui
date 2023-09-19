import {Controls, Description, Primary, Subtitle, Title} from '@storybook/blocks'
import React from 'react'

/**
 * Customised docs page with `<Stories>` removed.
 * https://storybook.js.org/docs/react/writing-docs/autodocs#customize-the-docs-container
 */
export const DocsPage = () => {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}
