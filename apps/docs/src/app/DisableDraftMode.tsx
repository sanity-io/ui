'use client'

import {Box, Button, Layer, Text} from '@sanity/ui'
import {useRouter} from 'next/navigation'
import {startTransition, useEffect, useState, useTransition} from 'react'

import {disableDraftMode} from '@/app/actions'
import {CloseIcon, EarthGlobeIcon, EyeOpenIcon} from '@sanity/icons'
import {useApp} from './useApp'
import {vars} from '@sanity/ui/css'

function isInIframeSafe() {
  try {
    return window.self !== window.top
  } catch {
    // Cross-origin access to window.top can throw; treat as iframed
    return true
  }
}

export function DisableDraftMode() {
  const {env, perspective} = useApp()
  const router = useRouter()
  const [draftModePending, startDraftModeTransition] = useTransition()
  const [isIframe, setIsIframe] = useState<boolean | null>(null)

  useEffect(() => {
    startTransition(() => {
      setIsIframe(isInIframeSafe())
    })
  }, [])

  if (isIframe === null || isIframe === true) return null

  if (draftModePending) return null

  const disable = () => {
    startDraftModeTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })
  }

  return (
    <Layer
      display="flex"
      position="fixed"
      insetBottom={0}
      insetLeft={0}
      margin={4}
      overflow="hidden"
      shadow={2}
      radius={4}
      tone="suggest"
      zOffset={10000}
    >
      <Box
        shadow={1}
        display="flex"
        gap={2}
        flex="none"
        padding={3}
        style={{
          backgroundColor: vars.color.bg,
        }}
      >
        <Text size={1}>
          <EarthGlobeIcon />
        </Text>
        <Text size={1}>{env}</Text>
      </Box>
      <Box
        shadow={1}
        display="flex"
        gap={2}
        flex="none"
        padding={3}
        style={{
          backgroundColor: vars.color.bg,
        }}
      >
        <Text size={1}>
          <EyeOpenIcon />
        </Text>
        <Text size={1}>{Array.isArray(perspective) ? perspective.join(', ') : perspective}</Text>
      </Box>
      <Box flex="none" padding={1}>
        <Button
          flex="none"
          icon={CloseIcon}
          mode="bleed"
          onClick={disable}
          padding={2}
          tooltip={{text: 'Exit draft mode'}}
        />
      </Box>
    </Layer>
  )
}
