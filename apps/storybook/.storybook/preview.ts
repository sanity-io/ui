import '../../../packages/ui/dist/styles.css'
import '../src/styles/storybook.css'
import type {Preview} from '@storybook/react-vite'

import {
  GLOBAL_BENCHMARK_KEY,
  GLOBAL_COUNT_KEY,
  PERFORMANCE_COUNT_OPTIONS,
} from '../src/addons/performance/constants'
import {withProfiler} from '../src/addons/performance/withProfiler'
import {DocsThemeContainer} from '../src/components/DocsThemeContainer'

const preview: Preview = {
  decorators: [withProfiler],
  initialGlobals: {
    [GLOBAL_BENCHMARK_KEY]: 0,
    [GLOBAL_COUNT_KEY]: PERFORMANCE_COUNT_OPTIONS[0],
  },
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
