context('Utils/Layer', () => {
  it('should support responsize z-offset', () => {
    cy.visit('/frame/?path=/utils/layer/responsive-z-offset')

    const sizes = [
      {viewport: [320, 600], css: {zIndex: '1'}},
      {viewport: [360, 600], css: {zIndex: '2'}},
      {viewport: [600, 600], css: {zIndex: '3'}},
      {viewport: [900, 600], css: {zIndex: '4'}},
      {viewport: [1200, 600], css: {zIndex: '5'}},
      {viewport: [1800, 600], css: {zIndex: '6'}},
      {viewport: [2400, 600], css: {zIndex: '7'}},
    ]

    for (const size of sizes) {
      const {css, viewport} = size

      cy.viewport(viewport[0], viewport[1])
      cy.reload()

      cy.get('#responsive-layer').should('have.attr', 'style', `z-index: ${css.zIndex};`)
    }
  })
})
