import Head from 'next/head'
import React from 'react'
import {AppLayout, Article, Screen, SEO, useApp} from '$components'
import {PageLayout} from '$components'
import {features} from '$config'
import {buildNavMenu, getNavItems} from '$lib/nav'
import {loadPageData, loadPagePaths} from '$lib/page'
import {isArray, isRecord} from '$lib/types'

export async function getStaticProps(opts: {params?: {path?: string[]}; preview?: boolean}) {
  const {params = {}, preview = features.preview} = opts
  const data = await loadPageData({params, preview})

  return {props: {...data, params, preview}}
}

export async function getStaticPaths() {
  const paths = await loadPagePaths({preview: features.preview})

  return {paths, fallback: false}
}

export default function PathPage(props: {params: {path: string[]}}) {
  const {params = {path: []}} = props
  const {nav, target} = useApp()
  const seo: Record<string, any> | null = isRecord(target) ? (target.seo as any) : null
  const navValues: unknown[] = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const navItems = getNavItems(navValues)
  const navItem = navItems.find((i) => i.segment === params.path[0])
  const menu = navItem ? buildNavMenu(navItem) : null

  return (
    <>
      <Head>{isRecord(target) && <title>{target.title} – Sanity UI</title>}</Head>

      <SEO seo={seo} title={isRecord(target) && target.title} />

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
