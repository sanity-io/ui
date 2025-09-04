import '@sanity/ui/css/index.css'

import {Box, Card, Code, Heading, Root, Text, usePrefersDark} from '@sanity/ui'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'

import type {Route} from './+types/root'
import type {ColorScheme} from '@sanity/ui/theme'
import {useEffect, useRef, useState} from 'react'

export const headers: Route.HeadersFunction = () => {
  return {
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
    'Vary': 'Sec-CH-Prefers-Color-Scheme',
    'Critical-CH': 'Sec-CH-Prefers-Color-Scheme',
  }
}

export const links: Route.LinksFunction = () => [
  {
    rel: 'preconnect',
    href: 'https://studio-static.sanity.io',
    crossOrigin: 'anonymous',
  },
]

export const loader = async ({request}: Route.LoaderArgs) => {
  const prefersDarkScheme = request.headers.get('Sec-CH-Prefers-Color-Scheme')

  return {
    initialPrefersDark: prefersDarkScheme === 'dark',
  }
}

export function Layout({children}: {children: React.ReactNode}) {
  const {initialPrefersDark} = useLoaderData<typeof loader>() ?? {}
  const prefersDark = usePrefersDark(() => initialPrefersDark)
  const prefersDarkRef = useRef(prefersDark)
  const [scheme, setScheme] = useState<ColorScheme>(() => (prefersDark ? 'dark' : 'light'))

  useEffect(() => {
    if (prefersDarkRef.current === prefersDark) return

    prefersDarkRef.current = prefersDark

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setScheme(prefersDark ? 'dark' : 'light')
      })
      return
    }

    setScheme(prefersDark ? 'dark' : 'light')
  }, [prefersDark])

  return (
    <Root lang="en" scheme={scheme}>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
      />
      <Meta />
      <Links />

      {children}
      <ScrollRestoration />
      <Scripts />
    </Root>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = 'Uncaught error'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <Card
      as="main"
      display="flex"
      flexDirection="column"
      gap={5}
      minHeight="full"
      padding={5}
      tone="critical"
    >
      <Heading as="h1">{message}</Heading>
      <Text as="p">{details}</Text>
      {stack && (
        <Box muted overflow="auto" padding={4} radius={3}>
          <Code size={1}>{stack}</Code>
        </Box>
      )}
    </Card>
  )
}
