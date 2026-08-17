import {Flex} from '@sanity/ui'
import {PropsWithChildren} from 'react'

import {Banner, type BannerData} from '@/components/Banner'
import {AppFooter} from '@/components/Footer'
import {Navbar} from '@/components/Navbar'

import {navTree} from './navTree'

// The site banner used to be a `settings` document in Sanity; it now lives
// here. Flip `hidden` to show it again.
const banner: BannerData = {
  hidden: true,
  icon: 'rocket',
  title: 'Early access.',
  link: {
    title: 'Read the blog post',
    href: 'https://www.sanity.io/blog/streamline-your-studio-development-with-sanity-ui',
  },
}

export default function WebsiteLayout(props: PropsWithChildren) {
  const {children} = props

  return (
    <Flex direction="column" height="fill">
      <Banner banner={banner} />
      <Navbar nav={navTree} />
      {children}
      <AppFooter />
    </Flex>
  )
}
