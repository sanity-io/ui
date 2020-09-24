import {AppLayout, CodeBlock} from '~/components'
import {Card, Checkbox, Heading, Inline, Stack} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'

function CheckboxExample(props: {checked?: boolean; value?: string}) {
  const [checked, setChecked] = useState(props.checked)

  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      value={props.value}
      style={{verticalAlign: 'top'}}
    />
  )
}

function CheckboxPage() {
  return (
    <>
      <Head>
        <title>Checkbox – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={4}>
          <Heading>Checkbox</Heading>

          <Card padding={3} radius={2} tone="transparent" style={{textAlign: 'center'}}>
            <Inline space={2}>
              <CheckboxExample checked />
              <CheckboxExample checked={false} />
              <CheckboxExample />
            </Inline>
          </Card>

          <CodeBlock>{`<Inline space={2}>
  <Checkbox checked />
  <Checkbox checked={false} />
  <Checkbox />
</Inline>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default CheckboxPage
