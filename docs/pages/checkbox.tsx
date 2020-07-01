import {AppLayout, CodeBlock} from '~/components'
import {Flex, Card, Stack, Checkbox} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'
function CheckboxPage() {
  const [items, setItems] = useState([
    {
      value: 'hello',
      checked: false,
    },
    {
      value: 'world',
      checked: undefined,
    },
    {
      value: 'hei',
      checked: false,
    },
    {
      value: 'verden',
      checked: undefined,
    },
  ])
  const handleChange = (index) => {
    const newItems = [...items]
    const item = newItems[index]
    item.checked = !item.checked
    setItems(newItems)
  }
  return (
    <>
      <Head>
        <title>Checkbox – Sanity UI</title>
      </Head>
      <AppLayout>
        <h1>Checkbox</h1>
        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent">
            <Flex>
              {items.map((item, index) => (
                <Card key={index} flex={1} tone="transparent">
                  <Checkbox
                    value={item.value}
                    checked={item.checked}
                    onChange={() => handleChange(index)}
                    name="checkbox-page"
                  />
                </Card>
              ))}
            </Flex>
          </Card>
          <CodeBlock>{`<Flex>
  {items.map((item, index) => (
    <Card key={index} flex={1} tone="transparent">
      <Checkbox
        value={item.value}
        checked={item.checked}
        onChange={() => handleChange(index)}
        name="checkbox-page"
      />
    </Card>
  ))}
</Flex>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}
export default CheckboxPage
