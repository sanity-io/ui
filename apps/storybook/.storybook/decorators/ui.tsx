import {PortalProvider, Root} from '@sanity/ui'
import {ColorScheme} from '@sanity/ui/theme'
import {Decorator} from '@storybook/react-vite'
import {useState} from 'react'

export const UIDecorator: Decorator = (storyFn, context) => {
  const scheme = (context.userGlobals.theme || 'light') as ColorScheme

  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <PortalProvider element={portalElement}>
      <Root as="div" padding={4} scheme={scheme} tone="default" style={{height: '100vh'}}>
        {storyFn()}
        <div ref={setPortalElement} />
      </Root>
    </PortalProvider>
  )
}
