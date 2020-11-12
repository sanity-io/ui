import {borderStyle} from './borderStyle'

describe('styles/border', () => {
  it('should', () => {
    const styles = borderStyle({border: true})

    expect(styles).toEqual([{'&&': {border: '1px solid var(--card-hairline-soft-color)'}}])
  })
})
