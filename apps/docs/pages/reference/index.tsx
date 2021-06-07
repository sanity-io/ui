import {Box, Container, Heading, Label, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout, useApp} from '$components/app'
import {NavLink} from '$components/navLink'
import {features} from '$config'
import {loadReferencePageData} from '$lib/page'
import {isArray, isRecord, isString} from '$lib/types'

export async function getStaticProps(opts: {
  params?: {name?: string; slug?: string; version?: string}
  preview?: boolean
}) {
  const {params = {}, preview = features.preview} = opts

  // @todo: remove this hard-coding
  params.name = '@sanity/ui'
  params.version = ''
  params.slug = ''

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export default function ReferencePage() {
  const {data} = useApp()
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const releasesData = pkg && pkg.releases
  const versions: string[] = isArray(releasesData)
    ? (releasesData
        .map((d) => isRecord(d) && isString(d.version) && d.version)
        .filter(Boolean) as string[])
    : []

  return (
    <>
      <Head>
        <title>API reference – Sanity UI</title>
      </Head>

      <AppLayout>
        <Box paddingX={[3, 4, 5]} paddingY={[4, 5, 5, 5, 6, 7]}>
          <Container>
            <Box marginBottom={[2, 3, 4]}>
              <Heading as="h1" size={[2, 2, 3, 4]}>
                API reference for <code>@sanity/ui</code>
              </Heading>
            </Box>

            <Stack marginY={[4, 4, 5]} space={[3, 3, 4]}>
              <Label>Choose a version</Label>

              <Stack as="ul" space={[3, 3, 4]}>
                {versions.map((version) => (
                  <Box as="li" key={version}>
                    <NavLink href={`/reference/${version}`} size={[2, 2, 3]}>
                      v{version}
                    </NavLink>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>
      </AppLayout>
    </>
  )
}
