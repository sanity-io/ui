import {AppLayout, CodeBlock} from '~/components'
import {Card, Heading, Inline, Radio, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'

function RadioPage() {
  const [value, setValue] = useState('Hello, world')
  const items = ['Hello, world!', 'Hei, verden!', 'Witaj świecie!']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <>
      <Head>
        <title>Radio – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={4}>
          <Heading>Radio</Heading>

          <Card padding={3} radius={2} tone="transparent">
            <Stack space={3}>
              {items.map((item, index) => (
                <Inline as="label" key={index} space={3}>
                  <Radio
                    checked={item === value}
                    name="greeting"
                    onChange={handleChange}
                    style={{verticalAlign: 'top'}}
                    value={item}
                  />
                  <Text>{item}</Text>
                </Inline>
              ))}

              <Text>
                <strong>Current value</strong>: <code>{value}</code>
              </Text>
            </Stack>
          </Card>

          <CodeBlock>{`{items.map((item, index) => (
  <Inline as="label" key={index} space={3}>
    <Radio
      checked={item === value}
      name="greeting"
      onChange={handleChange}
      style={{verticalAlign: 'top'}}
      value={item}
    />
    <Text>{item}</Text>
  </Inline>
))}

<Text>
  <strong>Current value</strong>: <code>{value}</code>
</Text>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}
export default RadioPage
