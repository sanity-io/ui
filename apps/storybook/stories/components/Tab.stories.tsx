import {OkHandIcon} from '@sanity/icons/OkHand'
import {RocketIcon} from '@sanity/icons/Rocket'
import {SearchIcon} from '@sanity/icons/Search'
import {SunIcon} from '@sanity/icons/Sun'
import {Box, Card, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'

import {BUTTON_TONES} from '../constants'
import {getFontSizeControls, getIconControls, getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Tab> = {
  args: {
    label: 'Example tab',
  },
  argTypes: {
    fontSize: getFontSizeControls('text'),
    icon: getIconControls(),
    padding: getSpaceControls(),
  },
  component: Tab,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tab>

export const Default: Story = {
  render: (props) => {
    return <Tab {...props} />
  },
}

export const LongLabel: Story = {
  args: {
    label:
      'Duis at est eget nisi placerat scelerisque. Sed gravida bibendum est a egestas. Nam ac lacinia ipsum. Maecenas sit amet eros a velit fermentum malesuada et vitae dui. Etiam molestie erat dui, id consequat justo imperdiet volutpat. Phasellus viverra consectetur lacus a condimentum. Pellentesque scelerisque enim lorem, vitae tempus quam bibendum sed. Nullam eu ante non lectus placerat viverra. Morbi suscipit ornare tristique. Ut consequat, nisl quis sagittis eleifend, nibh enim eleifend ex, et consectetur arcu orci a velit. Etiam in odio eget augue consequat finibus eu a tortor.',
  },
  render: (props) => {
    return <Tab {...props} />
  },
}

export const Selected: Story = {
  args: {
    selected: true,
  },
  render: (props) => {
    return <Tab {...props} />
  },
}

export const Tones: Story = {
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => <Tab {...props} key={value} label={value} tone={value} />,
        rows: BUTTON_TONES,
      })}
    </>
  ),
}

export const WithIcon: Story = {
  args: {
    icon: SearchIcon,
  },
  render: (props) => {
    return <Tab {...props} />
  },
}

function ExampleStory() {
  const [tab, setTab] = useState('foo')

  return (
    <Box padding={[4, 5, 6]}>
      {/* oxlint-disable-next-line no-deprecated */}
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
          label="Baz"
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

export const Example: Story = {
  parameters: {controls: {include: []}},
  render: () => <ExampleStory />,
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument
    const el = (id: string) => doc.getElementById(id)

    await step('should use keys to navigate tabs', async () => {
      await userEvent.click(el('example-tab-foo')!)
      await userEvent.keyboard('{ArrowRight}')

      await waitFor(() => expect(el('example-tab-bar')).toHaveFocus())
      await userEvent.keyboard('{ArrowRight}')

      await waitFor(() => expect(el('example-tab-baz')).toHaveFocus())
      await userEvent.keyboard('{ArrowRight}')

      await waitFor(() => expect(el('example-tab-foo')).toHaveFocus())

      // Trigger "Tab"
      await userEvent.tab()

      // Expect the panel to be focused
      await waitFor(() => expect(el('example-panel-foo')).toHaveFocus())
    })
  },
}
