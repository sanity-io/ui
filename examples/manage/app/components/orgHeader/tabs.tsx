import {Button, Inline} from '@sanity/ui'
import React from 'react'
import {useLocation} from '../../../lib/location'

export function OrganizationTabs() {
  const {handleLinkClick, segments} = useLocation()

  return (
    <Inline space={2}>
      <Button
        as="a"
        href="/org/sanity"
        icon="dashboard"
        mode="bleed"
        onClick={handleLinkClick}
        selected={!segments[2]}
      >
        Overview
      </Button>
      <Button
        as="a"
        href="/org/sanity/projects"
        icon="circle"
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'projects'}
      >
        Projects
      </Button>
      <Button
        as="a"
        href="/org/sanity/members"
        icon="users"
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'members'}
      >
        Members
      </Button>
      <Button
        as="a"
        href="/org/sanity/activity"
        icon="chart-upward"
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'activity'}
      >
        Activity
      </Button>
      <Button
        as="a"
        href="/org/sanity/usage"
        icon="chart-upward"
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'usage'}
      >
        Usage
      </Button>
      <Button
        as="a"
        href="/org/sanity/billing"
        icon="document"
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'billing'}
      >
        Billing
      </Button>
      <Button
        as="a"
        href="/org/sanity/settings"
        icon="cog"
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'settings'}
      >
        Settings
      </Button>
    </Inline>
  )
}
