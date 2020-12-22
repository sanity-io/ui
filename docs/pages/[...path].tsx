import Head from 'next/head'
import React from 'react'
import {AppLayout, Article, Screen, SEO, useApp} from '$components'
import {PageLayout} from '$components'
import {features} from '$config'
import {loadPageData, loadPagePaths} from '$lib/page'
import {isArray, isRecord} from '$lib/types'
import {ArcadeScreen} from '$screens/arcade'

export async function getStaticProps(opts: {params?: {path?: string[]}; preview?: boolean}) {
  const {params = {}, preview = features.preview} = opts
  const data = await loadPageData({params, preview})

  return {props: {...data, params, preview}}
}

export async function getStaticPaths() {
  const paths = await loadPagePaths({preview: features.preview})

  return {paths, fallback: false}
}

function getArcade(target: unknown): any | null {
  if (!isRecord(target)) return null

  if (target._type !== 'screen') {
    return null
  }

  if (!isArray(target.sections)) {
    return null
  }

  const firstSection = target.sections[0]

  if (isRecord(firstSection) && firstSection._type === 'screenSection.arcade') {
    return firstSection
  }

  return null
}

export default function PathPage() {
  const {menu, target} = useApp()
  const seo: Record<string, any> | null = isRecord(target) ? (target.seo as any) : null
  const arcade = getArcade(target)

  if (arcade) {
    return (
      <AppLayout>
        <ArcadeScreen />
      </AppLayout>
    )
  }

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
