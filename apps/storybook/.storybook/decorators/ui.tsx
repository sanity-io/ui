import {PortalProvider, Root} from '@sanity/ui'
import type {Decorator} from '@storybook/react-vite'
import {useState} from 'react'

export const UIDecorator: Decorator = (storyFn, context) => {
  const scheme = context['userGlobals'].theme || 'light'

  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <PortalProvider element={portalElement}>
      <Root as="div" padding={4} scheme={scheme} style={{height: '100vh'}} tone="default">
        {storyFn()}
        <div ref={setPortalElement} />
      </Root>
    </PortalProvider>
  )
}
