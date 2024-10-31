import {parseColor} from './parseColor'

it('should parse color', () => {
  expect(parseColor('black/0.5')).toEqual({
    color: {
      type: 'black',
    },
    opacity: 0.5,
  })

  expect(parseColor('black')).toEqual({
    color: {
      type: 'black',
    },
  })

  expect(parseColor('white')).toEqual({
    color: {
      type: 'white',
    },
  })

  expect(parseColor('white/1')).toEqual({
    color: {
      type: 'white',
    },
    opacity: 1,
  })

  expect(parseColor('50')).toEqual({
    color: {
      type: 'hue',
      tint: '50',
    },
  })

  expect(parseColor('50/0.5')).toEqual({
    color: {
      type: 'hue',
      tint: '50',
    },
    opacity: 0.5,
  })

  expect(parseColor('500/0.5')).toEqual({
    color: {
      type: 'hue',
      tint: '500',
    },
    opacity: 0.5,
  })

  expect(parseColor('red/50')).toEqual({
    color: {
      type: 'hue',
      hue: 'red',
      tint: '50',
    },
  })

  expect(parseColor('red/200/0.5 5%')).toEqual({
    color: {
      type: 'hue',
      hue: 'red',
      tint: '200',
    },
    opacity: 0.5,
    mix: 5,
  })

  expect(parseColor('red/50 50%')).toEqual({
    color: {
      type: 'hue',
      hue: 'red',
      tint: '50',
    },
    mix: 50,
  })
})
