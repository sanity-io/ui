import {OkHandIcon, RocketIcon, SunIcon} from '@sanity/icons'
import {Box, Card, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import {useState} from 'react'

export default function ExampleStory() {
  const [tab, setTab] = useState('foo')
  const useLongTitle = useBoolean('Use long title', false, 'Props') || false

  const longTitle =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  return (
    <Box padding={[4, 5, 6]}>
      <TabList space={[1, 2, 3]}>
        <Tab
          aria-controls="example-panel-foo"
          icon={SunIcon}
          id="example-tab-foo"
          label="Foo"
          onClick={() => setTab('foo')}
          selected={tab === 'foo'}
        />
        <Tab
          aria-controls="example-panel-bar"
          icon={RocketIcon}
          id="example-tab-bar"
          label="Bar"
          onClick={() => setTab('bar')}
          selected={tab === 'bar'}
        />
        <Tab
          aria-controls="example-panel-baz"
          icon={OkHandIcon}
          id="example-tab-baz"
          label={useLongTitle ? longTitle : 'Baz'}
          onClick={() => setTab('baz')}
          selected={tab === 'baz'}
        />
      </TabList>
      <TabPanel
        aria-labelledby="example-panel-foo"
        hidden={tab !== 'foo'}
        id="example-panel-foo"
        marginTop={[3, 4, 5]}
      >
        <Card border padding={3}>
          <Text>
            This is the <strong>Foo</strong> panel
          </Text>
        </Card>
      </TabPanel>
      <TabPanel
        aria-labelledby="example-panel-bar"
        hidden={tab !== 'bar'}
        id="example-panel-bar"
        marginTop={[3, 4, 5]}
      >
        <Card border padding={3}>
          <Text>
            This is the <strong>Bar</strong> panel
          </Text>
        </Card>
      </TabPanel>
      <TabPanel
        aria-labelledby="example-panel-baz"
        hidden={tab !== 'baz'}
        id="example-panel-baz"
        marginTop={[3, 4, 5]}
      >
        <Card border padding={3}>
          <Text>
            This is the <strong>Baz</strong> panel
          </Text>
        </Card>
      </TabPanel>
    </Box>
  )
}
