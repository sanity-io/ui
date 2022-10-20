import {ThemeColorSchemeKey} from '@sanity/ui'
import {createElement, memo, useMemo} from 'react'
import {WorkshopConfig, WorkshopPlugin} from './config'
import {EMPTY_ARRAY} from './constants'
import {resolveLocation} from './helpers'
import {Pubsub} from './lib/pubsub'
import {propsPlugin} from './plugins/props'
import {WorkshopMsg} from './types'
import {WorkshopContext, WorkshopContextValue} from './WorkshopContext'

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
  props: WorkshopProviderProps
): React.ReactElement {
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

  const workshop: WorkshopContextValue = useMemo(
    () => ({
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
    }),
    [
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
    ]
  )

  let wrappedChildren = children

  for (const plugin of plugins) {
    if (plugin.provider) {
      wrappedChildren = createElement(plugin.provider, {}, wrappedChildren)
    }
  }

  return <WorkshopContext.Provider value={workshop}>{wrappedChildren}</WorkshopContext.Provider>
})
