import {PortalProvider, Root} from '@sanity/ui'
import {Decorator} from '@storybook/react-vite'
import {useState} from 'react'

import {ThemeColorSchemeKey} from '../../../dist/theme'

export const UIDecorator: Decorator = (storyFn, context) => {
  const scheme = (context.userGlobals.theme || 'light') as ThemeColorSchemeKey

  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <PortalProvider element={portalElement}>
      <Root as="div" padding={4} scheme={scheme} tone="default">
        {storyFn()}
        <div ref={setPortalElement} />
      </Root>
    </PortalProvider>
  )
}
