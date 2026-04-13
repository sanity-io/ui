import '@sanity/ui/css/index.css'

import {Root} from '@sanity/ui'
import type {Decorator} from '@storybook/react-vite'

export const UIDecorator: Decorator = (storyFn, context) => {
  const scheme = context['userGlobals'].theme || 'light'

  return (
    <Root as="div" padding={4} scheme={scheme} style={{height: '100vh'}} tone="default">
      {storyFn()}
    </Root>
  )
}
