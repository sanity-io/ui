import {HeroSection} from '@/components/page/sections/HeroSection'

export default function Page() {
  return (
    <HeroSection
      headline={'Build accessible React apps faster with Sanity UI'}
      copy={'Sanity UI is an ergonomic toolkit to design with code.'}
      backgroundImage={{
        dark: '/images/home-hero-dark.png',
        light: '/images/home-hero-light.png',
      }}
      ctas={[{href: '/docs', label: 'Get started', mode: 'default', tone: 'default'}]}
      linksHeader={'Why Sanity UI?'}
      links={[
        {
          href: '/docs/motivation#accessibility-as-constraint',
          title: 'Accessible',
          subtitle: 'Designed with accessibility as a (beautiful) constraint.',
        },
        {
          href: '/docs/motivation#built-for-composition',
          title: 'Highly composable',
          subtitle: 'Great DX with carefully designed APIs and UI principles.',
        },
        {
          href: '/docs/motivation#theming-with-javascript',
          title: 'Themeable with JS',
          subtitle: 'A flexible system for theming with design tokens.',
        },
        {
          href: '/docs/motivation#layout-primitives',
          title: 'Layout primitives',
          subtitle: 'Apply common layout patterns using simple utility components.',
        },
        {
          href: '/docs/motivation#typescript-support',
          title: 'TypeScript support',
          subtitle: 'Leverage the safety and utility provided by strictly typed props.',
        },
        {
          href: '/docs/motivation#enables-pixel-perfection',
          title: 'Enables pixel-perfection',
          subtitle: 'Provides a breakproof system for implementing visual design.',
        },
      ]}
    />
  )
}
