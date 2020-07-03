import {AppLayout, CodeBlock} from '~/components'
import {Card, Stack, Switch} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'
function SwitchPage() {
  const [checked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked(!checked)
  }
  return (
    <>
      <Head>
        <title>Switch – Sanity UI</title>
      </Head>
      <AppLayout>
        <h1>Switch</h1>
        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent">
            <Switch checked={checked} onChange={handleChange} />
          </Card>
          <CodeBlock>{`<Card padding={3} radius={2} tone="transparent">
  <Switch checked={checked} onChange={handleChange} />
</Card>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}
export default SwitchPage
