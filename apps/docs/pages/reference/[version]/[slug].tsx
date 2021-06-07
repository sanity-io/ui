import {Box, Select} from '@sanity/ui'
import groq from 'groq'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'
import {AppLayout, useApp} from '$components/app'
import {PageLayout} from '$components/page'
import {ReferenceArticle} from '$components/reference'
import {features} from '$config'
import {loadReferencePageData} from '$lib/page'
import {isArray, isRecord, isString} from '$lib/types'
import {getClient} from '$sanity'

const PACKAGE_QUERY = groq`
  * [_type == "api.package" && name == $name] {
    releases[]->{
      version,
      members[]->{
        'slug': slug.current
      }
    }
  }[0]
`

export async function getStaticProps(opts: {
  params: {name?: string; version: string; slug: string}
  preview?: boolean
}) {
  const {params, preview = features.preview} = opts

  // @todo: remove this hard-coding
  params.name = '@sanity/ui'

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export async function getStaticPaths() {
  const params = {name: '@sanity/ui'}
  const data: unknown = await getClient(features.preview).fetch(PACKAGE_QUERY, params)
  const paths: {params: {version: string; slug: string}}[] = []
  const pkg = (isRecord(data) && data) || null

  if (pkg && isArray(pkg.releases)) {
    for (const release of pkg.releases) {
      if (isRecord(release) && isArray(release.members)) {
        for (const member of release.members) {
          if (isString(release.version) && isRecord(member) && isString(member.slug)) {
            paths.push({params: {version: release.version, slug: member.slug}})
          }
        }
      }
    }
  }

  return {paths, fallback: false}
}

function ReferenceArticlePage({params}: any) {
  const {data, menu} = useApp()
  const {push: pushState} = useRouter()
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const release = pkg?.release
  const currentMember =
    (isRecord(release) && isRecord(release.currentMember) && release.currentMember) || null
  const releases = pkg && isArray(pkg.releases) ? pkg.releases : []

  const handleVersionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      pushState({
        pathname: `/reference/${event.currentTarget.value}`,
      })
    },
    [pushState]
  )

  const menuHeader = (
    <Box padding={[3, 4, 5]} style={{borderBottom: '1px solid var(--card-border-color)'}}>
      <Select onChange={handleVersionChange} value={params.version}>
        {releases &&
          releases.map((release: any) => (
            <option key={release.version} value={release.version}>
              v{release.version}
            </option>
          ))}
      </Select>
    </Box>
  )

  return (
    <AppLayout>
      <Head>
        {currentMember && (
          <title>
            {currentMember.name} – v{params.version} – Sanity UI
          </title>
        )}
      </Head>

      <PageLayout menu={menu} menuHeader={menuHeader}>
        {currentMember && <ReferenceArticle data={currentMember} />}
      </PageLayout>
    </AppLayout>
  )
}

export default ReferenceArticlePage
