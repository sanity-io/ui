context('Primitives/Grid', () => {
  it('should have responsive styles', () => {
    cy.visit('/frame/?path=/primitives/grid/responsive')

    const sizes = [
      {
        viewport: [320, 600],
        css: {
          gridGap: '0px 0px',
          gridTemplateColumns: '280px',
          gridTemplateRows: '19px 19px 19px 19px 19px 19px 19px 19px 19px 19px 19px 19px',
        },
      },

      {
        viewport: [360, 375],
        css: {
          gridGap: '4px 4px',
          gridTemplateColumns: '146px 146px',
          gridTemplateRows: '27px 27px 27px 27px 27px 27px',
        },
      },

      {
        viewport: [600, 768],
        css: {
          gridGap: '8px 8px',
          gridTemplateColumns: '160px 160px 160px',
          gridTemplateRows: '35px 35px 35px 35px',
        },
      },

      {
        viewport: [900, 1024],
        css: {
          gridGap: '12px 12px',
          gridTemplateColumns: '190px 190px 190px 190px',
          gridTemplateRows: '35px 35px 35px 35px',
        },
      },

      {
        viewport: [1204, 1600],
        css: {
          gridGap: '20px 20px',
          gridTemplateColumns: '204px 204px 204px 204px 204px',
          gridTemplateRows: '35px 35px 35px 35px 35px',
        },
      },

      {
        viewport: [1800, 1920],
        css: {
          gridGap: '32px 32px',
          gridTemplateColumns: '256px 256px 256px 256px 256px 256px',
          gridTemplateRows: '35px 35px 35px 35px 35px 35px',
        },
      },

      {
        viewport: [2404, 3840],
        css: {
          gridGap: '52px 52px',
          gridTemplateColumns: '284px 284px 284px 284px 284px 284px 284px',
          gridTemplateRows: '35px 35px 35px 35px 35px 35px 35px',
        },
      },
    ]

    for (const size of sizes) {
      const {css, viewport} = size

      cy.viewport(viewport[0], viewport[1])

      cy.get('#responsive-grid').should('have.css', 'gridGap', css.gridGap)
      cy.get('#responsive-grid').should('have.css', 'gridTemplateColumns', css.gridTemplateColumns)
      cy.get('#responsive-grid').should('have.css', 'gridTemplateRows', css.gridTemplateRows)
    }
  })
})
