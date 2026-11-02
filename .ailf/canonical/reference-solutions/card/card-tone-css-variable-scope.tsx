// var(--tone-*) is the raw ramp a toned element (a Card, or anything with a `tone` prop)
// sets on itself. Outside a toned element it is not defined, so the border resolves to
// nothing. Custom markup reads colour from the semantic properties instead:
// --separator-low for ordinary rules. It resolves in light and dark mode on its own, and
// inside a toned element it remaps to that tone automatically.
// Don't swap in a hex value or a base palette token like --gray-200 — those ignore the
// colour scheme.
export function CustomDivider() {
  return <div role="separator" style={{borderTop: '1px solid var(--separator-low)'}} />
}
