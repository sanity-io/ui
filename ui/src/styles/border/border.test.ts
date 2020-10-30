import {border} from './border'

describe('styles/border', () => {
  it('should', () => {
    const styles = border({border: true})

    expect(styles).toEqual([{'&&': {border: '1px solid var(--card-hairline-soft-color)'}}])
  })
})
