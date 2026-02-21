import {Box, Card, Code, Portal, PortalProvider, Root, Text, usePrefersDark} from '@sanity/ui'
import {useState} from 'react'

import {CardWrapper} from '$workshop'

export default function ToneInheritanceStory() {
  const dark = usePrefersDark()
  const [cardPortal, setCardPortal] = useState<HTMLDivElement | null>(null)

  return (
    <CardWrapper pattern="halftone" tone="transparent">
      <Root as="div" radius={4} scheme={dark ? 'dark' : 'light'} shadow={4}>
        <Box padding={4}>
          <Code language="jsx" size={1}>{`<Root
  scheme=${JSON.stringify(dark ? 'dark' : 'light')}
  tone="transparent"
/>`}</Code>

          <PortalProvider element={cardPortal}>
            <Card
              marginTop={4}
              radius={4}
              scheme={dark ? 'light' : 'dark'}
              shadow={1}
              tone="suggest"
            >
              <Box padding={4}>
                <Code language="jsx" size={1}>{`<Card
  scheme=${JSON.stringify(dark ? 'light' : 'dark')}
  tone="suggest"
/>`}</Code>
              </Box>
              <Portal>
                <Card
                  padding={4}
                  radius={4}
                  shadow={1}
                  // tone="critical"
                >
                  <Text muted size={1}>
                    Card in portal (card)
                  </Text>
                </Card>
              </Portal>
              <div ref={setCardPortal} />
            </Card>
          </PortalProvider>
        </Box>

        <Portal>
          <Card
            padding={4}
            radius={4}
            shadow={1}
            // tone="critical"
          >
            <Text muted size={1}>
              Card in portal (root)
            </Text>
          </Card>
        </Portal>
      </Root>
    </CardWrapper>
  )
}
