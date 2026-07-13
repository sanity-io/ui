'use client'

import {PropsWithChildren, useMemo} from 'react'

import {AppContext, AppContextValue} from '@/app/AppContext'
import {useApp} from '@/app/useApp'
import {NavData, SettingsData} from '@/lib/data'
import {parseNav} from '@/lib/nav'

/**
 * Overrides the global `AppContext` with the Sanity-fetched nav and settings,
 * so website components can keep reading them through `useApp()`.
 */
export function AppDataProvider(
  props: PropsWithChildren<{nav: NavData | null; settings: SettingsData | null}>,
) {
  const {children, nav: navData, settings} = props
  const app = useApp()

  const nav = useMemo(() => (navData ? parseNav(navData, []) : null), [navData])

  const value: AppContextValue = useMemo(() => ({...app, nav, settings}), [app, nav, settings])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
