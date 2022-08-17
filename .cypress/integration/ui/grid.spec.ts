context('Primitives/Grid', () => {
  it('should have responsive styles', () => {
    cy.visit('http://localhost:9009/frame/?path=/primitives/grid/responsive')

    const sizes = [
      {
        viewport: [320, 600],
        css: {
          gridGap: 'normal normal',
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
        viewport: [1200, 1600],
        css: {
          gridGap: '20px 20px',
          gridTemplateColumns: '203.188px 203.188px 203.188px 203.188px 203.188px',
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
        viewport: [2400, 3840],
        css: {
          gridGap: '52px 52px',
          gridTemplateColumns:
            '283.422px 283.422px 283.422px 283.422px 283.422px 283.422px 283.422px',
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
