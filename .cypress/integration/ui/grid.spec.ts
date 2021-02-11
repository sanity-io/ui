context('Primitives/Grid', () => {
  it('should have responsive styles', async () => {
    cy.visit('http://localhost:9009/iframe.html?id=atoms-grid--responsive&viewMode=story')

    const sizes = [
      {
        viewport: [320, 600],
        css: {
          gridGap: 'normal normal',
          gridTemplateColumns: '280px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px 11px 11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [360, 375],
        css: {
          gridGap: '4px 4px',
          gridTemplateColumns: '158px 158px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [600, 768],
        css: {
          gridGap: '8px 8px',
          gridTemplateColumns: '181.328px 181.328px 181.328px',
          gridTemplateRows: '11px 11px 11px 11px',
        },
      },

      {
        viewport: [900, 1024],
        css: {
          gridGap: '12px 12px',
          gridTemplateColumns: '206px 206px 206px 206px',
          gridTemplateRows: '11px 11px 11px 11px',
        },
      },

      {
        viewport: [1200, 1600],
        css: {
          gridGap: '20px 20px',
          gridTemplateColumns: '216px 216px 216px 216px 216px',
          gridTemplateRows: '11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [1800, 1920],
        css: {
          gridGap: '32px 32px',
          gridTemplateColumns: '266.656px 266.656px 266.656px 266.656px 266.656px 266.656px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [2400, 3840],
        css: {
          gridGap: '52px 52px',
          gridTemplateColumns:
            '292.562px 292.562px 292.562px 292.562px 292.562px 292.562px 292.562px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px 11px',
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
