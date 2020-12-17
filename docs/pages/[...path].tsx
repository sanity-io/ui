import Head from 'next/head'
import React from 'react'
import {AppLayout, Article, Screen, useApp} from '$components'
import {PageLayout} from '$components'
import {PREVIEW} from '$features'
import {buildNavMenu, getNavItems} from '$lib/nav'
import {loadPageData, loadPagePaths} from '$lib/page'
import {isArray, isRecord} from '$lib/types'

export async function getStaticProps(opts: {params?: {path?: string[]}; preview?: boolean}) {
  const {params = {}, preview = PREVIEW} = opts
  const data = await loadPageData({params, preview})

  return {props: {...data, params, preview}}
}

export async function getStaticPaths() {
  const paths = await loadPagePaths({preview: PREVIEW})

  return {paths, fallback: false}
}

export default function PathPage(props: {params: {path: string[]}}) {
  const {params = {path: []}} = props
  const {nav, target} = useApp()
  const navValues: unknown[] = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const navItems = getNavItems(navValues)
  const navItem = navItems.find((i) => i.segment === params.path[0])
  const menu = navItem ? buildNavMenu(navItem) : null

  return (
    <>
      <Head>
        {isRecord(target) && <title>{target.title} – Sanity UI</title>}
        {!target && 'Missing target – Sanity UI'}
      </Head>

      <AppLayout>
        {isRecord(target) && target._type === 'article' && (
          <PageLayout menu={menu} {...(target.layout || {})}>
            <Article article={target} />
          </PageLayout>
        )}

        {isRecord(target) && target._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}
