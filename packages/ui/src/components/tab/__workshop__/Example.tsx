import {Box, Button, Card, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import {useState} from 'react'

import {CardWrapper} from '../../../../workshop'

export default function ExampleStory(): React.JSX.Element {
  const [tab, setTab] = useState('foo')

  const autoActivate = useBoolean('Auto activate')
  const useLongTitle = useBoolean('Use long title', false)

  const longTitle =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  const hasFocusableChildren = useBoolean('Has focusable children', false)

  return (
    <CardWrapper pattern="halftone" tone="transparent">
      <Card
        display="flex"
        flexDirection="column"
        overflow="hidden"
        radius={5}
        shadow={2}
        style={{minHeight: 300}}
      >
        <TabList autoActivate={autoActivate} flex="none" padding={3} shadow={1}>
          <Tab
            aria-controls="example-panel-foo"
            id="example-tab-foo"
            label="Foo"
            selected={tab === 'foo'}
            onActivate={() => setTab('foo')}
          />
          <Tab
            aria-controls="example-panel-bar"
            id="example-tab-bar"
            label="Bar"
            selected={tab === 'bar'}
            onActivate={() => setTab('bar')}
          />
          <Tab
            aria-controls="example-panel-baz"
            id="example-tab-baz"
            label={useLongTitle ? longTitle : 'Baz'}
            selected={tab === 'baz'}
            onActivate={() => setTab('baz')}
          />
        </TabList>

        <TabPanel
          aria-labelledby="example-panel-foo"
          display="flex"
          flex={1}
          flexDirection="column"
          gap={4}
          hidden={tab !== 'foo'}
          id="example-panel-foo"
          padding={4}
          style={{
            borderBottomLeftRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
            // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
            cornerShape: 'inherit',
          }}
        >
          <Text size={1}>
            The <strong>Foo</strong> tab panel
          </Text>

          {hasFocusableChildren && (
            <Box>
              <Button mode="ghost" text="Focusable child" />
            </Box>
          )}
        </TabPanel>

        <TabPanel
          aria-labelledby="example-panel-bar"
          display="flex"
          flex={1}
          flexDirection="column"
          gap={4}
          hidden={tab !== 'bar'}
          id="example-panel-bar"
          padding={4}
          style={{
            borderBottomLeftRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
            // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
            cornerShape: 'inherit',
          }}
        >
          <Text size={1}>
            The <strong>Bar</strong> tab panel
          </Text>

          {hasFocusableChildren && (
            <Box>
              <Button mode="ghost" text="Focusable child" />
            </Box>
          )}
        </TabPanel>

        <TabPanel
          aria-labelledby="example-panel-baz"
          display="flex"
          flex={1}
          flexDirection="column"
          gap={4}
          hidden={tab !== 'baz'}
          id="example-panel-baz"
          padding={4}
          style={{
            borderBottomLeftRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
            // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
            cornerShape: 'inherit',
          }}
        >
          <Text size={1}>
            The <strong>Baz</strong> tab panel
          </Text>

          {hasFocusableChildren && (
            <Box>
              <Button mode="ghost" text="Focusable child" />
            </Box>
          )}
        </TabPanel>
      </Card>
    </CardWrapper>
  )
}
