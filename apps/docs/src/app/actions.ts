'use server'

import {cookies, draftMode} from 'next/headers'

export async function disableDraftMode() {
  const disable = (await draftMode()).disable()
  const delay = new Promise((resolve) => setTimeout(resolve, 1000))

  // delete `env` cookie
  ;(await cookies()).delete('env')

  await Promise.allSettled([disable, delay])
}
