context('Components/Tab', () => {
  it('should use keys to navigate tabs', async () => {
    cy.visit('http://localhost:9009/iframe.html?id=components-tab--example&viewMode=story')

    cy.get('#example-tab-foo').click().realPress('{rightarrow}')

    cy.get('#example-tab-bar:focus').realPress('{rightarrow}')

    cy.get('#example-tab-baz:focus').realPress('{rightarrow}')

    cy.get('#example-tab-foo').should('have.focus')

    // Trigger "Tab"
    cy.get('#example-tab-foo').realPress('Tab')

    // Expect the panel to be focus
    cy.get('#example-panel-foo').should('have.focus')
  })
})
