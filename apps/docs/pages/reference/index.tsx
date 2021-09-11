import {Select, Stack} from '@sanity/ui'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'
import {AppLayout, useApp} from '$components/app'
import {PageLayout} from '$components/page'
import {app, features} from '$config'
import {loadReferencePageData} from '$lib/page'
import {isArray, isRecord, isString} from '$lib/types'

export async function getStaticProps(opts: {
  params?: {name?: string; slug?: string; version?: string}
  preview?: boolean
}) {
  const {params = {}, preview = features.preview} = opts

  params.name = ''
  params.version = ''
  params.slug = ''

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

function ReferencePage({params}: any) {
  const {data, menu} = useApp()
  const {push: pushState} = useRouter()
  const packagesData = isRecord(data) && data.packages
  const packages: {name: string}[] = isArray(packagesData)
    ? (packagesData
        .map((d) => isRecord(d) && isString(d.name) && {name: d.name})
        .filter(Boolean) as {name: string}[])
    : []

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value

      pushState({
        pathname: value ? `/reference/${value}` : '/reference',
      })
    },
    [pushState]
  )

  const menuHeader = (
    <Stack
      padding={[2, 3, 4]}
      space={[1, 2, 3]}
      // style={{borderBottom: '1px solid var(--card-border-color)'}}
    >
      <Select onChange={handleNameChange} value={params.name}>
        <option value="">Select package…</option>
        {packages.map((pkg) => (
          <option key={pkg.name} value={pkg.name}>
            @sanity/{pkg.name}
          </option>
        ))}
      </Select>

      <Select disabled>
        <option value="">Select version…</option>
      </Select>
    </Stack>
  )

  return (
    <AppLayout>
      <Head>
        <title>API Reference – {app.siteName}</title>
      </Head>

      <PageLayout menu={menu} menuHeader={menuHeader} />
    </AppLayout>
  )
}

export default ReferencePage
