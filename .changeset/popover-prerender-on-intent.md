---
'@sanity/ui': minor
---

`Popover` (and with it `MenuButton`, `MenuGroup`, `Autocomplete` and `Breadcrumbs`) no longer pre-renders its closed content eagerly. Since v4, every closed popover rendered its card and `content` inside a hidden `<Activity>` boundary from the moment it mounted, so a page with many popovers that are never opened paid for all of that hidden DOM. Now nothing is rendered until the popover opens or is about to: the hidden pre-render starts when the reference element receives focus or a pointer enters or presses it, in a transition, so a click that follows right away is never held up by it. A popover that opens without any of that (programmatically, or with `open` set from the start) renders when it opens. Once rendered, a popover stays rendered while closed, as before, so the state of its `content` survives reopening.

There is no option to pre-render eagerly or to skip the pre-render on intent. `Popover` is controlled through `open`, so a consumer that does not want its content rendered before it opens can leave `content` empty until then.

Tests that read the content of a popover or menu that has never been opened or interacted with need to open it first: `expect(screen.getByText('Popover content')).not.toBeVisible()` only holds once the popover has rendered, before that `screen.queryByText('Popover content')` is `null`. Queries that skip inaccessible elements (`*ByRole`) need no change.
