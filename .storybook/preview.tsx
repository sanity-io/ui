import type {Preview} from '@storybook/react'
import {themes} from '@storybook/theming'
import {withSanityTheme} from './decorators/withSanityTheme.decorator'

const preview: Preview = {
  decorators: [
    withSanityTheme({
      themes: {light: 'light', dark: 'dark'},
      defaultTheme: 'dark',
    }),
  ],
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    backgrounds: {disable: true},
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
        order: ['primitives', 'components', '*'],
      },
    },
  },
}

export default preview
