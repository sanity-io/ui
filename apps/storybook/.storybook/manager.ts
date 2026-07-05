import {addons} from '@storybook/manager-api'
import {themes} from '@storybook/theming'

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'Sanity UI',
    fontBase:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif',
  },
})
