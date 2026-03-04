import {defineEnableDraftMode} from 'next-sanity/draft-mode'
import {cookies} from 'next/headers'

import {getContext} from '@/app/context'
import {AppEnv} from '@/app/types'

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const env = (url.searchParams.get('env') ?? 'production') as AppEnv

  // set `env` cookie
  ;(await cookies()).set('env', env)

  const {client} = await getContext(undefined)

  return defineEnableDraftMode({client}).GET(request)
}
