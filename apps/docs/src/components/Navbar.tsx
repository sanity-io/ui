import {sanity} from '@sanity/react-loader/jsx'
import {Box, Button, Card, Menu, MenuButton, MenuItem} from '@sanity/ui'
import Link from 'next/link'
import {ReactElement} from 'react'

import {useApp} from '@/app/useApp'
import {GitHubMark} from './assets'
import {ChevronDownIcon, MoonIcon, SunIcon, DesktopIcon} from '@sanity/icons'
import {VersionedLink} from './VersionedLink'

export function Navbar(props: {slug: string[] | undefined}): ReactElement {
  const {slug} = props
  const {defaultVersion, features, nav, navTrees, colorScheme, setColorScheme, version} = useApp()

  const navTree = navTrees.find((t) => t.id === version)

  let pathname = slug ? `/${slug.join('/')}` : ''

  for (const t of navTrees) {
    const versionPrefix = defaultVersion === t.id ? '' : `/${t.id}`

    if (versionPrefix && pathname.startsWith(versionPrefix)) {
      pathname = pathname.slice(versionPrefix.length)
    }
  }

  return (
    <Card
      display="flex"
      flex="none"
      overflow="hidden"
      marginX="auto"
      width="fill"
      shadow={1}
      position="relative"
      style={{zIndex: 100}}
    >
      {/* <Flex gap={1}> */}
      <Box display="flex" flex={1} padding={[2, 2, 3, 4]} maxWidth={0}>
        <Box display="flex" flex={1}>
          <Button
            flex="none"
            as={VersionedLink}
            data-as="a"
            href="/"
            mode="bleed"
            gap={3}
            padding={3}
            text="Sanity UI"
            textWeight="bold"
          />
        </Box>

        <MenuButton
          button={
            <Button text={navTree?.title || version} mode="ghost" iconRight={<ChevronDownIcon />} />
          }
          id="nav-tree-menu"
          menu={
            <Menu>
              {navTrees.map((t) => {
                const versionPrefix = defaultVersion === t.id ? '' : `/${t.id}`

                return (
                  <MenuItem
                    as={Link}
                    href={`${versionPrefix}${pathname}`}
                    key={t._id}
                    pressed={t.id === version}
                    selected={t.id === version}
                    text={t.title || t.id}
                  />
                )
              })}
            </Menu>
          }
        />
      </Box>

      {nav && (
        <Card
          display="flex"
          // alignItems="center"
          // justifyContent="flex-end"
          flex={3}
          gap={1}
          // tone="default"
          shadow={1}
          padding={[2, 2, 3, 4]}
        >
          <Box flex={1} display="flex" gap={2}>
            {nav.children?.map((node, idx) => {
              if (node.hidden && !features.hintHiddenContent) {
                return null
              }

              if (!node.href) {
                return null
              }

              return (
                <Button
                  as={VersionedLink}
                  data-as="a"
                  href={node.href}
                  key={idx}
                  mode="bleed"
                  padding={3}
                  selected={node.segment === slug?.[0]}
                  style={{opacity: node.hidden ? 0.25 : undefined}}
                  text={<sanity.span>{node.title}</sanity.span>}
                />
              )
            })}
          </Box>
          {/* <Box marginLeft={[1, 1, 2]}> */}

          <Box display="flex" gap={1} padding={1}>
            <Button
              padding={2}
              mode="bleed"
              icon={DesktopIcon}
              selected={colorScheme === 'system'}
              onClick={() => setColorScheme('system')}
            />
            <Button
              padding={2}
              mode="bleed"
              icon={SunIcon}
              selected={colorScheme === 'light'}
              onClick={() => setColorScheme('light')}
            />
            <Button
              padding={2}
              mode="bleed"
              icon={MoonIcon}
              selected={colorScheme === 'dark'}
              onClick={() => setColorScheme('dark')}
            />
          </Box>

          <Button
            aria-label="Open GitHub repository"
            as="a"
            href="https://github.com/sanity-io/ui"
            icon={GitHubMark}
            mode="bleed"
            padding={3}
            radius="full"
            rel="noopener noreferrer"
            target="_blank"
          />
          {/* </Box> */}
        </Card>
      )}
      {/* </Flex> */}
    </Card>
  )
}
