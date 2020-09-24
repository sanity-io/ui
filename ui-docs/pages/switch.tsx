import {AppLayout, CodeBlock} from '~/components'
import {Card, Heading, Inline, Stack, Switch} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'

function SwitchExample(props: {checked?: boolean}) {
  const [checked, setChecked] = useState(props.checked)

  const handleChange = () => {
    setChecked(!checked)
  }

  return <Switch checked={checked} onChange={handleChange} style={{verticalAlign: 'top'}} />
}

function SwitchPage() {
  return (
    <>
      <Head>
        <title>Switch – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={4}>
          <Heading>Switch</Heading>

          <Card padding={3} radius={2} tone="transparent" style={{textAlign: 'center'}}>
            <Inline space={2}>
              <SwitchExample checked />
              <SwitchExample checked={false} />
              <SwitchExample />
            </Inline>
          </Card>
          <CodeBlock>{`<Inline space={2}>
  <Switch checked />
  <Switch checked={false} />
  <Switch />
</Inline>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}
export default SwitchPage
