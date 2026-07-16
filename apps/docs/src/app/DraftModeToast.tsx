'use client'

import {Box, Button, useToast, type ToastParams} from '@sanity/ui'
import {useIsPresentationTool} from 'next-sanity/hooks'
import {useEffect, useEffectEvent, useTransition} from 'react'

export default function DraftModeToast({action}: {action: () => Promise<void>}) {
  const isPresentationTool = useIsPresentationTool()
  const toast = useToast()
  const [isPending, startTransition] = useTransition()
  const handleClose = useEffectEvent(() => startTransition(() => action()))

  useEffect(() => {
    /**
     * We don't want to show the toast if we're inside the Presentation Tool iframe or a preview popup window.
     * `useIsPresentationTool` is `null` initially, and then `false` when it's determined that we're not in Presentation Tool
     */
    if (isPresentationTool === false && !isPending) {
      const params = {
        closable: true,
        id: 'draft-mode-toast',
        duration: Infinity,
        title: 'Draft Mode Enabled',
        description: (
          <Box paddingTop={2}>
            <Button gap={3} padding={3} onClick={handleClose} text="Disable" tone="primary" />
          </Box>
        ),
      } satisfies ToastParams
      toast.push(params)

      return () => {
        // Based on useConditionalToast in the sanity codebase, we really need a better way to handle this
        toast.push({
          ...params,
          // Note: @sanity/ui fallbacks to the default duration of 4s in case of falsey values
          duration: 0.01,
        })
      }
    }
    return undefined
  }, [toast, isPresentationTool, isPending])

  return null
}
