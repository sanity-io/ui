import {Card, Tab, TabList, TabPanel} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React, {useState} from 'react'
import {withCentered} from '$storybook/decorators'

export default {
  decorators: [withCentered, withKnobs],
  title: 'Components/Tab',
}

export const example = () => (
  <Card padding={3}>
    <TabsExample />
  </Card>
)

function TabsExample() {
  const [tab, setTab] = useState('foo')

  return (
    <>
      <TabList space={1}>
        <Tab
          aria-controls="example-panel-foo"
          id="example-tab-foo"
          label="Foo"
          onClick={() => setTab('foo')}
          selected={tab === 'foo'}
        />
        <Tab
          aria-controls="example-panel-bar"
          id="example-tab-bar"
          label="Bar"
          onClick={() => setTab('bar')}
          selected={tab === 'bar'}
        />
        <Tab
          aria-controls="example-panel-baz"
          id="example-tab-baz"
          label="Baz"
          onClick={() => setTab('baz')}
          selected={tab === 'baz'}
        />
      </TabList>
      <TabPanel aria-labelledby="example-panel-foo" id="example-panel-foo" hidden={tab !== 'foo'}>
        Foo
      </TabPanel>
      <TabPanel aria-labelledby="example-panel-bar" id="example-panel-bar" hidden={tab !== 'bar'}>
        Bar
      </TabPanel>
      <TabPanel aria-labelledby="example-panel-baz" id="example-panel-baz" hidden={tab !== 'baz'}>
        Baz
      </TabPanel>
    </>
  )
}
