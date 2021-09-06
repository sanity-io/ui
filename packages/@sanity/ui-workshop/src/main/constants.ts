export const VIEWPORT_OPTIONS: {
  name: string
  title: string
  rect: {width: number | 'auto'; height?: number}
}[] = [
  {name: 'auto', title: 'Full', rect: {width: 'auto'}},
  {name: '768', title: '768px', rect: {width: 768}},
  {name: '375', title: '375px', rect: {width: 375, height: 667}},
  {name: '320', title: '320px', rect: {width: 320, height: 568}},
]

export const ZOOM_OPTIONS: {value: number; title: string}[] = [
  {value: 0.5, title: '50%'},
  {value: 0.75, title: '75%'},
  {value: 1, title: '100%'},
  {value: 1.5, title: '150%'},
  {value: 2, title: '200%'},
  {value: 3, title: '300%'},
]
