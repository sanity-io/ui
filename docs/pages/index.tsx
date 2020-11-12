import {Card, Heading} from '@sanity/ui'
import React from 'react'
import {AppLayout} from '$components'

function IndexPage() {
  return (
    <AppLayout>
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[6, 7, 8, 9]}>
        <Heading size={[2, 3, 4, 5]} style={{textAlign: 'center'}}>
          Index
        </Heading>
      </Card>
    </AppLayout>
  )
}

export default IndexPage
