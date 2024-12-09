import {ThemeColorSchemeKey} from '@sanity/ui'
import {memo, useMemo} from 'react'

import {WorkshopConfig, WorkshopPlugin} from './config'
import {EMPTY_ARRAY, EMPTY_RECORD} from './constants'
import {resolveLocation} from './helpers'
import {Pubsub} from './lib/pubsub'
import {propsPlugin} from './plugins/props'
import {WorkshopMsg} from './types'
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
  scheme: ThemeColorSchemeKey
  viewport?: string
  zoom?: number
}

/** @internal */
export const WorkshopProvider = memo(function WorkshopProvider(
  props: WorkshopProviderProps,
): React.ReactNode {
  const {
    broadcast,
    children,
    channel,
    config,
    frameReady,
    origin,
    path,
    payload,
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
        <Provider options={plugin.options || EMPTY_RECORD}>{wrappedChildren}</Provider>
      )
    }
  }

  return (
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
})

WorkshopProvider.displayName = 'Memo(WorkshopProvider)'
