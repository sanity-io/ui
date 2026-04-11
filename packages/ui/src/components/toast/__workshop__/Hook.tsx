import {Box, Button, Inline, ToastProvider, useToast} from '@sanity/ui'

export default function HookStory(): React.JSX.Element {
  const toast = useToast()

  return (
    <ToastProvider>
      <Box padding={[4, 5, 6]}>
        <Inline gap={2}>
          <Button
            text="Push info"
            tone="neutral"
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
          />

          <Button
            text="Push warning"
            tone="caution"
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Warning',
                status: 'warning',
              })
            }
          />

          <Button
            text="Push error"
            tone="critical"
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Error',
                status: 'error',
              })
            }
          />

          <Button
            text="Push some message"
            onClick={() =>
              toast.push({
                // id: 'status',
                closable: true,
                title: 'Some message',
                // status: 'error',
              })
            }
          />
        </Inline>
      </Box>
    </ToastProvider>
  )
}
