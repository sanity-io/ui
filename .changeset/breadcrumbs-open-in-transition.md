---
'@sanity/ui': patch
---

`Breadcrumbs` opens and closes the popover with its collapsed items in a transition (`startTransition`), as every update of a `Popover`'s `open` should be. A closed popover pre-renders its content hidden, in a transition, once its reference element shows intent to open it; when `open` changes in a transition too, React keeps rendering that content in the background if the open comes before it is done, instead of rendering it synchronously in the click. Content that was pre-rendered already still shows in the first frame after the click.

The `open` prop of `Popover` now documents this for consumers that control it themselves: set it inside `startTransition`, wrapping the state update itself (a `startTransition` around code that schedules the update for later, such as a timeout, does not reach it).
