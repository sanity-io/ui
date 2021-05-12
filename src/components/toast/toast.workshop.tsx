import {Box, Button, Container, Inline, Toast, ToastProvider, useToast} from '@sanity/ui'
import {
  defineScope,
  useAction,
  useBoolean,
  useSelect,
  useString,
  useText,
} from '@sanity/ui-workshop'
import React from 'react'

const STATUS_OPTIONS: {[key: string]: 'error' | 'success' | 'warning' | 'info' | ''} = {
  None: '',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
}

export default defineScope('components/toast', 'Toast', [
  {name: 'toast', title: 'Toast', component: ToastStory},
  {name: 'hook', title: 'Hook', component: HookStory},
])

function ToastStory() {
  const closable = useBoolean('Closable', false, 'Props')
  const title = useString('Title', 'Toast title', 'Props')
  const status = useSelect('Status', STATUS_OPTIONS, '', 'Props') || undefined
  const description = useText('Description', '', 'Props')
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

function HookStory() {
  const toast = useToast()

  return (
    <ToastProvider>
      <Box padding={[4, 5, 6]}>
        <Inline space={2}>
          <Button
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Information',
                status: 'info',
                description: (
                  <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus
                    pellentesque luctus. Curabitur sed tortor a elit tempus malesuada. Quisque sed
                    dapibus ligula, id pulvinar nisl.
                  </>
                ),
              })
            }
            text="Push info"
            tone="primary"
          />

          <Button
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Warning',
                status: 'warning',
              })
            }
            text="Push warning"
            tone="caution"
          />

          <Button
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Error',
                status: 'error',
              })
            }
            text="Push error"
            tone="critical"
          />

          <Button
            onClick={() =>
              toast.push({
                // id: 'status',
                closable: true,
                title: 'Some message',
                // status: 'error',
              })
            }
            text="Push some message"
          />
        </Inline>
      </Box>
    </ToastProvider>
  )
}
