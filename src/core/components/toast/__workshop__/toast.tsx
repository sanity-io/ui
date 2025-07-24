import {Box, Container, Toast} from '@sanity/ui'
import {useAction, useBoolean, useSelect, useString, useText} from '@sanity/ui-workshop'

import {WORKSHOP_TOAST_STATUS_OPTIONS} from '$workshop'

export default function ToastStory(): React.JSX.Element {
  const closable = useBoolean('Closable', false)
  const title = useString('Title', 'Toast title')
  const status = useSelect('Status', WORKSHOP_TOAST_STATUS_OPTIONS)
  const description = useText('Description')
  const handleClose = useAction('onClose')

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={0}>
        <Toast
          closable={closable}
          description={description}
          onClose={handleClose}
          status={status}
          title={title}
        />
      </Container>
    </Box>
  )
}
