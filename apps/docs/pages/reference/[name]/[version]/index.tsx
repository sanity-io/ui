import {Box, Container, Heading, Select, Stack} from '@sanity/ui'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'
import {AppLayout, useApp} from '$components/app'
import {PageLayout} from '$components/page'
import {ReleaseContent} from '$components/reference'
import {app, features} from '$config'
import {loadReferencePageData} from '$lib/page'
import {isArray, isRecord, isString} from '$lib/types'

export async function getServerSideProps(context: {
  params: {name?: string; version?: string; slug?: string}
  preview?: boolean
}) {
  const {params, preview = features.preview} = context

  params.slug = ''

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

function ReferenceVersionPage({
  params,
}: {
  params: {name?: string; version?: string; slug?: string}
}) {
  const {data, menu} = useApp()
  const {push: pushState} = useRouter()
  const packagesData = isRecord(data) && data.packages
  const packages: {name: string}[] = isArray(packagesData)
    ? (packagesData
        .map((d) => isRecord(d) && isString(d.name) && {name: d.name})
        .filter(Boolean) as {name: string}[])
    : []
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const release: any = pkg?.release
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
        <title>
          @sanity/{params.name} v{params.version} – {app.siteName}
        </title>
      </Head>

      <PageLayout menu={menu} menuHeader={menuHeader}>
        {release && (
          <Box paddingX={[3, 4, 5]} paddingY={[4, 5, 5, 5, 6, 7]}>
            <Container width={1}>
              <Heading as="h1" size={[2, 2, 3, 4]}>
                @sanity/{params.name} v{params.version}
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
