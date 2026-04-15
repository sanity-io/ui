'use client'

import {ChevronRightIcon} from '@sanity/icons'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {vars} from '@sanity/ui'
import {AnimatePresence, motion} from 'motion/react'
import {useState} from 'react'
// import {Link, useLocation} from 'react-router'

import type {NavTreeNode} from './types'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

export function NavTreeItem(props: {
  // basePath?: string
  disabled?: boolean
  // hidden?: boolean
  level?: number
  nested?: boolean
  open?: boolean
  route: NavTreeNode
}) {
  const {
    // basePath,
    disabled: disabledProp = false,
    // hidden,
    level = 0,
    open: openProp = false,
    route,
  } = props

  const location = {
    pathname: usePathname(),
  }

  const disabled = disabledProp || route.disabled
  const selected = location.pathname === route.path
  const nestedRoutes = (route.children ?? []).filter((r) => !r.hidden)
  const nested = nestedRoutes.length > 0

  const [open, setOpen] = useState(() => {
    if (!nested) {
      return false
    }

    if (openProp) {
      return true
    }

    if (route.path === '/') {
      return location.pathname === route.path
    }

    return location.pathname === route.path || location.pathname.startsWith(`${route.path}/`)
  })

  if (route.hidden) {
    return null
  }

  return (
    <>
      <Flex
        data-ui="NavTreeItem"
        gap={0}
        // paddingBottom={1}
        position="relative"
        // paddingLeft={2}
        // style={{paddingLeft: `calc(${vars.space[2]} * ${level})`}}
      >
        {/* <Button
          disabled={disabled || !nested}
          flex="none"
          icon={
            <ChevronRightIcon
              style={{
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            />
          }
          mode="bleed"
          onClick={() => setOpen(!open)}
          paddingX={1}
          paddingY={2}
          radius={3}
          style={{opacity: nested ? 1 : 0}}
        /> */}
        {nested && (
          <Box
            as="button"
            onClick={() => setOpen(!open)}
            padding={2}
            radius={3}
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              left: `calc(8px + (${vars.space[2]} * ${level}))`,
              width: 'auto',
              // outline: `0.5px solid ${vars.color.shadow.outline}`,
              // outlineOffset: -0.5,
            }}
          >
            <Text size={1}>
              <ChevronRightIcon
                style={{
                  transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            </Text>
          </Box>
        )}

        {route.link ? (
          <Card
            as={Link}
            href={route.path}
            disabled={disabled}
            flex={1}
            onClick={() => {
              if (nested) setOpen(true)
            }}
            padding={2}
            pressed={selected}
            radius={3}
            style={{paddingLeft: `calc(25px + 8px + (${vars.space[2]} * ${level}))`}}
            // to={route.path}
          >
            <Text muted={!selected} size={1} weight="medium">
              {route.title}
            </Text>
          </Card>
        ) : (
          <Card
            // as={route.link ? Link : undefined}
            // href={route.path}
            disabled={disabled}
            flex={1}
            onClick={() => {
              if (nested) setOpen(true)
            }}
            padding={2}
            pressed={selected}
            radius={3}
            style={{paddingLeft: `calc(25px + 8px + (${vars.space[2]} * ${level}))`}}
            // to={route.path}
          >
            <Text muted={!selected} size={1} weight="medium">
              {route.title}
            </Text>
          </Card>
        )}
      </Flex>

      {nested && (
        <AnimatePresence initial={false} key="children">
          {open && (
            <motion.div
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 0.2}}
            >
              <Stack gap={1}>
                {nestedRoutes.map((child) => (
                  <NavTreeItem key={child.path} level={level + 1} route={child} />
                ))}
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
