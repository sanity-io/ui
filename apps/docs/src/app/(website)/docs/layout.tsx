import {ArticleLayout} from '@/components/ArticleLayout'

import {navTree} from '../navTree'

export default function DocsLayout({children}: {children: React.ReactNode}) {
  const nav = navTree.children?.find((node) => node.segment === 'docs')

  return <ArticleLayout nav={nav}>{children}</ArticleLayout>
}
