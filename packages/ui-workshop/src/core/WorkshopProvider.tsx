import {useMemo} from 'react'

import type {WorkshopConfig, WorkshopPlugin} from './config/types'
import {EMPTY_ARRAY, EMPTY_RECORD} from './constants'
import {resolveLocation} from './helpers'
import {CommandsProvider} from './lib/commands'
import type {Pubsub} from './lib/pubsub'
import {propsPlugin} from './plugins/props/plugin'
import type {WorkshopMsg} from './types/msg'
import type {WorkshopColorScheme} from './types/scheme'
import {WorkshopContext} from './WorkshopContext'

/** @internal */
export interface WorkshopProviderProps {
  broadcast: (msg: WorkshopMsg) => void
  children?: React.ReactNode
  channel: Pubsub<WorkshopMsg>
  config: WorkshopConfig
  frameReady: boolean
  origin: 'frame' | 'main'
  path: string
  payload: Record<string, unknown>
  scheme: WorkshopColorScheme
  viewport?: string
  zoom?: number
  platform?: 'mac' | 'other'
}

/** @internal */
export function WorkshopProvider(props: WorkshopProviderProps) {
  const {
    broadcast,
    children,
    channel,
    config,
    frameReady,
    origin,
    path,
    payload,
    platform,
    scheme,
    viewport = 'auto',
    zoom = 1,
  } = props

  const {
    plugins: pluginsProp = EMPTY_ARRAY,
    collections = EMPTY_ARRAY,
    frameUrl = '/frame/',
    scopes,
    title = 'Workshop',
  } = config

  if (!payload) {
    throw new Error('missing `payload` property')
  }

  const plugins: WorkshopPlugin[] = useMemo(() => [propsPlugin(), ...pluginsProp], [pluginsProp])
  const {scope, story} = useMemo(() => resolveLocation(scopes, path), [path, scopes])

  let wrappedChildren = children
  for (const plugin of plugins) {
    if (plugin.provider) {
      const Provider = plugin.provider
      wrappedChildren = (
        <Provider options={plugin.options ?? EMPTY_RECORD}>{wrappedChildren}</Provider>
      )
    }
  }

  // Only create CommandsProvider in main window, not in iframe
  const content = (
    <WorkshopContext.Provider
      value={{
        plugins,
        broadcast,
        channel,
        collections,
        frameReady,
        frameUrl,
        origin,
        path,
        payload,
        scheme,
        scope,
        scopes,
        story,
        title,
        viewport,
        zoom,
      }}
    >
      {wrappedChildren}
    </WorkshopContext.Provider>
  )

  // Only wrap with CommandsProvider in main context, not in iframe
  if (origin === 'main') {
    return <CommandsProvider platform={platform}>{content}</CommandsProvider>
  }

  return content
}
