import {
  BillIcon,
  ChartUpwardIcon,
  CogIcon,
  DashboardIcon,
  RocketIcon,
  UsersIcon,
} from '@sanity/icons'
import {Button, Inline} from '@sanity/ui'
import {useLocation} from '../../../lib/location'

export function OrganizationTabs() {
  const {handleLinkClick, segments} = useLocation()

  return (
    <Inline space={2}>
      <Button
        as="a"
        href="/org/sanity"
        icon={DashboardIcon}
        mode="bleed"
        onClick={handleLinkClick}
        selected={!segments[2]}
        text="Overview"
      />
      <Button
        as="a"
        href="/org/sanity/projects"
        icon={RocketIcon}
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'projects'}
        text="Projects"
      />
      <Button
        as="a"
        href="/org/sanity/members"
        icon={UsersIcon}
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'members'}
        text="Members"
      />
      <Button
        as="a"
        href="/org/sanity/activity"
        icon={ChartUpwardIcon}
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'activity'}
        text="Activity"
      />
      <Button
        as="a"
        href="/org/sanity/usage"
        icon={ChartUpwardIcon}
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'usage'}
        text="Usage"
      />
      <Button
        as="a"
        href="/org/sanity/billing"
        icon={BillIcon}
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'billing'}
        text="Billing"
      />
      <Button
        as="a"
        href="/org/sanity/settings"
        icon={CogIcon}
        onClick={handleLinkClick}
        mode="bleed"
        selected={segments[2] === 'settings'}
        text="Settings"
      />
    </Inline>
  )
}
