import {expect, type Page} from '@playwright/test'

/**
 * `media[1]` of the Sanity UI theme. The docs sidebar is `display: none` below
 * it and the breadcrumbs bar is `display: none` above it, so which node stands
 * for the article chrome depends on the viewport.
 */
export const SIDEBAR_BREAKPOINT = 600

export const HOME_PATH = '/ui'
/**
 * A sibling article under the same `[screen]`. The docs nav collapses the
 * "Primitives" branch unless the current path is inside it, so a soft
 * navigation to {@link ARTICLE_PATH} starts from another primitive's article
 * rather than from the docs landing page.
 */
export const SIBLING_ARTICLE_PATH = '/ui/docs/primitive/button'
export const ARTICLE_PATH = '/ui/docs/primitive/popover'

/**
 * A synchronous node of the article chrome: the docs navigation. It is part of
 * the `[screen]` layout, so it belongs to the shell rather than to the
 * article's streamed content.
 */
export function articleChrome(page: Page) {
  const {width} = page.viewportSize()!
  // `:visible` for the same reason as `articleContent`, plus it resolves the
  // sidebar/breadcrumbs pair: both are always rendered, one per breakpoint.
  return width >= SIDEBAR_BREAKPOINT
    ? page.locator('[data-testid="article-sidebar-nav"]:visible')
    : page.locator('[data-testid="article-breadcrumbs-nav"]:visible')
}

/**
 * The article body. Streams in behind the shell.
 *
 * Scoped to `:visible` because the App Router keeps the previous page's
 * subtree in the DOM (hidden) after a client navigation, so an unscoped
 * lookup would also match the article the navigation came from.
 */
export function articleContent(page: Page) {
  return page.locator('[data-testid="article-content"]:visible')
}

/** The loading UI the article slot shows until the body streams in. */
export function articleFallback(page: Page) {
  return page.getByTestId('article-loading')
}

/**
 * The sidebar link that navigates to {@link ARTICLE_PATH}. Matched by `href`
 * rather than by accessible name: Sanity UI's `TreeItem` renders the anchor
 * with `role="treeitem"`, so a `getByRole('link')` lookup finds nothing.
 */
export function popoverLink(page: Page) {
  // The nav tree is rendered twice (sidebar + breadcrumbs bar), one hidden per
  // breakpoint, so scope the lookup to the one this viewport shows.
  return articleChrome(page).locator(`a[href="${ARTICLE_PATH}"]`)
}

/**
 * Draft mode swaps every route onto its dynamic branch, which would make any
 * verdict here meaningless. The suite runs in a fresh context, so this only
 * guards against a leaked bypass cookie (see `instant-nav.rig.md`, DRIFT).
 */
export async function expectPublishedPerspective(page: Page) {
  const cookies = await page.context().cookies()
  expect(cookies.map((cookie) => cookie.name)).not.toContain('__prerender_bypass')
}
