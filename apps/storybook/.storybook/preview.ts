import '../../../packages/ui/dist/styles.css'
import '../src/styles/storybook.css'
import type {Preview} from '@storybook/react-vite'

import {DocsThemeContainer} from '../src/components/DocsThemeContainer'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
    darkMode: {
      stylePreview: true,
      classTarget: 'html',
    },
    docs: {
      container: DocsThemeContainer,
    },
  },
}

export default preview
