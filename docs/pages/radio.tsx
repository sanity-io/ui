import {AppLayout, CodeBlock} from '~/components'
import {Flex, Card, Stack, Radio} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'
function RadioPage() {
  const [value, setValue] = useState('hello')
  const items = ['hello', 'world', 'hei', 'verden']
  const handleChange = (e) => {
    setValue(e.currentTarget.value)
  }
  return (
    <>
      <Head>
        <title>Radio – Sanity UI</title>
      </Head>
      <AppLayout>
        <h1>Radio</h1>
        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent">
            <Flex>
              {items.map((item, index) => (
                <Card key={index} flex={1} tone="transparent">
                  <Radio
                    value={item}
                    checked={item === value}
                    onChange={handleChange}
                    name="radio-page"
                  />
                </Card>
              ))}
            </Flex>
          </Card>
          <CodeBlock>{`<Flex>
  {items.map((item, index) => (
    <Card key={index} flex={1} tone="transparent">
      <Radio
        value={item}
        checked={item === value}
        onChange={handleChange}
        name="radio-page"
      />
    </Card>
  ))}
</Flex>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}
export default RadioPage
