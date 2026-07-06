import type {Preview} from '@storybook/react-vite'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {themes} from 'storybook/theming'

import {withSanityTheme} from './decorators/withSanityTheme.decorator'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

const preview: Preview = {
  decorators: [
    withSanityTheme({
      themes: {light: 'light', dark: 'dark'},
      defaultTheme: 'dark',
    }),
  ],
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    backgrounds: {disabled: true},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: {
        ...themes.dark,
        fontBase: 'Inter, sans-serif',
      },
    },
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['primitives', 'components', 'hooks', 'utils', 'theme', '*'],
      },
    },
  },
}

export default preview
