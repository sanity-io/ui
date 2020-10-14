import {Button, Card, Heading, Inline, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout, CodeBlock} from '~/components'

function ButtonPage() {
  return (
    <>
      <Head>
        <title>Button – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Button
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Inline space={[3, 3, 4, 5]}>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} text="Label" />
              <Button
                icon="publish"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="brand"
              />
            </Inline>
          </Card>

          <CodeBlock>{`<Inline space={[3, 3, 4, 5]}>
  <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} text="Label" />
  <Button
    icon="publish"
    padding={[3, 3, 4]}
    size={[2, 2, 3, 4]}
    text="Label"
    tone="brand"
  />
</Inline>`}</CodeBlock>

          <Stack space={[3, 3, 4, 5]}>
            <Inline space={[3, 3, 4, 5]}>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} text="Label"></Button>
              <Button
                icon="publish"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="brand"
              ></Button>
              <Button
                icon="publish"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="positive"
              ></Button>
              <Button
                icon="publish"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="caution"
              />
              <Button
                icon="publish"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="critical"
              />
            </Inline>

            <Inline space={[3, 3, 4, 5]}>
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
              />
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="brand"
              />
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="positive"
              />
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="caution"
              />
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="critical"
              />
            </Inline>

            <Inline space={[3, 3, 4, 5]}>
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
              />
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="brand"
              />
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="positive"
              />
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="caution"
              />
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                text="Label"
                tone="critical"
              />
            </Inline>
          </Stack>
        </Stack>
      </AppLayout>
    </>
  )
}

export default ButtonPage
