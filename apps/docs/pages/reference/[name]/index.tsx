import {Box, Container, Heading, Label, Select, Stack} from '@sanity/ui'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useCallback} from 'react'
import {AppLayout, useApp} from '../../../components/app'
import {NavLink} from '../../../components/navLink'
import {PageLayout} from '../../../components/page'
import {app, features} from '../../../config'
import {loadReferencePageData} from '../../../lib/page'
import {isArray, isRecord, isString} from '../../../lib/types'

export async function getServerSideProps(context: {
  params: {name?: string; version?: string; slug?: string}
  preview?: boolean
}) {
  const {params, preview = features.preview} = context

  params.version = ''
  params.slug = ''

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

function ReferencePackagePage({
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
  const releases =
    pkg && isArray(pkg.releases)
      ? (pkg.releases
          .map((release) => {
            if (isRecord(release) && isString(release.version)) {
              return {version: release.version}
            }

            return null
          })
          .filter(Boolean) as {version: string}[])
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

  const handleVersionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value

      pushState({
        pathname: value ? `/reference/${params.name}/${value}` : `/reference/${params.name}`,
      })
    },
    [params.name, pushState]
  )

  const menuHeader = (
    <Stack padding={[2, 3, 4]} space={[1, 2, 3]}>
      <Select onChange={handleNameChange} value={params.name}>
        <option value="">Select package…</option>
        {packages.map((pkg) => (
          <option key={pkg.name} value={pkg.name}>
            @sanity/{pkg.name}
          </option>
        ))}
      </Select>

      <Select onChange={handleVersionChange} value={params.version}>
        <option value="">Select version…</option>
        {releases &&
          releases.map((release: any) => (
            <option key={release.version} value={release.version}>
              v{release.version}
            </option>
          ))}
      </Select>
    </Stack>
  )

  return (
    <AppLayout>
      <Head>
        <title>
          @sanity/{params.name} – {app.siteName}
        </title>
      </Head>

      <PageLayout menu={menu} menuHeader={menuHeader}>
        {pkg && (
          <Box paddingX={[3, 4, 5]} paddingY={[4, 5, 5, 5, 6, 7]}>
            <Container width={1}>
              <Heading as="h1" size={[2, 2, 3, 4]}>
                @sanity/{params.name}
              </Heading>

              <Stack marginY={[4, 4, 5]} space={[3, 3, 4]}>
                <Label>Choose a version</Label>

                <Stack as="ul" space={[3, 3, 4]}>
                  {releases.map((release) => (
                    <Box as="li" key={release.version}>
                      <NavLink
                        href={`/reference/${params.name}/${release.version}`}
                        size={[2, 2, 3]}
                      >
                        v{release.version}
                      </NavLink>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Container>
          </Box>
        )}
      </PageLayout>
    </AppLayout>
  )
}

export default ReferencePackagePage
