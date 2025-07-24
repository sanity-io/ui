context('Primitives/Box', () => {
  it('resizing window should hide and show responsive elements', () => {
    cy.visit('/frame/?path=/primitives/box/responsive')

    const sizes = [
      {viewport: [320, 600], css: {display: 'none', flex: '1 1 0%'}},
      {viewport: [360, 600], css: {display: 'block', flex: '2 1 0%'}},
      {viewport: [600, 600], css: {display: 'none', flex: '3 1 0%'}},
      {viewport: [900, 600], css: {display: 'block', flex: '4 1 0%'}},
      {viewport: [1200, 600], css: {display: 'none', flex: '5 1 0%'}},
      {viewport: [1800, 600], css: {display: 'block', flex: '6 1 0%'}},
      {viewport: [2400, 600], css: {display: 'none', flex: '7 1 0%'}},
    ]

    for (const size of sizes) {
      const {css, viewport} = size

      cy.viewport(viewport[0], viewport[1])

      cy.get('#responsive-box').should('have.css', 'display', css.display)
      cy.get('#responsive-box').should('have.css', 'flex', css.flex)
    }
  })
})
