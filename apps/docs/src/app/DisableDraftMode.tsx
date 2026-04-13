'use client'

import {useRouter} from 'next/navigation'
import {useTransition} from 'react'

import {disableDraftMode} from '@/app/actions'

export function DisableDraftMode() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  if (window !== window.parent || !!window.opener) {
    return null
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })

  return (
    <div>
      {pending ? (
        'Disabling draft mode...'
      ) : (
        <button type="button" onClick={disable}>
          Disable draft mode
        </button>
      )}
    </div>
  )
}
