import {Select, Stack} from '@sanity/ui'
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

const PACKAGES_QUERY = groq`
{
  'packages': * [_type == "api.package"] {
    name,
    releases[]->{
      version,
      members[]->{
        'slug': slug.current
      }
    }
  }
}
`

export async function getStaticProps(opts: {
  params: {name: string; version: string; slug: string}
  preview?: boolean
}) {
  const {params, preview = features.preview} = opts
  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export async function getStaticPaths() {
  const data: unknown = await getClient(features.preview).fetch(PACKAGES_QUERY)
  const paths: {params: {name: string; version: string; slug: string}}[] = []

  if (isRecord(data) && isArray(data.packages)) {
    for (const pkg of data.packages) {
      if (isRecord(pkg) && isString(pkg.name) && isArray(pkg.releases)) {
        for (const release of pkg.releases) {
          if (isRecord(release) && isArray(release.members)) {
            for (const member of release.members) {
              if (isString(release.version) && isRecord(member) && isString(member.slug)) {
                paths.push({
                  params: {
                    name: pkg.name,
                    version: release.version,
                    slug: member.slug,
                  },
                })
              }
            }
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
  const packagesData = isRecord(data) && data.packages
  const packages: {name: string}[] = isArray(packagesData)
    ? (packagesData
        .map((d) => isRecord(d) && isString(d.name) && {name: d.name})
        .filter(Boolean) as {name: string}[])
    : []
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const release = pkg?.release
  const currentMember =
    (isRecord(release) && isRecord(release.currentMember) && release.currentMember) || null
  const releases: {version: string}[] =
    pkg && isArray(pkg.releases)
      ? (pkg.releases
          .map((d) => isRecord(d) && isString(d.version) && {version: d.version})
          .filter(Boolean) as {version: string}[])
      : []

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      pushState({
        pathname: `/reference/${event.currentTarget.value}`,
      })
    },
    [pushState]
  )

  const handleVersionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      pushState({
        pathname: `/reference/${params.name}/${event.currentTarget.value}`,
      })
    },
    [params.name, pushState]
  )

  const menuHeader = (
    <Stack
      padding={[2, 3, 4]}
      space={[1, 2, 3]}
      // style={{borderBottom: '1px solid var(--card-border-color)'}}
    >
      <Select onChange={handleNameChange} value={params.name}>
        {packages.map((pkg) => (
          <option key={pkg.name} value={pkg.name}>
            @sanity/{pkg.name}
          </option>
        ))}
      </Select>

      <Select onChange={handleVersionChange} value={params.version}>
        {releases &&
          releases.map((release, releaseIndex) => (
            <option key={release.version} value={release.version}>
              {`v${release.version}${releaseIndex === 0 ? ' (latest)' : ''}`}
            </option>
          ))}
      </Select>
    </Stack>
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
