import {Box, Label, Stack} from '@sanity/ui'
import {useApp} from '$components/app'
import {NavLink} from '$components/navLink'

export function ReferenceReferrers(props: any) {
  const {data} = props
  const {params} = useApp()

  return (
    <>
      {data.referrers && data.referrers.length > 0 && (
        <Stack marginY={[4, 4, 5]} space={[3, 4]}>
          <Label>Used by</Label>

          <Stack as="ul" space={[3, 3, 4]}>
            {data.referrers.map((referrer: any) => (
              <Box as="li" key={referrer.slug}>
                <NavLink
                  href={`/reference/${params.name}/${params.version}/${referrer.slug}`}
                  size={[2, 2, 3]}
                >
                  <code>{referrer.name}</code>
                </NavLink>
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </>
  )
}
