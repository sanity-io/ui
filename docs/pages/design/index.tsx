import React from 'react'
import {Card, Heading} from '~/../ui/src'
import {AppLayout} from '~/components'

function DesignPage() {
  return (
    <AppLayout>
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[6, 7, 8, 9]}>
        <Heading size={[2, 3, 4, 5]} style={{textAlign: 'center'}}>
          Design
        </Heading>
      </Card>
    </AppLayout>
  )
}

export default DesignPage
