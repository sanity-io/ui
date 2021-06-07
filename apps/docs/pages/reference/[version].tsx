import {Box, Container, Heading, Select} from '@sanity/ui'
import groq from 'groq'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'
import {AppLayout, useApp} from '$components/app'
import {PageLayout} from '$components/page'
import {ReleaseContent} from '$components/reference'
import {features} from '$config'
import {loadReferencePageData} from '$lib/page'
import {isArray, isRecord, isString} from '$lib/types'
import {getClient} from '$sanity'

export async function getStaticProps(opts: {
  params: {name?: string; slug?: string; version: string}
  preview?: boolean
}) {
  const {params, preview = features.preview} = opts

  // @todo: remove this hard-coding
  params.name = '@sanity/ui'
  params.slug = ''

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

const VERSIONS_QUERY = groq`
*[_type == "api.package" && name == $packageName] {
  "versions": *[
    _id in ^.releases[]._ref &&
    _type == "api.release"
  ].version
}[0].versions
`

export async function getStaticPaths() {
  const data = await getClient(features.preview).fetch(VERSIONS_QUERY, {packageName: '@sanity/ui'})
  const paths: {params: {version: string}}[] = []

  if (isArray(data)) {
    for (const version of data) {
      if (isString(version)) {
        paths.push({params: {version}})
      }
    }
  }

  return {paths, fallback: false}
}

function ReferenceVersionPage({params}: any) {
  const {data, menu} = useApp()
  const {push: pushState} = useRouter()
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const release: any = pkg?.release
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
        <title>v{params.version} – Sanity UI</title>
      </Head>

      <PageLayout menu={menu} menuHeader={menuHeader}>
        {release && (
          <Box paddingX={[3, 4, 5]} paddingY={[4, 5, 5, 5, 6, 7]}>
            <Container width={1}>
              <Heading as="h1" size={[2, 2, 3, 4]}>
                v{params.version}
              </Heading>

              <ReleaseContent blocks={release.content} />
            </Container>
          </Box>
        )}
      </PageLayout>
    </AppLayout>
  )
}

export default ReferenceVersionPage
