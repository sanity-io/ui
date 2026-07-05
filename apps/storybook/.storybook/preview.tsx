import type {Preview} from '@storybook/react-vite'
import {registerLanguage} from 'react-refractor'
import javascript from 'refractor/javascript'
import json from 'refractor/json'
import jsx from 'refractor/jsx'
import typescript from 'refractor/typescript'
import {themes} from 'storybook/theming'

import {withSanityTheme} from './decorators/withSanityTheme.decorator'

registerLanguage(javascript)
registerLanguage(json)
registerLanguage(jsx)
registerLanguage(typescript)

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
