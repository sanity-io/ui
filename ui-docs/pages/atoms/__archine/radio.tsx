import {Card, Heading, Inline, Radio, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'
import {AppLayout, CodeBlock} from '~/components'

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
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Radio
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Stack space={[3, 3, 4, 5]}>
              {items.map((item, index) => (
                <Inline as="label" key={index} space={3}>
                  <Radio
                    checked={item === value}
                    name="greeting"
                    onChange={handleChange}
                    style={{verticalAlign: 'top'}}
                    value={item}
                  />
                  <Text size={[2, 2, 3, 4]}>{item}</Text>
                </Inline>
              ))}

              <Text size={[2, 2, 3, 4]}>
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
